"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"

type Candidate = {
  id: string
  name: string
  overall_score: number
  breakdown_json: any
  parsed_text?: string
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

function extractEmail(text: string) {
  const match = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)
  return match ? match[0] : null
}

function extractPhone(text: string) {
  const match = text.match(/(\+62|62|0)8[1-9][0-9]{6,10}/)

  if (!match) return null

  let phone = match[0]

  if (phone.startsWith("0")) {
    phone = phone.replace(/^0/, "62")
  }

  return phone
}

function extractLinkedin(text: string) {
  const match = text.match(/(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-_%]+/i)
  return match ? match[0] : null
}

function getAIRecommendation(score: number) {
  if (score >= 85) {
    return { label: "Recommended", icon: "✅", confidence: "High", color: "text-green-400" }
  }

  if (score >= 70) {
    return { label: "Potential Fit", icon: "⚠️", confidence: "Medium", color: "text-yellow-400" }
  }

  return { label: "Not Recommended", icon: "❌", confidence: "Low", color: "text-red-400" }
}


export default function JobDetailPage() {

  const params = useParams()
  const jobId = params.jobId as string
  const router = useRouter()

  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedCount, setSelectedCount] = useState(0)

  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("score")

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [questions, setQuestions] = useState("")
  const [loadingQuestions, setLoadingQuestions] = useState(false)
  const [copied, setCopied] = useState(false)

  async function copyQuestions() {

    if (!questions) return
  
    try {
  
      await navigator.clipboard.writeText(questions)
  
      setCopied(true)
  
      setTimeout(() => {
        setCopied(false)
      }, 2000)
  
    } catch (err) {
  
      console.error(err)
  
    }
  
  }

  async function fetchCandidates() {
    if (!jobId) return

    setLoading(true)

    const res = await fetch(`/api/jobs/${jobId}/candidates`)
    const data = await res.json()

    setCandidates(data || [])

    setLoading(false)
  }

  function exportExcel() {
    window.open(`/api/export-candidates?jobId=${jobId}`)
  }

  async function generateQuestions(candidate: Candidate) {

    setLoadingQuestions(true)
    setQuestions("")
  
    try {
  
      const res = await fetch("/api/generate-interview-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          candidateName: candidate.name,
          summary: candidate.breakdown_json?.summary
        })
      })
  
      const data = await res.json()
  
      setQuestions(data.questions)
  
    } catch (err) {
  
      console.error(err)
  
    }
  
    setLoadingQuestions(false)
  
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

      console.error(err)

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


  /* FILTER + SORT */

  let visibleCandidates = [...candidates]

  if (filter === "strong") {
    visibleCandidates = visibleCandidates.filter(c => c.overall_score >= 85)
  }

  if (filter === "potential") {
    visibleCandidates = visibleCandidates.filter(c => c.overall_score >= 70 && c.overall_score < 85)
  }

  if (filter === "rejected") {
    visibleCandidates = visibleCandidates.filter(c => c.overall_score < 70)
  }

  if (sort === "score") {
    visibleCandidates.sort((a,b)=> b.overall_score - a.overall_score)
  }

  if (sort === "lowest") {
    visibleCandidates.sort((a,b)=> a.overall_score - b.overall_score)
  }

  return (

    <div className="min-h-screen bg-neutral-950 text-white">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(80,80,255,0.15),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-16 relative">

        {/* HEADER */}

        <div className="mb-10">

          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-3"
          >
            ← Back
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <h1 className="text-2xl sm:text-3xl font-semibold">
              Candidate Ranking
            </h1>

            <div className="flex items-center gap-3">

            <div className="text-sm text-neutral-400">
              {candidates.length} Candidates
            </div>

            <button
              onClick={() => router.push(`/jobs/${jobId}/compare`)}
              className="bg-purple-600 px-4 py-2 rounded-lg text-sm hover:bg-purple-500"
            >
              Compare Candidates
            </button>

            <button
              onClick={exportExcel}
              className="bg-neutral-800 border border-neutral-700 px-4 py-2 rounded-lg text-sm hover:bg-neutral-700 transition"
            >
              Export Excel
            </button>

            </div>

            </div>

        </div>


        {/* INSIGHTS */}

        {candidates.length > 0 && (

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-10">

            <div className="text-sm text-neutral-400 mb-4">
              Veritik Hiring Insights
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-sm">

              <div>
                <div className="text-neutral-500 mb-1">Average Score</div>
                <div className="font-semibold">{averageScore}</div>
              </div>

              <div>
                <div className="text-neutral-500 mb-1">Recommended Candidates</div>
                <div className="font-semibold text-green-400">
                  {recommendedCount} / {candidates.length}
                </div>
              </div>

              <div>
                <div className="text-neutral-500 mb-1">Total Candidates</div>
                <div className="font-semibold">{candidates.length}</div>
              </div>

            </div>

          </div>

        )}


        {/* FILTER */}

        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 text-sm items-center">

          <button onClick={()=>setFilter("all")} className="px-4 py-1 bg-neutral-800 rounded-lg">
            All
          </button>

          <button onClick={()=>setFilter("strong")} className="px-4 py-1 bg-neutral-800 rounded-lg">
            Strong Fit
          </button>

          <button onClick={()=>setFilter("potential")} className="px-4 py-1 bg-neutral-800 rounded-lg">
            Potential
          </button>

          <button onClick={()=>setFilter("rejected")} className="px-4 py-1 bg-neutral-800 rounded-lg">
            Rejected
          </button>

          <div className="flex gap-2 sm:gap-3 sm:ml-auto">

            <button onClick={()=>setSort("score")} className="px-4 py-1 bg-neutral-800 rounded-lg">
              Highest
            </button>

            <button onClick={()=>setSort("lowest")} className="px-4 py-1 bg-neutral-800 rounded-lg">
              Lowest
            </button>

          </div>

          </div>


        {/* UPLOAD */}

        <div className="mb-12">

          <label className="block cursor-pointer">

          <div className="bg-neutral-900 border border-dashed border-neutral-700 rounded-2xl p-6 sm:p-10 text-center hover:border-white transition">

              <div className="text-lg font-semibold mb-2">
                {uploading ? "Uploading CVs..." : "Upload Candidate CVs"}
              </div>

              <div className="text-sm text-neutral-400">
                Drag & drop multiple PDF files here or click to browse
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

            {visibleCandidates.map((c,index)=>{

              const email = extractEmail(c.parsed_text || "")
              const phone = extractPhone(c.parsed_text || "")
              const linkedin = extractLinkedin(c.parsed_text || "")

              const medal =
                index === 0 ? "🥇" :
                index === 1 ? "🥈" :
                index === 2 ? "🥉" : null

              const decision = getAIRecommendation(c.overall_score)

              return(

                <div
                  key={c.id}
                  onClick={()=>setSelectedCandidate(c)}
                  className="cursor-pointer bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-600 transition"
                >

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">

                <div>

                  <div className="text-sm text-neutral-500 flex items-center gap-2">
                    {medal} Rank #{index + 1}
                  </div>

                  <div className="text-lg font-semibold">
                    {c.name}
                  </div>

                </div>

                <div className="flex items-center gap-2">

                  <div className={`text-xl font-bold px-4 py-2 rounded-xl ${
                    c.overall_score >= 85
                      ? "bg-green-500/20 text-green-400"
                      : c.overall_score >= 70
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}>
                    {c.overall_score}
                  </div>

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
                        <ScoreBar label="Skills Match" score={c.breakdown_json.skills_score} />
                      )}

                      {c.breakdown_json.experience_score && (
                        <ScoreBar label="Experience Match" score={c.breakdown_json.experience_score} />
                      )}

                      {c.breakdown_json.education_score && (
                        <ScoreBar label="Education Match" score={c.breakdown_json.education_score} />
                      )}

                    </div>

                  )}


                  {/* DECISION */}

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

                  <div className="flex gap-3 mt-4">

                  <div className="text-xs text-neutral-500 mt-4 mb-2">
                    Contact Candidate
                  </div>

                    {email && (
                      <a
                      href={`mailto:${email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-2 text-sm bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700"
                    >
                      📧 Email
                    </a>
                    )}

                    {phone && (
                      <a
                      href={`https://wa.me/${phone}`}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-2 text-sm bg-green-600 rounded-lg hover:bg-green-500"
                    >
                      💬 WhatsApp
                    </a>
                    )}

                    {linkedin && (
                      <a
                        href={linkedin.startsWith("http") ? linkedin : `https://${linkedin}`}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-2 text-sm bg-blue-600 rounded-lg hover:bg-blue-500"
                      >
                        🔗 LinkedIn
                      </a>
                    )}

                  </div>

                </div>

              )

            })}

          </div>

        )}


        {/* MODAL */}

        {selectedCandidate && (

          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 max-w-2xl w-full">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-xl font-semibold">
                  Candidate Detail
                </h2>

                <button
                  onClick={()=>{
                    setSelectedCandidate(null)
                    setQuestions("")
                  }}
                  className="text-neutral-400 hover:text-white"
                >
                  ✕
                </button>

              </div>

              <div className="space-y-4">

              <p className="text-neutral-300">
                {selectedCandidate.breakdown_json?.summary}
              </p>

              <button
                onClick={() => generateQuestions(selectedCandidate)}
                className="bg-neutral-800 px-4 py-2 rounded-lg text-sm hover:bg-neutral-700"
              >
                Generate Interview Questions
              </button>

              {loadingQuestions && (
                <p className="text-sm text-neutral-400">
                  Generating questions...
                </p>
              )}

              {questions && (

              <div className="space-y-3">

                <div className="bg-neutral-800 p-4 rounded-lg text-sm whitespace-pre-line">
                  {questions}
                </div>

                <button
                  onClick={copyQuestions}
                  className="bg-neutral-800 px-4 py-2 rounded-lg text-sm hover:bg-neutral-700 transition"
                >
                  {copied ? "Copied ✓" : "Copy Questions"}
                </button>

              </div>

              )}

              </div>

            </div>

          </div>

        )}


      </div>

    </div>

  )

}