"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does Veritik analyze resumes?",
      answer:
        "Veritik uses AI to extract skills, experience and education from resumes and evaluate them against your job description.",
    },
    {
      question: "Is it suitable for high-volume outsourcing?",
      answer:
        "Yes. Veritik is designed to process hundreds of CVs per batch and rank candidates instantly.",
    },
    {
      question: "Can I compare candidates side-by-side?",
      answer:
        "Yes. You can select candidates and compare them with AI-generated insights.",
    },
    {
      question: "What resume formats are supported?",
      answer: "PDF and DOCX formats are supported.",
    },
    {
      question: "How is candidate data protected?",
      answer:
        "All candidate data is processed securely and never shared with third parties.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* LEFT */}

          <div className="flex items-center gap-10">
            <img src="/logo/logo-veritik.png" className="h-16 w-auto" />

            <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-500">
              <a href="#features" className="hover:text-black">
                Features
              </a>

              <a href="#how" className="hover:text-black">
                How It Works
              </a>

              <a href="#why" className="hover:text-black">
                Why Veritik
              </a>

              <a href="#faq" className="hover:text-black">
                FAQ
              </a>
            </nav>
          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-6">
            {/* STATUS */}

            <div className="hidden md:flex items-center gap-2 text-xs text-neutral-500">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              All systems operational
            </div>

            <a
              href="/login"
              className="text-sm text-neutral-600 hover:text-black"
            >
              Log In
            </a>

            <a
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Try Demo →
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-6 pt-28 md:pt-32 pb-20 md:pb-32 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* LEFT */}

        <div>
          <div className="inline-flex items-center px-4 py-1 rounded-full border text-sm text-blue-600 bg-blue-50">
            AI Hiring Intelligence Platform
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Hire Smarter.
            <br />
            Place <span className="text-blue-600">Faster.</span>
            <br />
            Win <span className="text-emerald-600">Every Role.</span>
          </h1>

          <p className="mt-6 text-neutral-600 max-w-lg">
            Veritik's AI instantly ranks, scores and compares candidates — so
            recruitment teams focus on relationships, not spreadsheets.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href="/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow"
            >
              Start Free Demo →
            </a>

            <a
              href="#features"
              className="border px-6 py-3 rounded-lg font-medium"
            >
              Explore Features
            </a>
          </div>

          {/* STATS CARD */}

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 bg-white border rounded-xl shadow divide-y sm:divide-y-0 sm:divide-x">
            <div className="px-6 py-4 text-center">
              <div className="font-bold text-lg">100+</div>
              <div className="text-xs text-neutral-500">CVs per batch</div>
            </div>

            <div className="px-6 py-4 text-center">
              <div className="font-bold text-lg">10x</div>
              <div className="text-xs text-neutral-500">Faster screening</div>
            </div>

            <div className="px-6 py-4 text-center">
              <div className="font-bold text-lg">99%</div>
              <div className="text-xs text-neutral-500">Score consistency</div>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="relative">
          <img
            src="/screenshot/ranking.jpeg"
            className="rounded-2xl shadow-2xl border"
          />

          {/* FLOATING BADGE */}

          <div className="absolute -top-6 right-10 bg-white border rounded-xl px-4 py-2 shadow text-sm">
            ⚡ 47 CVs · 11.4 sec
          </div>

          <div className="absolute -bottom-6 left-10 bg-white border rounded-xl px-4 py-2 shadow text-sm">
            ✅ Top Match Found
          </div>
        </div>
      </section>

      <section className="bg-[#0B1320] border-y border-[#1B2433] overflow-hidden">
        <div className="flex w-max animate-ticker gap-10 py-3 text-[11px] tracking-[0.2em] text-gray-400 whitespace-nowrap">
          <span>◆ RESUME PARSING</span>
          <span>◆ AI CANDIDATE SCORING</span>
          <span>◆ RANKED SHORTLISTS</span>
          <span>◆ SIDE-BY-SIDE COMPARISON</span>
          <span>◆ AI CANDIDATE INSIGHTS</span>
          <span>◆ CANDIDATE OUTREACH</span>
          <span>◆ OUTSOURCING READY</span>
          <span>◆ HEADHUNTER</span>

          {/* duplicate supaya loop */}
          <span>◆ RESUME PARSING</span>
          <span>◆ AI CANDIDATE SCORING</span>
          <span>◆ RANKED SHORTLISTS</span>
          <span>◆ SIDE-BY-SIDE COMPARISON</span>
          <span>◆ AI CANDIDATE INSIGHTS</span>
          <span>◆ CANDIDATE OUTREACH</span>
          <span>◆ OUTSOURCING READY</span>
          <span>◆ HEADHUNTER</span>
        </div>
      </section>

      {/* CHALLENGE */}

      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT TEXT */}

          <div>
            <div className="flex items-center gap-3 text-sm text-blue-600 font-medium mb-4">
              <span className="w-8 h-0.5 bg-blue-600"></span>
              THE CHALLENGE
            </div>

            <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
              Manual Hiring
              <br />
              Costs You Talent
            </h2>

            <p className="text-neutral-600 mt-6 max-w-md">
              Outsourcing and headhunting firms process hundreds of applications
              daily. Without AI, the best candidates get buried — and the wrong
              ones advance.
            </p>
          </div>

          {/* RIGHT CARDS */}

          <div className="border rounded-2xl grid grid-cols-1 md:grid-cols-3 md:divide-x overflow-hidden">
            {/* CARD 1 */}

            <div className="p-8">
              <div className="text-xs text-neutral-400 mb-4">001</div>

              <h3 className="font-semibold mb-2">Time-Intensive Screening</h3>

              <p className="text-sm text-neutral-600">
                Consultants spend 6–8 hours per day reading CVs that AI can
                process in under a minute.
              </p>
            </div>

            {/* CARD 2 */}

            <div className="p-8">
              <div className="text-xs text-neutral-400 mb-4">002</div>

              <h3 className="font-semibold mb-2">Inconsistent Evaluation</h3>

              <p className="text-sm text-neutral-600">
                Different reviewers, different standards. Subjectivity reduces
                placement quality and credibility.
              </p>
            </div>

            {/* CARD 3 */}

            <div className="p-8">
              <div className="text-xs text-neutral-400 mb-4">003</div>

              <h3 className="font-semibold mb-2">Top Talent Overlooked</h3>

              <p className="text-sm text-neutral-600">
                The best candidate rarely surfaces naturally from a 100-CV stack
                reviewed manually under time pressure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM CAPABILITIES */}

      <section id="features" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* SMALL BADGE */}

          <div className="flex justify-center items-center gap-3 text-xs tracking-widest text-blue-600 mb-6">
            <span className="w-8 h-0.5 bg-blue-600"></span>
            PLATFORM CAPABILITIES
          </div>

          {/* TITLE */}

          <h2 className="text-4xl md:text-5xl font-semibold">
            Everything Your Team Needs
          </h2>

          <p className="text-neutral-500 mt-4">
            Four core capabilities that transform how your recruitment firm
            works.
          </p>

          {/* TABS */}

          <div className="mt-12 flex justify-center">
            <div className="flex bg-neutral-100 rounded-xl border overflow-hidden text-sm">
              <button className="px-6 py-3 bg-blue-600 text-white font-medium">
                🏆 Ranking
              </button>

              <button className="px-6 py-3 text-neutral-500">
                ⚡ Comparison
              </button>

              <button className="px-6 py-3 text-neutral-500">
                📋 Job Setup
              </button>

              <button className="px-6 py-3 text-neutral-500">
                💡 AI Insights
              </button>
            </div>
          </div>

          {/* CONTENT */}

          <div className="grid md:grid-cols-2 gap-16 mt-20 items-center text-left">
            {/* LEFT */}

            <div>
              <div className="flex items-center gap-2 text-xs tracking-widest text-emerald-600 mb-4">
                <span className="w-6 h-0.5 bg-emerald-500"></span>
                CANDIDATE RANKING
              </div>

              <h3 className="text-3xl font-semibold">
                Rank Every Candidate Instantly
              </h3>

              <p className="text-neutral-600 mt-4 max-w-md">
                Upload any volume of CVs and receive a scored, ranked list in
                seconds — not hours. Every ranking is transparent and fully
                explainable.
              </p>

              <ul className="mt-6 space-y-4 text-neutral-600">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500">✓</span>
                  AI extracts skills, experience & education from any format
                </li>

                <li className="flex items-start gap-3">
                  <span className="text-emerald-500">✓</span>
                  Scored against your exact job requirements automatically
                </li>

                <li className="flex items-start gap-3">
                  <span className="text-emerald-500">✓</span>
                  Full score breakdown per candidate — no black box
                </li>

                <li className="flex items-start gap-3">
                  <span className="text-emerald-500">✓</span>
                  Handles 100+ CVs in a single batch upload
                </li>
              </ul>

              <a
                href="/login"
                className="inline-flex items-center gap-2 mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
              >
                See It Live →
              </a>
            </div>

            {/* RIGHT IMAGE */}

            <div>
              <img
                src="/screenshot/ranking.jpeg"
                className="rounded-2xl shadow-2xl border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}

      <section id="how" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* BADGE */}

          <div className="flex justify-center items-center gap-3 text-xs tracking-widest text-blue-600 mb-6">
            <span className="w-8 h-0.5 bg-blue-600"></span>
            HOW IT WORKS
          </div>

          {/* TITLE */}

          <h2 className="text-4xl md:text-5xl font-semibold">
            Up and Running in Three Steps
          </h2>

          <p className="text-neutral-500 mt-4 max-w-xl mx-auto">
            No training required. Built for busy consultants — results from day
            one.
          </p>

          {/* STEPS */}

          <div className="mt-16 border rounded-2xl grid grid-cols-1 md:grid-cols-3 md:divide-x overflow-hidden text-left">
            {/* STEP 1 */}

            <div className="p-10 relative">
              <div className="w-10 h-10 rounded-full border flex items-center justify-center text-blue-600 text-sm font-medium mb-6">
                01
              </div>

              <h3 className="font-semibold text-lg mb-3">Create a Job</h3>

              <p className="text-sm text-neutral-600">
                Paste your job description. Veritik's AI generates a precise
                evaluation rubric automatically — tailored to your exact role,
                seniority, and requirements.
              </p>

              <span className="absolute bottom-4 right-6 text-[120px] font-bold text-neutral-200 opacity-40 -z-10 select-none">
                01
              </span>
            </div>

            {/* STEP 2 */}

            <div className="p-10 relative">
              <div className="w-10 h-10 rounded-full border flex items-center justify-center text-blue-600 text-sm font-medium mb-6">
                02
              </div>

              <h3 className="font-semibold text-lg mb-3">Upload Resumes</h3>

              <p className="text-sm text-neutral-600">
                Drop in any number of CVs in PDF or DOCX. Veritik extracts,
                parses, and scores every resume within seconds — at any volume,
                any format.
              </p>

              <span className="absolute bottom-4 right-6 text-[120px] font-bold text-neutral-200 opacity-40 -z-10 select-none">
                02
              </span>
            </div>

            {/* STEP 3 */}

            <div className="p-10 relative">
              <div className="w-10 h-10 rounded-full border flex items-center justify-center text-blue-600 text-sm font-medium mb-6">
                03
              </div>

              <h3 className="font-semibold text-lg mb-3">Hire the Best</h3>

              <p className="text-sm text-neutral-600">
                Review your AI-ranked list, compare finalists with AI-backed
                insights, and contact candidates — all from a single unified
                workspace.
              </p>

              <span className="absolute bottom-4 right-6 text-[120px] font-bold text-neutral-200 opacity-40 -z-10 select-none">
                03
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* WHY VERITIK */}

      <section id="why" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* BADGE */}

          <div className="flex items-center gap-3 text-xs tracking-widest text-blue-600 mb-6">
            <span className="w-8 h-0.5 bg-blue-600"></span>
            WHY VERITIK
          </div>

          {/* TITLE */}

          <h2 className="text-4xl md:text-5xl font-semibold">
            A Smarter Way to Hire
          </h2>

          <p className="text-neutral-500 mt-4 max-w-xl">
            How Veritik changes the game for outsourcing and headhunting teams.
          </p>

          {/* TABLE */}

          <div className="mt-12 border rounded-2xl overflow-hidden shadow-md overflow-x-auto">
            <table className="w-full text-sm table-fixed">
              <thead className="bg-neutral-50 text-neutral-400 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-6 py-4 text-left w-[40%]">Workflow Task</th>

                  <th className="px-6 py-4 text-left w-[30%]">
                    Manual Process
                  </th>

                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-blue-600">
                      <span className="text-sm">✦</span>

                      <span className="font-medium tracking-wide">
                        WITH VERITIK
                      </span>

                      <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full">
                        AI
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                <tr className="hover:bg-neutral-50">
                  <td className="px-6 py-4 font-medium">Screen 50 resumes</td>

                  <td className="px-6 py-4 text-neutral-500">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-neutral-200 flex items-center justify-center text-xs text-neutral-500">
                        ✕
                      </span>
                      4–6 hours
                    </div>
                  </td>

                  <td className="px-6 py-4 text-emerald-600">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-xs text-emerald-600">
                        ✓
                      </span>
                      Under 60 seconds
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 font-medium">
                    Consistent evaluation criteria
                  </td>

                  <td className="px-6 py-4 text-neutral-500">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-neutral-200 flex items-center justify-center text-xs">
                        ✕
                      </span>
                      Varies by reviewer
                    </div>
                  </td>

                  <td className="px-6 py-4 text-emerald-600">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-xs">
                        ✓
                      </span>
                      Always objective
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 font-medium">
                    Objective candidate ranking
                  </td>

                  <td className="px-6 py-4 text-neutral-500">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-neutral-200 flex items-center justify-center text-xs">
                        ✕
                      </span>
                      Manual sorting
                    </div>
                  </td>

                  <td className="px-6 py-4 text-emerald-600">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-xs">
                        ✓
                      </span>
                      AI-scored & ranked
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 font-medium">
                    Side-by-side finalist comparison
                  </td>

                  <td className="px-6 py-4 text-neutral-500">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-neutral-200 flex items-center justify-center text-xs">
                        ✕
                      </span>
                      Spreadsheet work
                    </div>
                  </td>

                  <td className="px-6 py-4 text-emerald-600">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-xs">
                        ✓
                      </span>
                      One-click AI view
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 font-medium">
                    AI-backed placement rationale
                  </td>

                  <td className="px-6 py-4 text-neutral-500">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-neutral-200 flex items-center justify-center text-xs">
                        ✕
                      </span>
                      Consultant judgment
                    </div>
                  </td>

                  <td className="px-6 py-4 text-emerald-600">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-xs">
                        ✓
                      </span>
                      Data-driven insights
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 font-medium">
                    Reach out to candidates in-platform
                  </td>

                  <td className="px-6 py-4 text-neutral-500">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-neutral-200 flex items-center justify-center text-xs">
                        ✕
                      </span>
                      Tool switching
                    </div>
                  </td>

                  <td className="px-6 py-4 text-emerald-600">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-xs">
                        ✓
                      </span>
                      Built-in outreach
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FULL FEATURE SET */}

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* BADGE */}

          <div className="flex items-center gap-3 text-xs tracking-widest text-blue-600 mb-6">
            <span className="w-8 h-0.5 bg-blue-600"></span>
            FULL FEATURE SET
          </div>

          {/* TITLE */}

          <h2 className="text-4xl md:text-5xl font-semibold mb-16">
            Complete Hiring Toolkit
          </h2>

          {/* FEATURE GRID */}

          <div className="rounded-2xl border border-neutral-200 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-neutral-200">
              {/* COLUMN 1 */}

              <div className="divide-y divide-neutral-200">
                <div className="p-10">
                  <div className="w-12 h-12 rounded-xl border border-neutral-200 bg-neutral-50 flex items-center justify-center mb-6 text-xl">
                    📄
                  </div>

                  <h3 className="font-semibold mb-2">Resume Parsing</h3>

                  <p className="text-sm text-neutral-500 leading-relaxed">
                    Automatically extract structured data from any resume — PDF,
                    DOCX, and more. No specific formatting required from
                    candidates.
                  </p>
                </div>

                <div className="p-10">
                  <div className="w-12 h-12 rounded-xl border border-neutral-200 bg-neutral-50 flex items-center justify-center mb-6 text-xl">
                    ⚡
                  </div>

                  <h3 className="font-semibold mb-2">Candidate Comparison</h3>

                  <p className="text-sm text-neutral-500 leading-relaxed">
                    AI-powered side-by-side comparison built for presenting
                    shortlists to clients confidently and credibly.
                  </p>
                </div>
              </div>

              {/* COLUMN 2 */}

              <div className="divide-y divide-neutral-200">
                <div className="p-10">
                  <div className="w-12 h-12 rounded-xl border border-neutral-200 bg-neutral-50 flex items-center justify-center mb-6 text-xl">
                    🤖
                  </div>

                  <h3 className="font-semibold mb-2">AI Candidate Scoring</h3>

                  <p className="text-sm text-neutral-500 leading-relaxed">
                    Each candidate is evaluated against your exact job
                    requirements using configurable advanced AI models with
                    transparent scoring.
                  </p>
                </div>

                <div className="p-10">
                  <div className="w-12 h-12 rounded-xl border border-neutral-200 bg-neutral-50 flex items-center justify-center mb-6 text-xl">
                    ✉️
                  </div>

                  <h3 className="font-semibold mb-2">Candidate Outreach</h3>

                  <p className="text-sm text-neutral-500 leading-relaxed">
                    Reach top candidates directly from the ranked list — no tool
                    switching, no copy pasting, no wasted time.
                  </p>
                </div>
              </div>

              {/* COLUMN 3 */}

              <div className="divide-y divide-neutral-200">
                <div className="p-10">
                  <div className="w-12 h-12 rounded-xl border border-neutral-200 bg-neutral-50 flex items-center justify-center mb-6 text-xl">
                    🏆
                  </div>

                  <h3 className="font-semibold mb-2">Ranked Candidate List</h3>

                  <p className="text-sm text-neutral-500 leading-relaxed">
                    See who fits best immediately — ordered by match score with
                    a clear dimension breakdown for each candidate.
                  </p>
                </div>

                <div className="p-10">
                  <div className="w-12 h-12 rounded-xl border border-neutral-200 bg-neutral-50 flex items-center justify-center mb-6 text-xl">
                    💡
                  </div>

                  <h3 className="font-semibold mb-2">AI Candidate Insights</h3>

                  <p className="text-sm text-neutral-500 leading-relaxed">
                    Full explainability for every ranking decision — equip your
                    team to brief clients with data backed rationale.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}

      <section id="faq" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[420px_1fr] gap-16 md:gap-32 items-start">
          {/* LEFT SIDE */}

          <div>
            <div className="flex items-center gap-3 text-xs tracking-widest text-blue-600 mb-6">
              <span className="w-8 h-0.5 bg-blue-600"></span>
              FAQ
            </div>

            <h2 className="text-5xl font-semibold leading-tight mb-6">
              Common
              <br />
              Questions
            </h2>

            <p className="text-neutral-500 max-w-sm mb-8">
              Still unsure? Our team can walk you through a live demo tailored
              to your firm's exact workflow.
            </p>

            <a
              href="/demo"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-sm hover:bg-blue-700 transition"
            >
              Book a Demo →
            </a>
          </div>

          {/* RIGHT SIDE */}

          <div className="divide-y">
            {faqs.map((faq, i) => (
              <div key={i} className="py-6">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="font-medium text-lg">{faq.question}</span>

                  <div className="w-8 h-8 rounded-full border flex items-center justify-center text-neutral-500">
                    {openIndex === i ? "−" : "+"}
                  </div>
                </button>

                {openIndex === i && (
                  <p className="mt-4 text-neutral-500 text-sm max-w-xl">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="text-white py-32 bg-[radial-gradient(circle_at_30%_40%,#1f3a8a,transparent_40%),linear-gradient(90deg,#07142f,#020617)]">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-125 h-125 bg-blue-500/20 blur-[150px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          {/* LEFT */}

          <div>
            <div className="flex items-center gap-3 text-xs tracking-widest text-blue-500 mb-6">
              <span className="w-8 h-0.5 bg-blue-500"></span>
              GET STARTED TODAY
            </div>

            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Upgrade Your <br />
              Recruitment <br />
              <span className="text-blue-500">Process</span>
            </h2>

            <p className="text-neutral-400 max-w-md">
              See how Veritik helps outsourcing and headhunting firms place
              better candidates faster — with AI doing the heavy lifting on
              every screening.
            </p>
          </div>

          {/* RIGHT CARD */}

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <h3 className="text-2xl font-semibold mb-3">
              Start With a Free Demo
            </h3>

            <p className="text-neutral-400 text-sm mb-8">
              No credit card required. Screen your first batch of candidates in
              under 5 minutes and see the difference immediately.
            </p>

            <a
              href="/login"
              className="block w-full text-center bg-linear-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 transition rounded-lg py-4 font-medium mb-6"
            >
              Try Demo Free →
            </a>

            <div className="text-xs text-neutral-500 text-center">
              Free access • No setup • Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="bg-[#020617] border-t border-white/10 text-neutral-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
          <span className="font-semibold text-neutral-300">Veritik</span>

          <span>
            © {new Date().getFullYear()} Veritik. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
