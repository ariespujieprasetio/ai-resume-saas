"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateJobPage() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!title || !description) return

    setLoading(true)

    try {
      const res = await fetch("/api/generate-rubric", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description })
      })

      const data = await res.json()

      if (data?.jobId) {
        router.push(`/jobs/${data.jobId}`)
        return
      }

      alert("Failed to create job")
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">

      {/* SAME BACKGROUND AS OTHER PAGES */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(80,80,255,0.15),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 py-20 relative flex justify-center">

        <div className="w-full max-w-3xl">

          {/* TITLE */}
          <div className="mb-12 text-center">

            <h1 className="text-4xl font-semibold tracking-tight bg-linear-to-r from-white to-neutral-400 bg-clip-text text-transparent">
              Create New Job
            </h1>

            <p className="text-neutral-400 mt-3">
              Paste job description and generate AI scoring rubric
            </p>

          </div>


          {/* FORM CARD */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-10 space-y-6 backdrop-blur">

            {/* JOB TITLE */}
            <div>
              <label className="block text-sm text-neutral-400 mb-2">
                Job Title
              </label>

              <input
                type="text"
                placeholder="e.g. Senior Fullstack Developer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 focus:outline-none focus:border-white transition"
              />
            </div>


            {/* JOB DESCRIPTION */}
            <div>
              <label className="block text-sm text-neutral-400 mb-2">
                Job Description
              </label>

              <textarea
                rows={8}
                placeholder="Paste complete job description here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 focus:outline-none focus:border-white transition resize-none"
              />
            </div>


            {/* SUBMIT */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-white text-black py-3 rounded-xl font-medium hover:scale-[1.02] transition disabled:opacity-50"
            >
              {loading ? "Generating Rubric..." : "Create & Generate Rubric"}
            </button>

          </div>

        </div>
      </div>
    </div>
  )
}