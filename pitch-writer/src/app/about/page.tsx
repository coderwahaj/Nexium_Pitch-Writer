'use client'

import { Rocket, Users, ThumbsUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import Sidebar from '@/components/ui/Sidebar'
import { Globe, BookOpen, Languages, Database, Check, AlertCircle, ExternalLink, Sparkles, Brain, Zap, ArrowRight, FileText, Lightbulb, Wand2, RotateCw } from 'lucide-react'
function FloatingParticles() {
  const [particles, setParticles] = useState<
    { left: string; top: string; animationDelay: string; animationDuration: string }[]
  >([])

  useEffect(() => {
    const generatedParticles = [...Array(12)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${3 + Math.random() * 2}s`,
    }))
    setParticles(generatedParticles)
  }, [])

  return (
    <div className="absolute inset-0 -z-5 pointer-events-none">
      {particles.map((style, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-bounce-slow"
          style={style}
        />
      ))}
    </div>
  )
}
function CountUp({ target }: { target: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 2000
    const incrementTime = 20
    const steps = duration / incrementTime
    const increment = target / steps

    const counter = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(counter)
      } else {
        setCount(Math.floor(start))
      }
    }, incrementTime)

    return () => clearInterval(counter)
  }, [target])

  return <span>{count.toLocaleString()}</span>
}


export default function AboutPage() {
  return (
   <div className="min-h-full text-white py-4 px-4">
    <div><Sidebar /></div>
  <div className="max-w-4xl mx-auto p-10 text-center rounded-xl bg-white/0 backdrop-blur-md shadow-xl border border-white/20">
    {/* Floating decorative elements */}
      <div className="absolute inset-0 -z-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-400/8 rounded-full blur-lg animate-bounce-slow"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-blue-300/4 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-32 w-28 h-28 bg-blue-500/6 rounded-full blur-xl animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-8 w-20 h-20 bg-blue-400/7 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute top-1/3 right-8 w-36 h-36 bg-blue-300/5 rounded-full blur-2xl animate-bounce-slow"></div>
        <div className="absolute left-3 top-1/2 w-32 h-32 bg-blue-500/5 rounded-full blur-xl animate-pulse"></div>
         <div className="absolute bottom-16 left-1/4 w-24 h-24 bg-blue-400/8 rounded-full blur-lg animate-bounce-slow"></div>
         <div className="absolute left-3 top-1/2 w-40 h-40 bg-blue-300/4 rounded-full blur-2xl animate-pulse"></div>
         <div className="absolute top-16 left-2/4 w-28 h-28 bg-blue-500/6 rounded-full blur-xl animate-bounce-slow"></div>
         <div className="absolute bottom-1/2 right-8 w-20 h-20 bg-blue-400/7 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute bottom-1/3 left-8 w-36 h-36 bg-blue-300/5 rounded-full blur-2xl animate-bounce-slow"></div>
      
      </div>

      {/* Floating particles */}
      
      <FloatingParticles />
        {/* Top decorative icons */}
        <div className="absolute bottom-16 left-2/4 opacity-30">
          <Brain className="w-8 h-8 text-blue-400 animate-pulse" />
        </div>
        <div className="absolute top-8 right-8 opacity-30">
          <Zap className="w-8 h-8 text-blue-400 animate-bounce-slow" />
        </div>
        <div className="absolute top-16 left-1/4 opacity-20">
          <Lightbulb className="w-6 h-6 text-blue-300 animate-pulse" />
        </div>
        <div className="absolute top-16 right-1/4 opacity-20">
          <Wand2 className="w-6 h-6 text-blue-300 animate-bounce-slow" />
        </div>
        
        <Rocket className="h-16 w-16 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-blue-500 p-3 rounded-full" />
        <h1 className="text-5xl font-bold font-orbitron mb-4">Welcome to PitchPro</h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-12">
          PitchPro is a futuristic AI tool designed to forge your ideas into clean, convincing, and powerful pitches.
          We leverage advanced neural networks to streamline your creative process, transforming raw concepts into polished presentations ready for any audience.
        </p>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <Users className="w-6 h-6 text-purple-400" />, label: 'Users', value: 10000 },
            { icon: <FileText className="w-6 h-6 text-blue-400" />, label: 'Pitches Generated', value: 7500 },
            { icon: <ThumbsUp className="w-6 h-6 text-green-400" />, label: 'Positive Feedback', value: 9800 },
            { icon: <Rocket className="w-6 h-6 text-pink-400" />, label: 'Launches', value: 1200 },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg text-center"
            >
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-white">
                <CountUp target={stat.value} />
              </div>
              <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
