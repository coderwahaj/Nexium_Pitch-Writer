"use client";

import { useState } from "react";
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
  const [pitch, setPitch] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPitch(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      console.log("n8n response:", data);

      // Extract the AI text from the OpenAI-like response
      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error("No pitch content returned");
      }

      setPitch(content.trim());
      setLoading(false)
    } catch (err: unknown) {
      console.error(err);
      let message = "Unknown error";
      if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === "string") {
        message = err;
      }
      setError(message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">🎯 Generate Your Pitch</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Pitch Type</label>
          <Select onValueChange={(v) => handleChange("pitchType", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select pitch type" />
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
          onChange={(e) => handleChange("productName", e.target.value)}
        />
        <Textarea
          placeholder="Core problem"
          onChange={(e) => handleChange("problem", e.target.value)}
        />
        <Textarea
          placeholder="Target audience"
          onChange={(e) => handleChange("audience", e.target.value)}
        />
        <Textarea
          placeholder="Key features"
          onChange={(e) => handleChange("features", e.target.value)}
        />
        <Textarea
          placeholder="Goal of the pitch"
          onChange={(e) => handleChange("goal", e.target.value)}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Generating..." : "Generate Pitch"}
        </Button>
      </form>

      {error && <p className="mt-4 text-red-600">Error: {error}</p>}

      {pitch && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Generated Pitch</h2>
          <p className="whitespace-pre-wrap">{pitch}</p>
        </div>
      )}
    </div>
  );
}
