import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("jobs")
    .insert({
      title: "Test Job",
      description: "Testing database connection",
      rubric_json: { test: true }
    })
    .select()
    .single()

  if (error) {
    return Response.json({ error }, { status: 500 })
  }

  return Response.json({ success: true, data })
}