"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

type Candidate = {
  id: string
  name: string
  overall_score: number
  breakdown_json: any
}

export default function JobDetailPage() {
  const params = useParams()
  const jobId = params.jobId as string

  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedCount, setSelectedCount] = useState(0)

  async function fetchCandidates() {
    if (!jobId) return

    setLoading(true)
    const res = await fetch(`/api/jobs/${jobId}/candidates`)
    const data = await res.json()
    setCandidates(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchCandidates()
  }, [jobId])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files) return
  
    setSelectedCount(files.length)
    setUploading(true)
  
    try {
      const uploadPromises = Array.from(files).map((file) => {
        const formData = new FormData()
        formData.append("jobId", jobId)
        formData.append("file", file)
  
        return fetch("/api/upload-cv", {
          method: "POST",
          body: formData
        })
      })
  
      await Promise.all(uploadPromises)
  
      await fetchCandidates()
    } catch (err) {
      console.error("Upload error:", err)
    }
  
    setUploading(false)
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-6xl mx-auto px-8 py-16">
  
        <div className="flex justify-between items-center mb-12">
        <div className="mb-12">
            <h1 className="text-3xl font-semibold mb-8">
              Candidate Ranking
            </h1>
          </div>
  
          <div className="w-full mb-10">
            <label className="block cursor-pointer">
              <div className="bg-neutral-900 border border-dashed border-neutral-700 rounded-2xl p-8 text-center hover:border-white transition">
                
                <div className="text-lg font-semibold mb-2">
                  {uploading ? "Uploading CVs..." : "Upload Candidate CVs"}
                </div>

                <div className="text-sm text-neutral-400">
                  Drag & drop multiple PDF files here or click to browse
                </div>

                <div className="text-xs text-neutral-500 mt-2">
                  Supports bulk upload
                </div>
                {selectedCount > 0 && !uploading && (
                  <div className="text-xs text-green-400 mt-3">
                    {selectedCount} file(s) selected
                  </div>
                )}

                <input
                  type="file"
                  multiple
                  accept="application/pdf"
                  onChange={handleUpload}
                  className="hidden"
                />
              </div>
            </label>
          </div>
        </div>
  
        {loading ? (
          <div className="text-neutral-400">Loading candidates...</div>
        ) : (
          <div className="space-y-6">
            {candidates.map((c, index) => (
              <div
                key={c.id}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-600 transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-sm text-neutral-500">
                      Rank #{index + 1}
                    </div>
                    <div className="text-lg font-semibold">
                      {c.name}
                    </div>
                  </div>
  
                  <div className={`text-2xl font-bold px-4 py-2 rounded-xl ${
                    c.overall_score >= 85
                      ? "bg-green-500/20 text-green-400"
                      : c.overall_score >= 70
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}>
                    {c.overall_score}
                  </div>
                </div>
  
                <p className="text-neutral-400 leading-relaxed">
                  {c.breakdown_json?.summary}
                </p>
              </div>
            ))}
  
            {candidates.length === 0 && (
              <div className="text-neutral-500 text-center border border-neutral-800 rounded-2xl p-8">
                No candidates uploaded yet.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}