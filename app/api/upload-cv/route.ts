import { openai } from "@/lib/openai"
import { supabaseAdmin } from "@/lib/supabase"
import { pdf } from "pdf-parse";
export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const jobId = formData.get("jobId") as string
    const file = formData.get("file") as File

    if (!file || !jobId) {
      return Response.json({ error: "Missing file or jobId" }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // 🔥 Parse PDF text
    const parsed = await pdf(buffer)
    const cvText = parsed.text.slice(0, 15000) // limit token usage

    // 🔥 Get rubric from DB
    const { data: job } = await supabaseAdmin
      .from("jobs")
      .select("rubric_json")
      .eq("id", jobId)
      .single()

    if (!job) {
      return Response.json({ error: "Job not found" }, { status: 404 })
    }

    const rubric = job.rubric_json

    // 🔥 AI Scoring
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `
You are an unbiased AI hiring evaluator.

Evaluate this candidate strictly against the provided rubric.

Return STRICT JSON only.

{
  "overall_score": number,
  "skills_score": number,
  "experience_score": number,
  "education_score": number,
  "strengths": string[],
  "weaknesses": string[],
  "summary": string
}

Rubric:
${JSON.stringify(rubric)}

Candidate CV:
${cvText}
`
    })

    const firstOutput = response.output?.[0]

    let outputText = ""

    if (
      firstOutput &&
      firstOutput.type === "message" &&
      firstOutput.content &&
      firstOutput.content.length > 0 &&
      firstOutput.content[0].type === "output_text"
    ) {
      outputText = firstOutput.content[0].text
    }

    const cleaned = outputText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    const scoreResult = JSON.parse(cleaned)

    // 🔥 Save candidate
    const { data, error } = await supabaseAdmin
      .from("candidates")
      .insert({
        job_id: jobId,
        name: file.name,
        parsed_text: cvText,
        overall_score: scoreResult.overall_score,
        breakdown_json: scoreResult,
        status: "done"
      })
      .select()
      .single()

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data)

  } catch (err: any) {
    console.error("Upload CV error:", err)
    return Response.json(
      { error: "Failed to process CV" },
      { status: 500 }
    )
  }
}