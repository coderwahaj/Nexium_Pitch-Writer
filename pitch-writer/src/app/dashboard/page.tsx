'use client'

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



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
        description: "Generating your pitch..."
    })

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
      router.push(`/result?pitch=${encodeURIComponent(content.trim())}`);

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unknown error occurred.";
      console.error(err);
      toast.error("Generation Failed", { description: message });
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold font-orbitron">AI Pitch Generator</h1>
        <p className="text-lg text-gray-400 mt-2">Fill in the details below to generate your custom pitch.</p>
      </div>

      <div className="glass-container p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="font-bold text-gray-300 mb-2 block">Pitch Type</label>
            <Select onValueChange={(v) => handleChange("pitchType", v)} required>
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
          <Input className="input-glass h-12" placeholder="Product / Idea Name" onChange={(e) => handleChange("productName", e.target.value)} required />
          <Input className="input-glass h-12" placeholder="Target Audience" onChange={(e) => handleChange("audience", e.target.value)} required />
          <Textarea className="input-glass md:col-span-2" placeholder="What core problem are you solving?" onChange={(e) => handleChange("problem", e.target.value)} required />
          <Textarea className="input-glass md:col-span-2" placeholder="What are the key features or your solution?" onChange={(e) => handleChange("features", e.target.value)} required />
          <Textarea className="input-glass md:col-span-2" placeholder="What is the primary goal of this pitch?" onChange={(e) => handleChange("goal", e.target.value)} required />
          
          <Button type="submit" className="w-full h-12 button-gradient md:col-span-2 text-lg" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <><Wand2 className="mr-2"/> Generate Pitch</>}
          </Button>
        </form>
      </div>

      {pitch && (
        <div className="glass-container p-8 animate-fade-in">
          <h2 className="text-3xl font-bold font-orbitron mb-4 flex items-center">
            <Sparkles className="mr-3 text-yellow-400"/> Generated Pitch
          </h2>
          <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:font-orbitron whitespace-pre-wrap">
            {pitch}
          </div>
        </div>
      )}
    </div>
  );
}