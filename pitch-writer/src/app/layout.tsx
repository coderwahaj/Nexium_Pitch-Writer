import "./globals.css"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "../providers/AuthProvider"
import Sidebar from '@/components/ui/Sidebar'
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} font-sans antialiased bg-[#0B0C1E] text-white`}>
        <AuthProvider>
          <div className="flex">
            <Sidebar />
            <main className="ml-64 p-6 min-h-screen w-full">{children}</main>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
