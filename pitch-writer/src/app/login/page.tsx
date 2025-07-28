"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Sidebar from "@/components/ui/Sidebar";
import { Mail, Loader2 } from "lucide-react";
import { Brain, Zap, Lightbulb, Wand2 } from "lucide-react";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/dashboard`,
      },
    });
    setLoading(false);

    if (error) {
      toast.error("Authentication Error: " + error.message);
    } else {
      toast.success("Access Link Transmitted 🚀", {
        description: "Check your inbox for the secure magic link.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="w-full max-w-md p-8 glass-container">
        <div>
          <Sidebar />
        </div>
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

        <h1 className="text-4xl font-bold text-center font-orbitron mb-2">
          Secure Access
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Enter your email for a magic link.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
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

          <Button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-4 w-full h-12 button-gradient shadow-md hover:scale-105 transition-transform"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Sending Magic Link
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Send Magic Link
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
