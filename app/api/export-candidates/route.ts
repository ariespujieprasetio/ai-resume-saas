import { NextResponse } from "next/server"
import * as XLSX from "xlsx"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)
  const jobId = searchParams.get("jobId")

  // ambil job
  const { data: job } = await supabaseAdmin
    .from("jobs")
    .select("title")
    .eq("id", jobId)
    .single()

  // ambil candidates
  const { data: candidates } = await supabaseAdmin
    .from("candidates")
    .select(`
      id,
      name,
      overall_score,
      breakdown_json
    `)
    .eq("job_id", jobId)
    .order("overall_score", { ascending: false })

  if (!candidates || candidates.length === 0) {
    return NextResponse.json({ error: "No data" })
  }

  const avgScore = Math.round(
    candidates.reduce((a,c)=>a+c.overall_score,0) / candidates.length
  )

  const recommended = candidates.filter(c => c.overall_score >= 85).length
  const potential = candidates.filter(c => c.overall_score >= 70 && c.overall_score < 85).length
  const rejected = candidates.filter(c => c.overall_score < 70).length

  function confidence(score:number){
    if(score>=85) return "High"
    if(score>=70) return "Medium"
    return "Low"
  }

  const rows = candidates.map((c,index)=>({

    Rank:index+1,

    Candidate:c.name,

    Score:c.overall_score,

    Skills:c.breakdown_json?.skills_score ?? "",

    Experience:c.breakdown_json?.experience_score ?? "",

    Education:c.breakdown_json?.education_score ?? "",

    Decision:
      c.overall_score>=85
      ?"Recommended"
      :c.overall_score>=70
      ?"Potential Fit"
      :"Not Recommended",

    Confidence:confidence(c.overall_score),

    "Veritik Summary":c.breakdown_json?.summary ?? ""

  }))

  const insightRows = [

    {Metric:"Job Title",Value:job?.title},

    {Metric:"Total Candidates",Value:candidates.length},

    {Metric:"Average Score",Value:avgScore},

    {Metric:"Recommended",Value:recommended},

    {Metric:"Potential Fit",Value:potential},

    {Metric:"Rejected",Value:rejected},

    {Metric:"Screening Date",Value:new Date().toISOString().slice(0,10)}

  ]

  const sheet1 = XLSX.utils.json_to_sheet(rows)
  const sheet2 = XLSX.utils.json_to_sheet(insightRows)

  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workbook,sheet1,"Candidate Ranking")
  XLSX.utils.book_append_sheet(workbook,sheet2,"Hiring Insights")

  const buffer = XLSX.write(workbook,{
    type:"buffer",
    bookType:"xlsx"
  })

  const fileName = `${job?.title || "candidate-report"} - Candidates.xlsx`

  return new NextResponse(buffer,{
    headers:{
      "Content-Disposition":`attachment; filename="${fileName}"`,
      "Content-Type":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    }
  })
}