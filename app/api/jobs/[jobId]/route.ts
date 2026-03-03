import { supabaseAdmin } from "@/lib/supabase"

export async function GET(
  req: Request,
  context: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await context.params

  const { data, error } = await supabaseAdmin
    .from("candidates")
    .select("id, name, overall_score, breakdown_json, created_at")
    .eq("job_id", jobId)
    .order("overall_score", { ascending: false })

  if (error) {
    return Response.json({ error }, { status: 500 })
  }

  return Response.json(data)
}