"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {

  const router = useRouter()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(false)

  const handleLogin = async (e:any) => {

    e.preventDefault()

    setError("")
    setLoading(true)

    try {

      const res = await fetch("/api/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      if(!res.ok){
        setError("Email atau password salah")
        setLoading(false)
        return
      }

      router.push("/dashboard")

    } catch (err) {

      setError("Something went wrong")

    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[700px] md:w-[900px] h-[350px] md:h-[450px] bg-purple-600/20 blur-[140px] rounded-full mt-20"></div>
      </div>

      {/* Login Card */}
      <form
        onSubmit={handleLogin}
        className="relative bg-neutral-900/80 backdrop-blur border border-neutral-800 p-8 md:p-10 rounded-2xl w-full max-w-sm mx-6"
      >

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-lg font-semibold tracking-tight">
            Veritik
          </div>

          <h1 className="text-2xl font-semibold mt-3">
            Login to Veritik
          </h1>

          <p className="text-neutral-400 text-sm mt-2">
            Access the AI resume screening dashboard
          </p>
        </div>

        {/* Email */}
        <input
          placeholder="Email address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          disabled={loading}
          className="w-full p-3 mb-4 bg-neutral-800 border border-neutral-700 rounded-lg outline-none focus:border-purple-500 transition disabled:opacity-50"
        />

        {/* Password */}
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          disabled={loading}
          className="w-full p-3 mb-2 bg-neutral-800 border border-neutral-700 rounded-lg outline-none focus:border-purple-500 transition disabled:opacity-50"
        />

        {/* Error message */}
        {error && (
          <p className="text-red-400 text-sm mb-4">
            {error}
          </p>
        )}

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-neutral-200 transition flex items-center justify-center gap-2 disabled:opacity-70"
        >

          {loading && (
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          )}

          {loading ? "Signing in..." : "Login"}

        </button>

        {/* Demo hint */}
        <p className="text-neutral-500 text-xs text-center mt-6">
          Demo access available for recruiters
        </p>

      </form>

    </div>
  )
}