import { supabaseAdmin } from "@/lib/supabase"

export async function GET(
  req: Request,
  context: { params: Promise<{ jobId: string }> }
) {

  const { jobId } = await context.params

  const { data, error } = await supabaseAdmin
    .from("jobs")
    .select("id, title")
    .eq("id", jobId)
    .single()

  if (error) {
    return Response.json({ error }, { status: 500 })
  }

  return Response.json(data)

}