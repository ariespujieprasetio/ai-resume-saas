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
  
      console.log("API RESPONSE:", data)
  
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
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-3xl">

        {/* Title */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">
            Create New Job
          </h1>
          <p className="text-neutral-400 mt-3">
            Paste job description and generate AI scoring rubric
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 space-y-6">

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

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Generating Rubric..." : "Create & Generate Rubric"}
          </button>

        </div>
      </div>
    </div>
  )
}