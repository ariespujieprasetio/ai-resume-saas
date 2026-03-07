import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {

  const body = await req.json()

  const { jobTitle, candidateName, summary } = body

  const prompt = `
You are an expert technical interviewer.

Job Role:
${jobTitle}

Candidate:
${candidateName}

Candidate Background:
${summary}

Generate 5 interview questions tailored for this candidate.
Focus on skills verification, real-world problem solving, and experience validation.

Return as a numbered list.
`

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: prompt }
    ]
  })

  const text = response.choices[0].message.content

  return NextResponse.json({ questions: text })
}