'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

export default function DashboardPage() {
  const [formData, setFormData] = useState({
    pitchType: '',
    productName: '',
    problem: '',
    audience: '',
    features: '',
    goal: ''
  })

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted:', formData)
    // You'll send this to n8n/AI later
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">🎯 Generate Your Pitch</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Pitch Type</label>
          <Select onValueChange={(value) => handleChange('pitchType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a pitch type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="startup">Startup Pitch</SelectItem>
              <SelectItem value="product">Product Pitch</SelectItem>
              <SelectItem value="job">Job Interview Pitch</SelectItem>
              <SelectItem value="investor">Investor Pitch</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Input
          placeholder="Product / Idea Name"
          onChange={(e) => handleChange('productName', e.target.value)}
        />

        <Textarea
          placeholder="What's the core problem you're solving?"
          onChange={(e) => handleChange('problem', e.target.value)}
        />

        <Textarea
          placeholder="Describe your target audience"
          onChange={(e) => handleChange('audience', e.target.value)}
        />

        <Textarea
          placeholder="List key features or unique points"
          onChange={(e) => handleChange('features', e.target.value)}
        />

        <Textarea
          placeholder="What is your goal with this pitch?"
          onChange={(e) => handleChange('goal', e.target.value)}
        />

        <Button type="submit" className="w-full">Generate Pitch</Button>
      </form>
    </div>
  )
}
