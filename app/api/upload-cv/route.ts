import { openai } from "@/lib/openai"
import { supabaseAdmin } from "@/lib/supabase"
// import * as pdfjs from "pdfjs-dist/legacy/build/pdf"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const jobId = formData.get("jobId") as string
    const file = formData.get("file") as File

    if (!file || !jobId) {
      return Response.json(
        { error: "Missing file or jobId" },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

 // Parse PDF safely
 let cvText = ""

    try {
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs")

    // WAJIB set worker
    pdfjs.GlobalWorkerOptions.workerSrc =
        "pdfjs-dist/build/pdf.worker.mjs"

    const loadingTask = pdfjs.getDocument({
        data: buffer,
        useWorkerFetch: false,
        isEvalSupported: false,
        standardFontDataUrl:
            "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/standard_fonts/"
        } as any)

    const pdfDoc = await loadingTask.promise

    for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i)

        const textContent = await page.getTextContent()

        const pageText = textContent.items
        .map((item: any) => item.str)
        .filter(Boolean)
        .join(" ")

        cvText += pageText + " "
    }

    cvText = cvText
        .replace(/\s+/g, " ")
        .slice(0, 12000)

    } catch (err) {
    console.error("PDF parse error:", err)

    return Response.json(
        { error: "Failed to parse PDF" },
        { status: 500 }
    )
    }

    // 🔥 Get rubric
    const { data: job } = await supabaseAdmin
      .from("jobs")
      .select("rubric_json")
      .eq("id", jobId)
      .single()

    if (!job) {
      return Response.json(
        { error: "Job not found" },
        { status: 404 }
      )
    }

    const rubric = job.rubric_json

    // 🔥 AI evaluation
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `
Evaluate candidate strictly vs rubric.

Return JSON only.

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

CV:
${cvText}
`
    })

    const outputText =
      (response.output?.[0] as any)?.content?.[0]?.text || "{}"

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

  } catch (err) {
    console.error("Upload CV error:", err)

    return Response.json(
      { error: "Failed to process CV" },
      { status: 500 }
    )
  }
}