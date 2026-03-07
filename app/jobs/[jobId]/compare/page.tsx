"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

type Candidate = {
  id: string
  name: string
  overall_score: number
}

type TableRow = {
  name: string
  skills: number
  experience: string
  score: number
}

export default function ComparePage(){

  const params = useParams()
  const router = useRouter()

  const jobId = params.jobId as string

  const [candidates,setCandidates] = useState<Candidate[]>([])
  const [selected,setSelected] = useState<string[]>([])
  const [result,setResult] = useState("")
  const [table,setTable] = useState<TableRow[]>([])
  const [loading,setLoading] = useState(false)
  const [copied,setCopied] = useState(false)
  const [jobName,setJobName] = useState("")

  const MAX_SELECTION = 5

  async function fetchJob(){
    const res = await fetch(`/api/jobs/${jobId}`)
    const data = await res.json()
    setJobName(data?.title || "")
  }

  async function fetchCandidates(){
    const res = await fetch(`/api/jobs/${jobId}/candidates`)
    const data = await res.json()
    setCandidates(data || [])
  }

  function toggleCandidate(id:string){

    if(selected.includes(id)){
      setSelected(selected.filter(i=>i!==id))
      return
    }

    if(selected.length >= MAX_SELECTION){
      alert(`Max ${MAX_SELECTION} candidates`)
      return
    }

    setSelected([...selected,id])
  }

  async function compare(){

    setLoading(true)
    setResult("")
    setTable([])

    const res = await fetch("/api/compare-candidates",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        candidateIds:selected
      })
    })

    const data = await res.json()

    setResult(data.result || "")
    setTable(data.table || [])

    setLoading(false)
  }

  async function copyResult(){

    await navigator.clipboard.writeText(result)

    setCopied(true)

    setTimeout(()=>{
      setCopied(false)
    },2000)
  }

  useEffect(()=>{
    fetchCandidates()
    fetchJob()
  },[])

  return(

    <div className="min-h-screen bg-neutral-950 text-white">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(80,80,255,0.15),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative">

        {/* BACK */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-6"
        >
          ← Back
        </button>

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight bg-linear-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            Compare Candidates
          </h1>

          {jobName && (
            <p className="text-neutral-400 mt-2 text-sm sm:text-base">
              {jobName}
            </p>
          )}

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">

          {/* LEFT SIDE */}
          <div>

            <div className="flex justify-between items-center mb-6">

              <p className="text-sm text-neutral-400">
                {selected.length} / {MAX_SELECTION} selected
              </p>

            </div>

            <div className="space-y-4">

              {candidates.map(c=>{

                const active = selected.includes(c.id)

                return(

                  <div
                    key={c.id}
                    onClick={()=>toggleCandidate(c.id)}
                    className={`cursor-pointer flex justify-between items-center p-4 sm:p-5 rounded-2xl border transition
                    ${active
                      ? "border-white bg-neutral-900"
                      : "border-neutral-800 bg-neutral-900 hover:border-neutral-700"}
                    `}
                  >

                    <div>

                      <p className="font-medium text-sm sm:text-base">
                        {c.name}
                      </p>

                      <p className="text-xs text-neutral-400">
                        Score: {c.overall_score}
                      </p>

                    </div>

                    <div
                      className={`text-xs px-3 py-1 rounded-full
                      ${active
                        ? "bg-white text-black"
                        : "bg-neutral-800"}
                      `}
                    >
                      {active ? "Selected" : "Select"}
                    </div>

                  </div>

                )

              })}

            </div>

          </div>

          {/* RIGHT PANEL */}
          <div className="mt-8 lg:mt-[40px] lg:sticky lg:top-24 h-fit">

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur">

              {/* HEADER */}
              <div className="flex justify-between items-center mb-6">

                <h2 className="text-lg sm:text-xl font-semibold">
                  Veritik Comparison
                </h2>

                {result && (

                  <button
                    onClick={copyResult}
                    className="text-sm text-neutral-400 hover:text-white"
                  >
                    {copied ? "Copied ✓" : "Copy"}
                  </button>

                )}

              </div>

              {/* TAGS */}
              {selected.length > 0 && (

                <div className="flex flex-wrap gap-2 mb-6">

                  {selected.map(id=>{

                    const candidate = candidates.find(c=>c.id===id)

                    if(!candidate) return null

                    return(

                      <div
                        key={id}
                        className="bg-neutral-800 text-xs px-3 py-1 rounded-full flex items-center gap-2"
                      >

                        {candidate.name}

                        <span
                          onClick={()=>toggleCandidate(id)}
                          className="cursor-pointer text-neutral-400 hover:text-white"
                        >
                          ✕
                        </span>

                      </div>

                    )

                  })}

                </div>

              )}

              {/* ACTION */}
              {selected.length >= 2 && (

                <div className="flex flex-wrap gap-3 mb-6">

                  <button
                    onClick={compare}
                    disabled={loading}
                    className="bg-white text-black px-5 py-2.5 rounded-xl font-medium hover:scale-[1.02] transition disabled:opacity-50"
                  >
                    {loading ? "Generating..." : "Generate Comparison"}
                  </button>

                  <button
                    onClick={()=>setSelected([])}
                    className="text-sm text-neutral-400 hover:text-white"
                  >
                    Clear
                  </button>

                </div>

              )}

              {/* BEST */}
              {table.length > 0 && (

                <div className="mb-4 p-3 rounded-xl border border-neutral-800 bg-neutral-950 text-sm">

                  🏆 Best Candidate:{" "}
                  <span className="font-semibold">
                    {table[0].name}
                  </span>

                </div>

              )}

              {/* TABLE */}
              {table.length > 0 && (

                <div className="mb-6 overflow-x-auto rounded-xl border border-neutral-800">

                  <table className="w-full min-w-[500px] text-sm">

                    <thead className="bg-neutral-950 text-neutral-400 border-b border-neutral-800">

                      <tr>

                        <th className="text-left px-4 py-3 font-medium">
                          Candidate
                        </th>

                        <th className="text-left px-4 py-3 font-medium">
                          Skills
                        </th>

                        <th className="text-left px-4 py-3 font-medium">
                          Experience
                        </th>

                        <th className="text-left px-4 py-3 font-medium">
                          Score
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {table.map((c,i)=>(

                        <tr
                          key={i}
                          className="border-b border-neutral-800 hover:bg-neutral-800/40 transition"
                        >

                          <td className="px-4 py-3 font-medium">

                            {i === 0 && (
                              <span className="mr-2">
                                🏆
                              </span>
                            )}

                            {c.name}

                          </td>

                          <td className="px-4 py-3 text-neutral-300">
                            {c.skills}
                          </td>

                          <td className="px-4 py-3 text-neutral-300">
                            {c.experience}
                          </td>

                          <td className="px-4 py-3 font-semibold">
                            {c.score}
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

              {/* RESULT */}
              <div className="text-sm text-neutral-300 whitespace-pre-line leading-relaxed max-h-[60vh] overflow-y-auto">

                {!result && (
                  <p className="text-neutral-500">
                    Select at least 2 candidates to generate AI comparison.
                  </p>
                )}

                {result}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  )
}