'use client'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Page() {
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('pitches').select('*')
      console.log("Data:", data)
      console.log("Error:", error)
    }
    fetchData()
  }, [])

  return <div>Check console for pitch data</div>
}
