import { openai } from "@/lib/openai"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(req: Request) {
  try {
    const { title, description } = await req.json()

    if (!description) {
      return Response.json(
        { error: "Description required" },
        { status: 400 }
      )
    }

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `
You are a professional hiring manager.

Create structured scoring rubric from this job description.

Return STRICT JSON only.
Do NOT include markdown.
Do NOT include explanation text.

Format exactly like this:

{
  "required_skills": [{ "skill": "string", "weight": number }],
  "preferred_skills": [{ "skill": "string", "weight": number }],
  "min_years_experience": number,
  "education_requirement": "string"
}

Be strict. Do not inflate requirements.

Job Description:
${description}
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

    // Remove accidental ```json blocks if model adds them
    const cleaned = outputText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    const rubric = JSON.parse(cleaned)

    const { data, error } = await supabaseAdmin
      .from("jobs")
      .insert({
        title,
        description,
        rubric_json: rubric
      })
      .select()
      .single()

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json({
        jobId: data.id
      })

  } catch (err: any) {
    console.error("Generate rubric error:", err)
    return Response.json(
      { error: "Failed to generate rubric" },
      { status: 500 }
    )
  }
}