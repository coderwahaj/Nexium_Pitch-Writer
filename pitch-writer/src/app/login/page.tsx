'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Mail, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: `${location.origin}/dashboard`,
        }
    })
    setLoading(false)

    if (error) {
      toast.error('Authentication Error: ' + error.message)
    } else {
      toast.success('Access Link Transmitted 🚀', {
        description: 'Check your inbox for the secure magic link.',
      })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="w-full max-w-md p-8 glass-container">
        <h1 className="text-4xl font-bold text-center font-orbitron mb-2">Secure Access</h1>
        <p className="text-center text-gray-400 mb-8">Enter your email for a magic link.</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-glass h-12 pl-10 text-base"
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full h-12 button-gradient">
            {loading ? <Loader2 className="animate-spin" /> : 'Send Magic Link'}
          </Button>
        </form>
      </div>
    </div>
  )
}