'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Loader2 } from 'lucide-react'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut()
      // Add a small delay for user to see the message before redirect
      setTimeout(() => router.push('/'), 500)
    }
    logout()
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
        <div className='text-center'>
            <Loader2 className="h-12 w-12 animate-spin text-red-500 mx-auto" />
            <p className="mt-4 text-lg font-orbitron tracking-widest text-red-400">DE-AUTHENTICATING...</p>
        </div>
    </div>
  )
}