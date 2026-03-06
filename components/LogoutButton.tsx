"use client"

import { useRouter } from "next/navigation"

export default function LogoutButton() {

  const router = useRouter()

  const handleLogout = async () => {

    await fetch("/api/logout", {
      method: "POST"
    })

    router.push("/login")
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="border border-neutral-700 px-4 py-2 rounded-lg text-sm hover:bg-neutral-800 transition"
    >
      Logout
    </button>
  )
}