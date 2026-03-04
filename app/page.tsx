export const dynamic = "force-dynamic"

import Link from "next/link"
import { supabaseAdmin } from "@/lib/supabase"

export default async function HomePage() {

  const { data: jobs } = await supabaseAdmin
    .from("jobs")
    .select("id, title, created_at")
    .order("created_at", { ascending: false })

  const { data: candidates } = await supabaseAdmin
    .from("candidates")
    .select("overall_score")

  const totalCandidates = candidates?.length ?? 0

  const avgScore =
    candidates && candidates.length > 0
      ? Math.round(
          candidates.reduce(
            (acc, c) => acc + (c.overall_score ?? 0),
            0
          ) / candidates.length
        )
      : null

  return (
    <div className="min-h-screen bg-neutral-950 text-white">

      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(80,80,255,0.15),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 py-16 relative">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-16">

          <div>
            <h1 className="text-4xl font-semibold tracking-tight bg-linear-to-r from-white to-neutral-400 bg-clip-text text-transparent">
              Veritik Resume Screening
            </h1>

            <p className="text-neutral-400 mt-3 max-w-lg">
              Automatically analyze and rank candidates using AI based on job requirements.
            </p>
          </div>

          <Link
            href="/create-job"
            className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:scale-[1.02] transition"
          >
            + Create Job
          </Link>

        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <p className="text-neutral-400 text-sm">Total Jobs</p>
            <h3 className="text-3xl font-semibold mt-2">
              {jobs?.length ?? 0}
            </h3>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <p className="text-neutral-400 text-sm">Candidates Screened</p>
            <h3 className="text-3xl font-semibold mt-2">
              {totalCandidates}
            </h3>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <p className="text-neutral-400 text-sm">Average Match Score</p>
            <h3 className="text-3xl font-semibold mt-2">
              {avgScore !== null ? `${avgScore}%` : "—"}
            </h3>
          </div>

        </div>

        {/* JOB LIST */}
        <div className="grid gap-6">

          {jobs?.map((job) => (

            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="group bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-600 hover:bg-neutral-900/70 transition backdrop-blur"
            >

              <div className="flex justify-between items-center">

                <div>
                  <h2 className="text-xl font-semibold group-hover:text-white">
                    {job.title}
                  </h2>

                  <p className="text-neutral-500 text-sm mt-1">
                    AI screening enabled
                  </p>
                </div>

                <span className="text-sm text-neutral-500">
                  {new Date(job.created_at).toLocaleDateString()}
                </span>

              </div>

            </Link>

          ))}

          {jobs?.length === 0 && (

            <div className="text-neutral-400 border border-neutral-800 rounded-2xl p-10 text-center bg-neutral-900">

              <p className="mb-4">
                No jobs created yet
              </p>

              <Link
                href="/create-job"
                className="bg-white text-black px-5 py-2 rounded-lg"
              >
                Create your first job
              </Link>

            </div>

          )}

        </div>

      </div>
    </div>
  )
}