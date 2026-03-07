"use client"

import { useState } from "react"

export default function LandingPage() {

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "How does Veritik analyze resumes?",
      answer:
        "Veritik uses AI to analyze resumes based on the job description you provide. The system evaluates candidate skills, experience, and education to generate a match score."
    },
    {
      question: "Can I compare candidates side-by-side?",
      answer:
        "Yes. Veritik allows recruiters to select multiple candidates and instantly compare them using AI insights, skills analysis and experience summaries."
    },
    {
      question: "Can I contact candidates directly?",
      answer:
        "Yes. Recruiters can reach out to candidates directly from the ranked list, helping speed up the hiring process without switching tools."
    },
    {
      question: "What file formats does Veritik support?",
      answer:
        "Currently Veritik supports PDF resumes. You can upload multiple CVs and the system will analyze them automatically."
    },
    {
      question: "Is candidate data secure?",
      answer:
        "Yes. Veritik processes resumes securely and does not share candidate data with third parties."
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur border-b border-neutral-900 bg-black/60">

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2 font-semibold text-lg">

        <img
          src="/logo/logo-veritik.jpeg"
          alt="Veritik"
className="w-10 h-10"
        />

        Veritik

        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-400">

        <a href="#features" className="hover:text-white transition">
          Features
        </a>

        <a href="#ranking" className="hover:text-white transition">
          Demo
        </a>

        <a href="#faq" className="hover:text-white transition">
          FAQ
        </a>

        <a href="/login" className="hover:text-white transition">
          Login
        </a>

        </nav>

        

        {/* CTA */}
        <a
          href="/login"
          className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-200 transition"
        >
          Try Demo
        </a>

      </div>

      </header>

      {/* Background glow */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[800px] md:w-[1000px] h-[400px] md:h-[500px] bg-purple-600/20 blur-[140px] rounded-full mt-20"></div>
      </div>

      {/* HERO */}
        <section className="relative max-w-6xl mx-auto px-6 pt-32 md:pt-44 pb-20 md:pb-40 text-center">

        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <div className="px-4 py-1 rounded-full border border-neutral-800 text-sm text-neutral-400 bg-neutral-900">
          AI Candidate Ranking & Comparison
          </div>
        </div>

        <h1 className="font-bold leading-tight tracking-tight">

          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Veritik AI Resume Screening
          </span>

          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-neutral-400 mt-3">
          Rank, Compare, and Hire the Best Candidates Faster
          </span>

        </h1>

        <p className="mt-6 md:mt-8 text-base md:text-lg text-neutral-400 max-w-xl md:max-w-2xl mx-auto leading-relaxed">
        Upload resumes and let Veritik instantly analyze, rank,
        compare top candidates, and help you reach out to the best ones faster.
        </p>

        <div className="mt-8 md:mt-12 flex justify-center gap-4 flex-wrap">

          <a
            href="/login"
            className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-neutral-200 transition"
          >
            Try Demo
          </a>

          <a
            href="#features"
            className="border border-neutral-700 px-6 md:px-8 py-3 md:py-4 rounded-xl hover:border-white transition"
          >
            See Features
          </a>

        </div>

        </section>

      {/* TRUST SECTION */}

      <section className="py-12 md:py-20 border-y border-neutral-900 bg-neutral-950">

      <div className="max-w-5xl mx-auto px-6 text-center">

        <p className="text-neutral-500 text-sm uppercase tracking-widest">
          Built for modern hiring teams
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 text-neutral-300">

          <div>
            <div className="text-lg font-semibold">
              ⚡ Screen Hundreds of Resumes
            </div>
            <p className="text-neutral-500 text-sm mt-2">
              Upload multiple CVs and let Veritik analyze and rank candidates instantly.
            </p>
          </div>

          <div>
            <div className="text-lg font-semibold">
              🔍 Compare Top Candidates
            </div>
            <p className="text-neutral-500 text-sm mt-2">
              Instantly compare the strongest applicants side-by-side with AI insights.
            </p>
          </div>

          <div>
            <div className="text-lg font-semibold">
              ✉️ Contact Candidates Faster
            </div>
            <p className="text-neutral-500 text-sm mt-2">
              Reach out to candidates directly from the ranked list without switching tools.
            </p>
          </div>

        </div>

      </div>

      </section>

    {/* PROBLEM */}

    <section className="py-20 md:py-32">

    <div className="max-w-5xl mx-auto px-6 text-center">

      <h2 className="text-2xl md:text-4xl font-semibold">
        Hiring Shouldn’t Take Hours
      </h2>

      <p className="text-neutral-400 mt-4 max-w-xl mx-auto">
        Recruiters often review hundreds of resumes manually.
        Important candidates get missed and hiring becomes slow.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">

        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
          <h3 className="font-semibold">Manual Resume Screening</h3>
          <p className="text-neutral-400 text-sm mt-2">
            Recruiters spend hours reading CVs one by one.
          </p>
        </div>

        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
          <h3 className="font-semibold">Inconsistent Evaluation</h3>
          <p className="text-neutral-400 text-sm mt-2">
            Candidates are evaluated differently by each reviewer.
          </p>
        </div>

        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
          <h3 className="font-semibold">Top Talent Gets Missed</h3>
          <p className="text-neutral-400 text-sm mt-2">
            Great candidates can be overlooked during screening.
          </p>
        </div>

      </div>

    </div>

    </section>


      {/* SCREENSHOT 1 */}
      <section id="ranking" className="max-w-7xl mx-auto px-4 md:px-6 pb-20 md:pb-40">

        <h2 className="text-2xl md:text-4xl font-semibold text-center mb-8 md:mb-16">
        Instantly Rank Candidates Based on Job Requirements
        </h2>

        <div className="relative">

          <div className="absolute inset-0 bg-purple-500/10 blur-3xl"></div>

          <img
            src="/screenshot/ranking.jpeg"
            alt="AI candidate ranking"
            className="relative rounded-xl md:rounded-2xl w-full border border-neutral-800 shadow-2xl"
          />

        </div>

      </section>

      {/* SCREENSHOT COMPARE */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-40">

      <h2 className="text-2xl md:text-4xl font-semibold text-center mb-8 md:mb-16">
        Compare Top Candidates Instantly
      </h2>

      <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-12">
        Select multiple candidates and let Veritik generate AI insights
        to compare skills, experience and strengths side-by-side.
      </p>

      <div className="relative">

        <div className="absolute inset-0 bg-purple-500/10 blur-3xl"></div>

        <img
          src="/screenshot/compare.jpeg"
          alt="Compare candidates"
          className="relative rounded-xl md:rounded-2xl w-full border border-neutral-800 shadow-2xl"
        />

      </div>

      </section>


      {/* HOW IT WORKS */}
      <section className="bg-neutral-950 py-20 md:py-40">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-2xl md:text-4xl font-semibold">
            How Veritik Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mt-12 md:mt-20">

            <div className="bg-neutral-900 p-6 md:p-8 rounded-xl border border-neutral-800 hover:border-white hover:translate-y-[-2px] transition">
              <h3 className="text-lg md:text-xl font-semibold">
                Upload CVs
              </h3>

              <p className="text-neutral-400 mt-3 md:mt-4 text-sm md:text-base">
                Drag and drop multiple candidate resumes for a job position.
              </p>
            </div>

            <div className="bg-neutral-900 p-6 md:p-8 rounded-xl border border-neutral-800 hover:border-white hover:translate-y-[-2px] transition">
              <h3 className="text-lg md:text-xl font-semibold">
                AI Analysis
              </h3>

              <p className="text-neutral-400 mt-3 md:mt-4 text-sm md:text-base">
                AI extracts skills, experience and education from each resume.
              </p>
            </div>

            <div className="bg-neutral-900 p-6 md:p-8 rounded-xl border border-neutral-800 hover:border-white hover:translate-y-[-2px] transition">
              <h3 className="text-lg md:text-xl font-semibold">
                Candidate Ranking
              </h3>

              <p className="text-neutral-400 mt-3 md:mt-4 text-sm md:text-base">
                Instantly see ranked candidates with match scores.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* BEFORE AFTER */}

      <section className="bg-neutral-950 py-20 md:py-32">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-2xl md:text-4xl font-semibold text-center">
          From Manual Screening to AI Hiring
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">

          <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-800">
            <h3 className="text-lg font-semibold text-red-400">
              Without Veritik
            </h3>

            <ul className="mt-4 text-neutral-400 space-y-2 text-sm">
              <li>• Manually reading hundreds of CVs</li>
              <li>• Time-consuming candidate comparison</li>
              <li>• Hard to identify the best applicants</li>
            </ul>
          </div>

          <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-800">
            <h3 className="text-lg font-semibold text-green-400">
              With Veritik AI
            </h3>

            <ul className="mt-4 text-neutral-400 space-y-2 text-sm">
              <li>• Upload resumes once</li>
              <li>• AI automatically scores candidates</li>
              <li>• Instantly see ranked top applicants</li>
            </ul>
          </div>

        </div>

      </div>

      </section>


      {/* SCREENSHOT 2 */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-40">

        <h2 className="text-2xl md:text-4xl font-semibold text-center mb-8 md:mb-16">
        Generate Hiring Rubrics with Veritik AI
        </h2>

        <div className="relative">

          <div className="absolute inset-0 bg-purple-500/10 blur-3xl"></div>

          <img
            src="/screenshot/create-job.jpeg"
            alt="Create job"
            className="relative rounded-xl md:rounded-2xl w-full border border-neutral-800 shadow-2xl"
          />

        </div>

      </section>


      {/* SCREENSHOT 3 */}
      <section className="bg-neutral-950 py-20 md:py-40">

        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">

          <h2 className="text-2xl md:text-4xl font-semibold mb-8 md:mb-16">
          Veritik AI Candidate Insights
          </h2>

          <div className="relative">

            <div className="absolute inset-0 bg-purple-500/10 blur-3xl"></div>

            <img
              src="/screenshot/ai-insight.jpeg"
              alt="AI insight"
              className="relative rounded-xl md:rounded-2xl w-full border border-neutral-800 shadow-2xl"
            />

          </div>

        </div>

      </section>


      {/* FEATURES */}
      <section id="features" className="py-20 md:py-40">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-2xl md:text-4xl font-semibold">
            Powerful AI Hiring Assistant
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 mt-12 md:mt-20 text-left">

            <div className="bg-neutral-900 p-6 md:p-8 rounded-xl border border-neutral-800 hover:border-white hover:translate-y-[-2px] transition">
              <h3 className="text-lg md:text-xl font-semibold">
                Resume Parsing
              </h3>
              <p className="text-neutral-400 mt-3 text-sm md:text-base">
                Automatically extract candidate information from resumes.
              </p>
            </div>

            <div className="bg-neutral-900 p-6 md:p-8 rounded-xl border border-neutral-800 hover:border-white hover:translate-y-[-2px] transition">
              <h3 className="text-lg md:text-xl font-semibold">
                AI Candidate Scoring
              </h3>
              <p className="text-neutral-400 mt-3 text-sm md:text-base">
                Evaluate candidates based on job requirements using AI.
              </p>
            </div>

            <div className="bg-neutral-900 p-6 md:p-8 rounded-xl border border-neutral-800 hover:border-white hover:translate-y-[-2px] transition">
              <h3 className="text-lg md:text-xl font-semibold">
                Candidate Ranking
              </h3>
              <p className="text-neutral-400 mt-3 text-sm md:text-base">
                Instantly see the best candidates ranked by match score.
              </p>
            </div>

            <div className="bg-neutral-900 p-6 md:p-8 rounded-xl border border-neutral-800 hover:border-white hover:translate-y-[-2px] transition">
              <h3 className="text-lg md:text-xl font-semibold">
                Compare Candidates
              </h3>
              <p className="text-neutral-400 mt-3 text-sm md:text-base">
                Compare top candidates side-by-side with AI insights and scoring.
              </p>
            </div>

            <div className="bg-neutral-900 p-6 md:p-8 rounded-xl border border-neutral-800 hover:border-white hover:translate-y-[-2px] transition">
              <h3 className="text-lg md:text-xl font-semibold">
                Contact Candidates
              </h3>
              <p className="text-neutral-400 mt-3 text-sm md:text-base">
                Reach out to candidates directly from the ranked list.
              </p>
            </div>

            <div className="bg-neutral-900 p-6 md:p-8 rounded-xl border border-neutral-800 hover:border-white hover:translate-y-[-2px] transition">
              <h3 className="text-lg md:text-xl font-semibold">
                AI Candidate Insights
              </h3>
              <p className="text-neutral-400 mt-3 text-sm md:text-base">
                Understand why candidates are ranked by Veritik AI.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* DEMO FLOW */}

      <section className="py-20 md:py-32">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-2xl md:text-4xl font-semibold">
          How Recruiters Use Veritik
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">

          <div>
            <div className="text-3xl font-bold text-purple-400">
              1
            </div>
            <p className="mt-4 text-neutral-400 text-sm">
              Create a job and paste the job description.
            </p>
          </div>

          <div>
            <div className="text-3xl font-bold text-purple-400">
              2
            </div>
            <p className="mt-4 text-neutral-400 text-sm">
              Upload candidate resumes for analysis.
            </p>
          </div>

          <div>
            <div className="text-3xl font-bold text-purple-400">
              3
            </div>
            <p className="mt-4 text-neutral-400 text-sm">
              Instantly see ranked candidates and compare top applicants with AI insights.
            </p>
          </div>

        </div>

      </div>

      </section>

      {/* FAQ */}
      <section id="faq" className="bg-neutral-950 py-20 md:py-40">

      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-2xl md:text-4xl font-semibold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="bg-neutral-900 border border-neutral-800 rounded-xl"
            >

              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center p-6 text-left"
              >

                <span className="font-medium">
                  {faq.question}
                </span>

                <span className="text-xl text-neutral-400">
                  {openIndex === index ? "−" : "+"}
                </span>

              </button>

              {openIndex === index && (

                <div className="px-6 pb-6 text-neutral-400 text-sm leading-relaxed">
                  {faq.answer}
                </div>

              )}

            </div>

          ))}

        </div>

      </div>

      </section>


      {/* CTA */}
      <section className="py-20 md:py-40 text-center border-t border-neutral-900">

        <h2 className="text-2xl md:text-4xl font-semibold">
        Find the Best Candidate Faster with Veritik
        </h2>

        <p className="text-neutral-400 mt-4 text-sm md:text-base">
        Try the demo and see how Veritik ranks, compares,
        and helps you identify the best candidates instantly.
        </p>

        <a
          href="/login"
          className="inline-block mt-8 md:mt-10 bg-white text-black px-6 md:px-10 py-3 md:py-4 rounded-xl font-semibold hover:bg-neutral-200 transition"
        >
          Try Demo
        </a>

      </section>


      {/* FOOTER */}
      <footer className="py-10 md:py-12 text-center text-neutral-500 border-t border-neutral-900">

        © {new Date().getFullYear()} Veritik

      </footer>

    </div>
  )
}