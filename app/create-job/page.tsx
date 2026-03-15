"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateJobPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!title || !description) return;

    setLoading(true);

    try {
      const res = await fetch("/api/generate-rubric", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const data = await res.json();

      if (data?.jobId) {
        router.push(`/jobs/${data.jobId}`);
        return;
      }

      alert("Failed to create job");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative overflow-hidden">
      {/* HEXAGON BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.10]">
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
                stroke="#e2e8f0"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#hex)" />
        </svg>
      </div>

      {/* AI GLOW */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[900px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full mt-20"></div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(80,80,255,0.15),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10 flex justify-center">
        <div className="w-full max-w-3xl">
          {/* BACK BUTTON */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 mb-6"
          >
            ← Back
          </button>

          {/* HEADER */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">
              Create New Job
            </h1>

            <p className="text-neutral-500 mt-2">
              Paste job description and generate AI scoring rubric
            </p>
          </div>

          {/* FORM CARD */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm space-y-6">
            {/* JOB TITLE */}
            <div>
              <label className="block text-sm text-neutral-600 mb-2">
                Job Title
              </label>

              <input
                type="text"
                placeholder="e.g. Senior Fullstack Developer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* JOB DESCRIPTION */}
            <div>
              <label className="block text-sm text-neutral-600 mb-2">
                Job Description
              </label>

              <textarea
                rows={8}
                maxLength={3000}
                placeholder="Paste complete job description here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition resize-none"
              />

              <div
                className={`text-xs mt-2 text-right ${
                  description.length > 2700
                    ? "text-red-500"
                    : "text-neutral-400"
                }`}
              >
                {description.length} / 3000
              </div>
            </div>

            {/* SUBMIT */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Generating Rubric..." : "Create & Generate Rubric"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
