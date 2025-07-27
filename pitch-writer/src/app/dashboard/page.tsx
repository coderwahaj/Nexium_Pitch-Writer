"use client";

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

  const router = useRouter(); // ✅ add this line inside the component

  const [pitch, setPitch] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPitch(null);

    toast.info("Connecting to AI Synapse...", {
      description: "Generating your pitch...",
    });

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

      if (!content) {
        throw new Error("Invalid response from AI. No content returned.");
      }

      setPitch(content.trim());
      toast.success("Pitch Generated Successfully!");

      const fullParams = new URLSearchParams({
        pitch: content.trim(),
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
    <div className="max-w-4xl mx-auto space-y-6">
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
          <div className="md:col-span-2">
            <label className="font-bold text-gray-300 mb-2 block">
              Pitch Type
            </label>
            <Select
              onValueChange={(v) => handleChange("pitchType", v)}
              required
            >
              <SelectTrigger className="input-glass h-12 w-full">
                <SelectValue placeholder="Select pitch type" />
              </SelectTrigger>
              <SelectContent className="glass-container border-none">
                <SelectItem value="startup">Startup Pitch</SelectItem>
                <SelectItem value="product">Product Pitch</SelectItem>
                <SelectItem value="job">Job Interview Pitch</SelectItem>
                <SelectItem value="investor">Investor Pitch</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input
            className="input-glass h-12"
            placeholder="Product / Idea Name"
            onChange={(e) => handleChange("productName", e.target.value)}
            required
          />
          <Input
            className="input-glass h-12"
            placeholder="Target Audience"
            onChange={(e) => handleChange("audience", e.target.value)}
            required
          />
          <Textarea
            className="input-glass md:col-span-2"
            placeholder="What core problem are you solving?"
            onChange={(e) => handleChange("problem", e.target.value)}
            required
          />
          <Textarea
            className="input-glass md:col-span-2"
            placeholder="What are the key features or your solution?"
            onChange={(e) => handleChange("features", e.target.value)}
            required
          />
          <Textarea
            className="input-glass md:col-span-2"
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
                <Wand2 className=" mr-2" /> Generate Pitch
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
