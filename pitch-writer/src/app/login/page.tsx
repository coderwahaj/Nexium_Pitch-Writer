'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })
    setLoading(false)

    if (error) {
      toast.error('Failed to send magic link: ' + error.message)
    } else {
      toast.success('Magic link sent to your email 📩')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">Sign in with Magic Link</h1>

        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />

        <Button onClick={handleLogin} disabled={loading} className="w-full">
          {loading ? 'Sending...' : 'Send Magic Link'}
        </Button>
      </div>
    </div>
  )
}
