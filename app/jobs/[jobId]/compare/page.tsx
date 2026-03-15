"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Candidate = {
  id: string;
  name: string;
  overall_score: number;
};

type TableRow = {
  name: string;
  skills: number;
  experience: string;
  score: number;
};

export default function ComparePage() {
  const params = useParams();
  const router = useRouter();

  const jobId = params.jobId as string;

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState("");
  const [table, setTable] = useState<TableRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [jobName, setJobName] = useState("");

  const MAX_SELECTION = 5;

  async function fetchJob() {
    const res = await fetch(`/api/jobs/${jobId}`);
    const data = await res.json();
    setJobName(data?.title || "");
  }

  async function fetchCandidates() {
    const res = await fetch(`/api/jobs/${jobId}/candidates`);
    const data = await res.json();
    setCandidates(data || []);
  }

  function toggleCandidate(id: string) {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
      return;
    }

    if (selected.length >= MAX_SELECTION) {
      alert(`Max ${MAX_SELECTION} candidates`);
      return;
    }

    setSelected([...selected, id]);
  }

  async function compare() {
    setLoading(true);
    setResult("");
    setTable([]);

    const res = await fetch("/api/compare-candidates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        candidateIds: selected,
      }),
    });

    const data = await res.json();

    setResult(data.result || "");
    setTable(data.table || []);

    setLoading(false);
  }

  async function copyResult() {
    await navigator.clipboard.writeText(result);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  useEffect(() => {
    fetchCandidates();
    fetchJob();
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative overflow-hidden">
      {/* HEXAGON BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
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
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#hex)" />
        </svg>
      </div>

      {/* AI GLOW */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-225 h-125 bg-blue-500/10 blur-[140px] rounded-full mt-20"></div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(80,80,255,0.15),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* BACK */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 mb-6"
        >
          ← Back
        </button>

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">
            Compare Candidates
          </h1>

          {jobName && (
            <p className="text-neutral-500 mt-1 text-sm">{jobName}</p>
          )}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT SIDE */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-neutral-500">
                {selected.length} / {MAX_SELECTION} selected
              </p>
            </div>

            <div className="space-y-4">
              {candidates.map((c) => {
                const active = selected.includes(c.id);

                return (
                  <div
                    key={c.id}
                    onClick={() => toggleCandidate(c.id)}
                    className={`cursor-pointer flex justify-between items-center p-5 rounded-xl border transition
                    ${
                      active
                        ? "border-blue-500 bg-blue-50"
                        : "border-neutral-200 bg-white hover:border-neutral-400"
                    }
                    `}
                  >
                    <div>
                      <p className="font-medium">{c.name}</p>

                      <p className="text-xs text-neutral-500">
                        Score: {c.overall_score}
                      </p>
                    </div>

                    <div
                      className={`text-xs px-3 py-1 rounded-full
                      ${active ? "bg-blue-600 text-white" : "bg-neutral-100"}
                      `}
                    >
                      {active ? "Selected" : "Select"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:sticky lg:top-59 h-fit">
            <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-8">
              {/* HEADER */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Veritik Comparison</h2>

                {result && (
                  <button
                    onClick={copyResult}
                    className="text-sm text-neutral-500 hover:text-neutral-900"
                  >
                    {copied ? "Copied ✓" : "Copy"}
                  </button>
                )}
              </div>

              {/* TAGS */}
              {selected.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selected.map((id) => {
                    const candidate = candidates.find((c) => c.id === id);
                    if (!candidate) return null;

                    return (
                      <div
                        key={id}
                        className="bg-neutral-100 text-xs px-3 py-1 rounded-full flex items-center gap-2"
                      >
                        {candidate.name}

                        <span
                          onClick={() => toggleCandidate(id)}
                          className="cursor-pointer text-neutral-400 hover:text-neutral-900"
                        >
                          ✕
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ACTION */}
              {selected.length >= 2 && (
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={compare}
                    disabled={loading}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {loading ? "Generating..." : "Generate Comparison"}
                  </button>

                  <button
                    onClick={() => setSelected([])}
                    className="text-sm text-neutral-500 hover:text-neutral-900"
                  >
                    Clear
                  </button>
                </div>
              )}

              {/* BEST */}
              {table.length > 0 && (
                <div className="mb-4 p-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm">
                  🏆 Best Candidate:
                  <span className="font-semibold ml-2">{table[0].name}</span>
                </div>
              )}

              {/* TABLE */}
              {table.length > 0 && (
                <div className="mb-6 overflow-x-auto border border-neutral-200 rounded-lg">
                  <table className="w-full text-sm">
                    <thead className="bg-neutral-50 border-b border-neutral-200">
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
                      {table.map((c, i) => (
                        <tr
                          key={i}
                          className="border-b border-neutral-200 hover:bg-neutral-50 transition"
                        >
                          <td className="px-4 py-3 font-medium">
                            {i === 0 && <span className="mr-2">🏆</span>}

                            {c.name}
                          </td>

                          <td className="px-4 py-3">{c.skills}</td>

                          <td className="px-4 py-3">{c.experience}</td>

                          <td className="px-4 py-3 font-semibold">{c.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* RESULT */}
              <div className="text-sm text-neutral-700 whitespace-pre-line leading-relaxed max-h-[60vh] overflow-y-auto">
                {!result && (
                  <p className="text-neutral-400">
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
  );
}
