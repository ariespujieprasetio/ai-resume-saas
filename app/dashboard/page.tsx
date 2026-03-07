export const dynamic = "force-dynamic"

import Link from "next/link"
import { supabaseAdmin } from "@/lib/supabase"
import LogoutButton from "@/components/LogoutButton"

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
    <div className="min-h-screen bg-neutral-950 text-white relative">

      {/* LOGO TOP LEFT */}
      <div className="absolute top-6 left-8 flex items-center gap-2 font-semibold text-lg z-10">

      <img
        src="/logo/logo-veritik.jpeg"
        alt="Veritik"
        className="w-9 h-9 rounded-md object-contain"
      />

      Veritik

      </div>

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(80,80,255,0.15),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 sm:py-16 relative">

      {/* HEADER */}
      <div className="mb-14">


        {/* MAIN HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-8">

          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
              Veritik Resume Screening
            </h1>

            <p className="text-neutral-400 mt-3 max-w-xl text-sm sm:text-base leading-relaxed">
              Automatically analyze and rank candidates using AI based on job requirements.
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-3">

            <Link
              href="/create-job"
              className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:scale-[1.03] active:scale-[0.98] transition"
            >
              + Create Job
            </Link>

            <LogoutButton />

          </div>

        </div>

      </div>


        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">

          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-600 transition backdrop-blur">

            <p className="text-neutral-400 text-sm">
              Total Jobs
            </p>

            <h3 className="text-3xl font-semibold mt-2">
              {jobs?.length ?? 0}
            </h3>

          </div>


          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-600 transition backdrop-blur">

            <p className="text-neutral-400 text-sm">
              Candidates Screened
            </p>

            <h3 className="text-3xl font-semibold mt-2">
              {totalCandidates}
            </h3>

          </div>


          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-600 transition backdrop-blur">

            <p className="text-neutral-400 text-sm">
              Average Match Score
            </p>

            <h3 className="text-3xl font-semibold mt-2">
              {avgScore !== null ? `${avgScore}%` : "—"}
            </h3>

          </div>

        </div>


        {/* JOB SECTION */}

        <div>

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-lg font-semibold text-neutral-300">
              Jobs
            </h2>

            <span className="text-xs text-neutral-500">
              {jobs?.length ?? 0} total
            </span>

          </div>


          <div className="grid gap-4">

            {jobs?.map((job) => (

              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="group bg-neutral-900/70 border border-neutral-800 rounded-xl p-6 hover:border-neutral-600 hover:bg-neutral-900 transition"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="text-lg font-semibold group-hover:text-white transition">
                      {job.title}
                    </h3>

                    <p className="text-neutral-500 text-sm mt-1">
                      AI screening enabled
                    </p>

                  </div>


                  <div className="text-right">

                    <p className="text-xs text-neutral-500 mb-1">
                      {new Date(job.created_at).toLocaleDateString()}
                    </p>

                    <span className="text-neutral-400 group-hover:text-white text-lg transition">
                      →
                    </span>

                  </div>

                </div>

              </Link>

            ))}


            {jobs?.length === 0 && (

              <div className="text-neutral-400 border border-neutral-800 rounded-2xl p-10 text-center bg-neutral-900">

                <p className="mb-5">
                  No jobs created yet
                </p>

                <Link
                  href="/create-job"
                  className="bg-white text-black px-6 py-2.5 rounded-lg font-medium"
                >
                  Create your first job
                </Link>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  )
}