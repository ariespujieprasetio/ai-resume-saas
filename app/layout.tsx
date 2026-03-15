import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Plus_Jakarta_Sans } from "next/font/google"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400","500","600","700","800"],
  variable: "--font-jakarta",
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://veritik-demo.vercel.app"),

  title: "Veritik",
  description:
    "AI Resume Screening Platform that ranks and compares candidates instantly.",

  icons: {
    icon: "/favicon.jpeg",
  },

  openGraph: {
    title: "Veritik AI Hiring Assistant",
    description: "Rank and compare candidates instantly using AI.",
    images: [
      {
        url: "/logo/logo-veritik.png",
        width: 1200,
        height: 630,
        alt: "Veritik AI Hiring Assistant",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Veritik AI Hiring Assistant",
    description: "Rank and compare candidates instantly using AI.",
    images: ["/logo/logo-veritik.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}