# Veritik

**Veritik** is an AI-powered resume screening platform that helps recruiters analyze, rank, and compare candidates automatically based on job requirements.

Instead of manually reviewing hundreds of resumes, Veritik extracts information from CVs and evaluates candidate-job fit using AI, enabling hiring teams to identify the best candidates faster.

Live Demo
https://veritik-demo.vercel.app/

---

# Problem

Recruiters spend a significant amount of time manually reviewing resumes.

Common challenges include:

* Reviewing hundreds of CVs for a single job opening
* Identifying relevant skills and experience quickly
* Comparing candidates objectively
* Preparing interview questions efficiently

Manual resume screening slows down the hiring process and increases the risk of missing strong candidates.

---

# Solution

Veritik automates the resume screening workflow using AI.

The platform analyzes candidate CVs, evaluates them against job requirements, and produces structured insights that help recruiters make faster and better hiring decisions.

Key capabilities include:

* Automated resume parsing
* AI-based candidate scoring
* Candidate ranking and comparison
* AI-generated interview questions
* Hiring insights and analytics

---

# Core Features

### AI Resume Parsing

Extract candidate information automatically from uploaded resumes.

### Candidate Scoring

Evaluate candidates using multiple dimensions:

* Skills match
* Experience relevance
* Education alignment

### AI Candidate Ranking

Candidates are ranked automatically based on their overall fit score.

### Candidate Comparison

Compare multiple candidates side-by-side to identify the strongest applicants.

### AI Interview Questions

Generate tailored interview questions based on the candidate's experience and background.

### Hiring Insights

Provide aggregated insights such as:

* Average candidate score
* Recommended candidates
* Overall candidate distribution

### Export Candidate Data

Export candidate rankings and results for internal hiring reports.

---

# Tech Stack

Frontend

* Next.js (App Router)
* React
* Tailwind CSS

Backend

* Next.js API Routes

Database

* Supabase (PostgreSQL)

AI

* OpenAI API

Deployment

* Vercel

---

# Getting Started

Clone the repository

```bash id="k1ev34"
git clone https://github.com/your-username/veritik.git
cd veritik
```

Install dependencies

```bash id="y52r9u"
npm install
```

Run the development server

```bash id="l1z5to"
npm run dev
```

Open the application

http://localhost:3000

---

# Environment Variables

Create a `.env.local` file

```env id="h67z3r"
OPENAI_API_KEY=your_openai_key

SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

# Architecture Overview

The application follows a modern full-stack architecture:

Frontend
Next.js App Router handles UI, routing, and client-side interactions.

Backend
Next.js API routes process resume uploads, AI scoring, and interview question generation.

Database
Supabase stores jobs, candidates, and scoring results.

AI Layer
OpenAI is used for resume analysis, candidate insights, and interview question generation.

Deployment
The application is deployed on Vercel for scalable serverless infrastructure.

---

# Roadmap

Planned improvements include:

* Skill match highlighting
* Advanced candidate comparison
* Hiring pipeline workflow
* Team collaboration features
* AI hiring insights dashboard
* Candidate profile extraction
* Resume keyword highlighting

---

# License

MIT License

Copyright (c) 2026 Aries Pujie Prasetio