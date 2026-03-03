import Link from "next/link"
import { supabaseAdmin } from "@/lib/supabase"

export default async function HomePage() {
  const { data: jobs } = await supabaseAdmin
    .from("jobs")
    .select("id, title, created_at")
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-6xl mx-auto px-8 py-16">

        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">
              AI Resume Screening
            </h1>
            <p className="text-neutral-400 mt-2">
              Automatically rank candidates based on job requirements
            </p>
          </div>

          <Link
            href="/create-job"
            className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            + Create Job
          </Link>
        </div>

        <div className="grid gap-6">
          {jobs?.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="group bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-600 transition"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold group-hover:text-white">
                  {job.title}
                </h2>

                <span className="text-sm text-neutral-500">
                  {new Date(job.created_at).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}

          {jobs?.length === 0 && (
            <div className="text-neutral-500 border border-neutral-800 rounded-2xl p-8 text-center">
              No jobs created yet.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}