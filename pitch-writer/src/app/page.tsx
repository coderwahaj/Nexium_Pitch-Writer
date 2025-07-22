'use client'

import type { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (user) {
        setUser(user)
        // Redirect authenticated user to dashboard
        router.push('/dashboard')
      } else {
        // If not logged in, redirect to login
        router.push('/login')
      }

      setLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return <div className="p-4">Loading...</div>

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Redirecting...</h1>
    </main>
  )
}
