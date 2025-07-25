import { Rocket } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="glass-container p-8 max-w-3xl text-center">
        <Rocket className="h-16 w-16 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-blue-500 p-3 rounded-full" />
        <h1 className="text-5xl font-bold font-orbitron mb-6">Welcome to PitchPro</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          PitchPro is a futuristic AI tool designed to forge your ideas into clean, convincing, and powerful pitches.
          We leverage advanced neural networks to streamline your creative process, transforming raw concepts into polished presentations ready for any audience.
        </p>
      </div>
    </div>
  )
}