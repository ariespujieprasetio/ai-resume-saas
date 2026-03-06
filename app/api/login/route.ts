import { NextResponse } from "next/server"

export async function POST(req: Request) {

  const body = await req.json()

  const { email, password } = body

//   console.log("email dari request:", email)
//   console.log("env email:", process.env.APP_EMAIL)

  if (
    email === process.env.APP_EMAIL &&
    password === process.env.APP_PASSWORD
  ) {

    const response = NextResponse.json({ success: true })

    response.cookies.set("veritik_auth", "true", {
      httpOnly: true,
      path: "/"
    })

    return response
  }

  return NextResponse.json(
    { message: "Invalid credentials" },
    { status: 401 }
  )
}