import Link from "next/link"
import { supabaseAdmin } from "@/lib/supabase"

export default async function JobsPage() {
  const { data: jobs } = await supabaseAdmin
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="max-w-4xl mx-auto p-10">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <Link
          href="/create-job"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Create Job
        </Link>
      </div>

      <div className="border rounded">
        {jobs?.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="block p-4 border-b hover:bg-gray-50"
          >
            <div className="font-semibold">{job.title}</div>
            <div className="text-sm text-gray-500">
              {job.description?.slice(0, 120)}...
            </div>
          </Link>
        ))}

        {jobs?.length === 0 && (
          <div className="p-6 text-gray-500">
            No jobs created yet.
          </div>
        )}
      </div>
    </div>
  )
}