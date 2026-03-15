export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import LogoutButton from "@/components/LogoutButton";

export default async function HomePage() {
  const { data: jobs } = await supabaseAdmin
    .from("jobs")
    .select("id, title, created_at")
    .order("created_at", { ascending: false });

  const { data: candidates } = await supabaseAdmin
    .from("candidates")
    .select("overall_score");

  const totalCandidates = candidates?.length ?? 0;

  const avgScore =
    candidates && candidates.length > 0
      ? Math.round(
          candidates.reduce((acc, c) => acc + (c.overall_score ?? 0), 0) /
            candidates.length,
        )
      : null;

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative overflow-hidden">
      {/* HEXAGON BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="hex"
              width="120"
              height="104"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M60 0 L120 30 L120 74 L60 104 L0 74 L0 30 Z"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#hex)" />
        </svg>
      </div>

      {/* BLUE AI GLOW */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-225 h-125 bg-blue-500/10 blur-[140px] rounded-full mt-20"></div>
      </div>
      {/* HEADER */}

      <div className="border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo/logo-veritik.png" className="h-16 w-auto" />

            {/* <span className="font-semibold">Dashboard</span> */}
          </div>

          <LogoutButton />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* PAGE HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Resume Screening
            </h1>

            <p className="text-neutral-500 mt-2 max-w-lg">
              Automatically analyze and rank candidates using AI based on job
              requirements.
            </p>
          </div>

          <Link
            href="/create-job"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            + Create Job
          </Link>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <p className="text-sm text-neutral-500">Total Jobs</p>

            <h3 className="text-3xl font-semibold mt-2">{jobs?.length ?? 0}</h3>
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <p className="text-sm text-neutral-500">Candidates Screened</p>

            <h3 className="text-3xl font-semibold mt-2">{totalCandidates}</h3>
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <p className="text-sm text-neutral-500">Average Match Score</p>

            <h3 className="text-3xl font-semibold mt-2">
              {avgScore !== null ? `${avgScore}%` : "—"}
            </h3>
          </div>
        </div>

        {/* JOBS */}

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Jobs</h2>

            <span className="text-sm text-neutral-500">
              {jobs?.length ?? 0} total
            </span>
          </div>

          <div className="grid gap-4">
            {jobs?.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="bg-white border border-neutral-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>

                    <p className="text-sm text-neutral-500 mt-1">
                      AI screening enabled
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-neutral-500 mb-1">
                      {new Date(job.created_at).toLocaleDateString()}
                    </p>

                    <span className="text-neutral-400 text-lg">→</span>
                  </div>
                </div>
              </Link>
            ))}

            {jobs?.length === 0 && (
              <div className="border border-neutral-200 rounded-xl p-10 text-center bg-neutral-50">
                <p className="mb-5 text-neutral-500">No jobs created yet</p>

                <Link
                  href="/create-job"
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700"
                >
                  Create your first job
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
