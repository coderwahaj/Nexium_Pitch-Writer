"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Wand2, Zap, Brain, Lightbulb } from "lucide-react";
export default function GeneratingPage() {
  const router = useRouter();

  function FloatingParticles() {
    const [particles, setParticles] = useState<
      {
        left: string;
        top: string;
        animationDelay: string;
        animationDuration: string;
      }[]
    >([]);

    useEffect(() => {
      const generatedParticles = [...Array(12)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${3 + Math.random() * 2}s`,
      }));
      setParticles(generatedParticles);
    }, []);

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
    );
  }
  useEffect(() => {
    const generatePitch = async () => {
      const rawFormData = localStorage.getItem("formData"); // get from localStorage
      if (!rawFormData) return router.push("/generating");

      try {
        const res = await fetch(process.env.NEXT_PUBLIC_PITCH_API_URL!, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: rawFormData,
        });

        const data = await res.json();
        const pitch = data.choices?.[0]?.message?.content;

        if (!pitch) {
          return router.push("/error"); // handle this as you like
        }

        // Send pitch and formData to result page
        router.push(
          `/result?pitch=${encodeURIComponent(
            pitch
          )}&formData=${encodeURIComponent(rawFormData)}`
        );
      } catch (err) {
        console.error("Error generating pitch:", err);
        router.push("/error");
      }
    };

    generatePitch();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        {/* Floating decorative elements */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
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
        {/* Decorative Icon Grid */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none z-0">
          <div className="flex items-start justify-start p-4 opacity-30">
            <Brain className="w-8 h-8 text-blue-400 animate-pulse" />
          </div>
          <div className="flex items-start justify-center p-4 opacity-30">
            <Zap className="w-8 h-8 text-blue-400 animate-bounce-slow" />
          </div>
          <div className="flex items-start justify-end p-4 opacity-30">
            <Lightbulb className="w-6 h-6 text-blue-300 animate-pulse" />
          </div>

          <div className="flex items-center justify-start p-4 opacity-20">
            <Wand2 className="w-6 h-6 text-blue-300 animate-bounce-slow" />
          </div>
          <div className="flex items-center justify-center p-4 opacity-20">
            {/* Optionally leave empty or add a center icon */}
          </div>
          <div className="flex items-center justify-end p-4 opacity-30">
            <Zap className="w-8 h-8 text-blue-400 animate-bounce-slow" />
          </div>

          <div className="flex items-end justify-start p-4 opacity-20">
            <Wand2 className="w-6 h-6 text-blue-300 animate-bounce-slow" />
          </div>
          <div className="flex items-end justify-center p-4 opacity-30">
            <Zap className="w-8 h-8 text-blue-400 animate-pulse" />
          </div>
          <div className="flex items-end justify-end p-4 opacity-30">
            <Brain className="w-8 h-8 text-blue-400 animate-bounce-slow" />
          </div>
        </div>

        <Loader2 className="h-12 w-12 animate-spin text-white mx-auto" />
        <p className="mt-4 text-lg font-orbitron tracking-widest text-white/80">
          GENERATING PITCH...
        </p>
      </div>
    </div>
  );
}
