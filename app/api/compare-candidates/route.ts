import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(req: Request) {

  const { candidateIds } = await req.json()

  const { data } = await supabaseAdmin
    .from("candidates")
    .select("name, overall_score, breakdown_json")
    .in("id", candidateIds)

  if (!data || data.length < 2) {
    return NextResponse.json({ error: "Select at least 2 candidates" })
  }

  // sort best candidate first
  data.sort((a,b)=>b.overall_score - a.overall_score)

  let result = `Candidate Comparison\n\n`

  data.forEach((c:any)=>{

    result += `
${c.name}

Summary:
${c.breakdown_json.summary}

Skills Score: ${c.breakdown_json.skills_score}

----------------------------------
`

  })

  result += `

Recommendation
Choose the candidate with the strongest combination of skills, experience alignment, and overall score.
`

  return NextResponse.json({

    result,

    table: data.map((c:any)=>({

      name: c.name,
      skills: c.breakdown_json.skills_score || 0,
      experience: c.breakdown_json.experience_level || "N/A",
      score: c.overall_score

    }))

  })

}