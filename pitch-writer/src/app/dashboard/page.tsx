"use client";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader2, Sparkles, Wand2, Zap, Brain, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";

const API_URL = process.env.NEXT_PUBLIC_PITCH_API_URL!;

export default function DashboardPage() {
  const [formData, setFormData] = useState({
    pitchType: "",
    productName: "",
    problem: "",
    audience: "",
    features: "",
    goal: "",
  });

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

  const router = useRouter();
  const [isOther, setIsOther] = useState(false);
  const [pitch, setPitch] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handlePitchTypeChange = (val: string) => {
    if (val === "other") {
      setIsOther(true);
      setFormData((prev) => ({ ...prev, pitchType: "" }));
    } else {
      setIsOther(false);
      setFormData((prev) => ({ ...prev, pitchType: val }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ——— 1. Quick front‑end validation ———
    const missing = Object.entries(formData)
      .filter(([_, v]) => typeof v === "string" && !v.trim())
      .map(([k]) => k);
    if (missing.length > 0) {
      toast.error(`Please fill in: ${missing.join(", ")}`);
      return; // stop here: no loading, no redirect
    }

    // ——— 2. All fields are non‑empty, proceed as before ———
    setLoading(true);
    setPitch(null);
    // Navigate to generating page
    router.push("/generating");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || `HTTP Error: ${res.status}`);
      }

      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content)
        throw new Error("Invalid response from AI. No content returned.");

      const generatedPitch = content.trim();
      setPitch(generatedPitch);
      toast.success("Pitch Generated Successfully!");

      // ——— Save to Supabase ———
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError || !session?.user?.email) {
        toast.error("You must be logged in to save your pitch.");
      } else {
        const userEmail = session.user.email;
        const { error: insertError } = await supabase.from("pitches").insert([
          {
            user_email: userEmail,
            pitch_type: formData.pitchType,
            input_data: formData,
            output_pitch: generatedPitch,
          },
        ]);
        if (insertError) {
          console.error("Error saving to Supabase:", insertError);
          toast.error("Pitch generated, but failed to save.");
        }
      }

      // ——— Redirect to results ———
      const fullParams = new URLSearchParams({
        pitch: generatedPitch,
        formData: JSON.stringify(formData),
      }).toString();
      router.push(`/result?${fullParams}`);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unknown error occurred.";
      console.error(err);
      toast.error("Generation Failed", { description: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto ">
      <div className="text-center ">
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

        <h1 className="text-5xl font-bold font-orbitron">AI Pitch Generator</h1>
        <p className="text-lg text-gray-400 mt-2">
          Fill in the details below to generate your custom pitch.
        </p>
      </div>

      <div className="glass-container p-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="md:col-span-2 h-15">
            {/* Pitch Type */}
            {!isOther ? (
              <div>
                <label className="block mb-1 font-medium">Pitch Type</label>
                <Select onValueChange={handlePitchTypeChange} required>
                  <SelectTrigger className="input-glass h-12 w-full">
                    <SelectValue placeholder="Select pitch type" />
                  </SelectTrigger>
                  <SelectContent className="glass-container border-none">
                    <SelectItem value="startup">Startup Pitch</SelectItem>
                    <SelectItem value="product">Product Pitch</SelectItem>
                    <SelectItem value="job">Job Interview Pitch</SelectItem>
                    <SelectItem value="investor">Investor Pitch</SelectItem>
                    <SelectItem value="other">Other…</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div>
                <label className="block mb-1 font-medium">
                  Pitch Type (custom)
                </label>
                <Input
                  className="input-glass h-12 w-full"
                  placeholder="Enter your pitch type"
                  value={formData.pitchType}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      pitchType: e.target.value,
                    }))
                  }
                  required
                />
                <Button
                  variant="link"
                  size="sm"
                  className="mt-1"
                  onClick={() => {
                    setIsOther(false);
                    setFormData((prev) => ({ ...prev, pitchType: "" }));
                  }}
                >
                  ← Back to list
                </Button>
              </div>
            )}
          </div>
          <Input
            className="input-glass h-11 custom-placeholder"
            placeholder="Product / Idea Name"
            onChange={(e) => handleChange("productName", e.target.value)}
            required
          />
          <Input
            className="input-glass h-11 custom-placeholder"
            placeholder="Target Audience"
            onChange={(e) => handleChange("audience", e.target.value)}
            required
          />
          <Input
            className="input-glass col-span-2 h-11 custom-placeholder"
            placeholder="What core problem are you solving?"
            onChange={(e) => handleChange("problem", e.target.value)}
            required
          />
          <Input
            className="input-glass col-span-2 h-11 custom-placeholder"
            placeholder="What are the key features or your solution?"
            onChange={(e) => handleChange("features", e.target.value)}
            required
          />
          <Textarea
            className="input-glass col-span-2 custom-placeholder"
            placeholder="What is the primary goal of this pitch?"
            onChange={(e) => handleChange("goal", e.target.value)}
            required
          />

          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white border-blue-400 button-gradient shadow-md hover:scale-105 transition-transform w-full h-12 button-gradient md:col-span-2 text-lg"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Wand2 className="mr-2" /> Generate Pitch
              </>
            )}
          </Button>
        </form>
      </div>

      {pitch && (
        <div className="glass-container p-8 animate-fade-in">
          <h2 className="text-3xl font-bold font-orbitron mb-4 flex items-center">
            <Sparkles className="mr-3 text-yellow-400" /> Generated Pitch
          </h2>
          <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:font-orbitron whitespace-pre-wrap">
            {pitch}
          </div>
        </div>
      )}
    </div>
  );
}
