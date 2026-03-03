import { supabaseAdmin } from "@/lib/supabase"
import { NextRequest } from "next/server"

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await context.params

  const { data, error } = await supabaseAdmin
    .from("candidates")
    .select("*")
    .eq("job_id", jobId)
    .order("overall_score", { ascending: false })

  if (error) {
    return Response.json({ error }, { status: 500 })
  }

  return Response.json(data)
}