"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

type Candidate = {
  id: string
  name: string
  overall_score: number
  breakdown_json: any
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs text-neutral-400 mb-1">
        <span>{label}</span>
        <span>{score}%</span>
      </div>

      <div className="w-full bg-neutral-800 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

function getAIRecommendation(score: number) {
  if (score >= 85) {
    return {
      label: "Strong Fit",
      icon: "✅",
      confidence: "High",
      color: "text-green-400"
    }
  }

  if (score >= 70) {
    return {
      label: "Potential Fit",
      icon: "⚠️",
      confidence: "Medium",
      color: "text-yellow-400"
    }
  }

  return {
    label: "Not Recommended",
    icon: "❌",
    confidence: "Low",
    color: "text-red-400"
  }
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

  const topCandidate = candidates.length > 0 ? candidates[0] : null

  const averageScore =
    candidates.length > 0
      ? Math.round(
          candidates.reduce((acc, c) => acc + c.overall_score, 0) /
            candidates.length
        )
      : null

  const recommendedCount = candidates.filter(
    (c) => c.overall_score >= 85
  ).length

  return (
    <div className="min-h-screen bg-neutral-950 text-white">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(80,80,255,0.15),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 py-16 relative">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-semibold">
            Candidate Ranking
          </h1>

          <div className="text-sm text-neutral-400">
            {candidates.length} Candidates
          </div>
        </div>

        {/* AI INSIGHTS */}
        {candidates.length > 0 && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-10">

            <div className="text-sm text-neutral-400 mb-4">
              Veritik Hiring Insights
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-sm">

              <div>
                <div className="text-neutral-500 mb-1">
                  Average Score
                </div>

                <div className="font-semibold">
                  {averageScore}
                </div>
              </div>

              <div>
                <div className="text-neutral-500 mb-1">
                  Recommended Candidates
                </div>

                <div className="font-semibold text-green-400">
                  {recommendedCount} / {candidates.length}
                </div>
              </div>

              <div>
                <div className="text-neutral-500 mb-1">
                  Total Candidates
                </div>

                <div className="font-semibold">
                  {candidates.length}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TOP CANDIDATE */}
        {topCandidate && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 mb-10 flex justify-between items-center">

            <div>
              <div className="text-neutral-400 text-sm">
                Top Candidate
              </div>

              <div className="font-semibold">
                🥇 {topCandidate.name.replace(".pdf","")}
              </div>
            </div>

            <div className="text-green-400 font-semibold text-lg">
              {topCandidate.overall_score}%
            </div>

          </div>
        )}

        {/* UPLOAD BOX */}
        <div className="mb-12">
          <label className="block cursor-pointer">

            <div className="bg-neutral-900 border border-dashed border-neutral-700 rounded-2xl p-10 text-center hover:border-white transition">

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

        {/* CANDIDATES */}
        {loading ? (
          <div className="text-neutral-400">
            Loading candidates...
          </div>
        ) : (
          <div className="space-y-6">

            {candidates.map((c, index) => {

              const medal =
                index === 0
                  ? "🥇"
                  : index === 1
                  ? "🥈"
                  : index === 2
                  ? "🥉"
                  : null

              const decision = getAIRecommendation(c.overall_score)

              return (
                <div
                  key={c.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-600 transition"
                >

                  <div className="flex justify-between items-start mb-4">

                    <div>
                      <div className="text-sm text-neutral-500 flex items-center gap-2">
                        {medal} Rank #{index + 1}
                      </div>

                      <div className="text-lg font-semibold">
                        {c.name}
                      </div>
                    </div>

                    <div
                      className={`text-xl font-bold px-4 py-2 rounded-xl ${
                        c.overall_score >= 85
                          ? "bg-green-500/20 text-green-400"
                          : c.overall_score >= 70
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {c.overall_score}
                    </div>

                  </div>

                  {/* SCORE BAR */}
                  <div className="w-full bg-neutral-800 rounded-full h-2 mb-4">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${c.overall_score}%` }}
                    />
                  </div>

                  {/* BREAKDOWN */}
                  {c.breakdown_json && (
                    <div className="mb-4">

                      {c.breakdown_json.skills_score && (
                        <ScoreBar
                          label="Skills Match"
                          score={c.breakdown_json.skills_score}
                        />
                      )}

                      {c.breakdown_json.experience_score && (
                        <ScoreBar
                          label="Experience Match"
                          score={c.breakdown_json.experience_score}
                        />
                      )}

                      {c.breakdown_json.education_score && (
                        <ScoreBar
                          label="Education Match"
                          score={c.breakdown_json.education_score}
                        />
                      )}

                    </div>
                  )}

                  {/* AI DECISION */}
                  <div className="flex justify-between items-center mb-2 text-sm">

                    <div className="text-neutral-400">
                      AI Decision
                    </div>

                    <div className={`font-semibold ${decision.color}`}>
                      {decision.icon} {decision.label}
                    </div>

                  </div>

                  <div className="text-xs text-neutral-500 mb-4">
                    Confidence: {decision.confidence}
                  </div>

                  <p className="text-neutral-400 leading-relaxed">
                    {c.breakdown_json?.summary}
                  </p>

                </div>
              )
            })}

          </div>
        )}

      </div>
    </div>
  )
}