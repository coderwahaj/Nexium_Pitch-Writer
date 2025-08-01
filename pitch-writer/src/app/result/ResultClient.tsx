"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Sidebar from "@/components/ui/Sidebar";
import { toast } from "sonner";
import {
  Sparkles,
  Loader2,
  Wand2,
  Zap,
  Brain,
  Lightbulb,
  ClipboardCopy,
  Download,
  Save,
} from "lucide-react";

export default function ResultClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pitch = searchParams.get("pitch") || "";
  const rawFormData = searchParams.get("formData");

  let parsedFormData: {
    pitchType: string;
    productName: string;
    problem: string;
    audience: string;
    features: string;
    goal: string;
  } = {
    pitchType: "",
    productName: "",
    problem: "",
    audience: "",
    features: "",
    goal: "",
  };

  if (rawFormData) {
    try {
      parsedFormData = JSON.parse(rawFormData);
    } catch (e) {
      console.error("Failed to parse formData:", e);
    }
  }

  const [summary, setSummary] = useState("");
  const [translation, setTranslation] = useState("");
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingTranslation, setLoadingTranslation] = useState(false);

  useEffect(() => {
    setSummary("");
    setTranslation("");
  }, [pitch]);

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    setSummary("");
    setTranslation("");
    const API_URL = process.env.NEXT_PUBLIC_PITCH_API_URL!;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedFormData),
      });

      const data = await res.json();
      const regeneratedPitch = data.choices?.[0]?.message?.content;

      if (!regeneratedPitch) {
        toast.error("No pitch returned.");
        return;
      } else {
        toast.success("Pitch regenerated!");
      }

      router.replace(
        `/result?pitch=${encodeURIComponent(
          regeneratedPitch
        )}&formData=${encodeURIComponent(JSON.stringify(parsedFormData))}`
      );
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "An unknown error occurred while regenerating the pitch.";
      toast.error(`Failed to regenerate pitch.\n${message}`);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleSummarize = async () => {
    setLoadingSummary(true);
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pitch }),
      });

      const data = await res.json();
      if (res.ok) {
        setSummary(data.summary);
      } else {
        toast.error("Failed to summarize: " + data.message);
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "An unknown error occurred while summarizing the pitch.";
      toast.error(`Failed to summarize pitch.\n${message}`);
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleTranslate = async () => {
    setLoadingTranslation(true);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pitch, targetLang: "ur" }),
      });

      const data = await res.json();
      if (res.ok) {
        setTranslation(data.translated);
      } else {
        toast.error("Failed to translate: " + data.message);
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "An unknown error occurred while translating the pitch.";
      toast.error(`Failed to translate pitch.\n${message}`);
    } finally {
      setLoadingTranslation(false);
    }
  };
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard!", {
      icon: <ClipboardCopy className="w-4 h-4 text-white-400" />,
    });
  };
  const saveAsText = (text: string, filename: string) => {
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
    toast("Saved to Downloads", {
      icon: <Save className="w-4 h-4 text-white-400" />,
    });
  };
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

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8 relative">
      <Sidebar />

      {/* Background blobs */}
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

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Decorative Icons */}
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
      <h1 className="text-2xl font-bold">Your Generated Pitch</h1>

      {/*PITCH*/}
      <div>
        <Textarea
          readOnly
          value={pitch}
          className="min-h-[200px] text-2xl leading-relaxed tracking-wide word-spacing-relaxed"
        />
        <div className="mt-2 flex justify-end gap-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => saveAsText(pitch, "pitch.txt")}
          >
            <Download className="w-4 h-4 mr-1" />
            Save
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleCopy(pitch)}>
            <ClipboardCopy className="w-4 h-4 mr-1" />
            Copy
          </Button>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleRegenerate}
          variant="secondary"
          disabled={isRegenerating || loadingSummary || loadingTranslation}
        >
          {isRegenerating && !loadingSummary && !loadingTranslation ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Regenerating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Regenerate
            </>
          )}
        </Button>

        <Button
          onClick={handleSummarize}
          disabled={isRegenerating || loadingSummary}
        >
          {loadingSummary ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Summarizing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Summarize
            </>
          )}
        </Button>

        <Button
          onClick={handleTranslate}
          disabled={isRegenerating || loadingTranslation}
        >
          {loadingTranslation ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Translating...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Translate to Urdu
            </>
          )}
        </Button>
      </div>

      {summary && (
        <div>
          <h2 className="text-2xl font-bold">Your Summary</h2>
          <Textarea
            readOnly
            value={summary}
            className="min-h-[100px] text-base leading-relaxed tracking-wide word-spacing-relaxed"
          />
          <div className="mt-2 flex justify-end gap-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => saveAsText(summary, "summary.txt")}
            >
              <Download className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(summary)}
            >
              <ClipboardCopy className="w-4 h-4 mr-1" />
              Copy
            </Button>
          </div>
        </div>
      )}

      {/* TRANSLATION */}
      {translation && (
        <div>
          <h2 className="text-2xl font-bold">Your Urdu Translation</h2>
          <Textarea
            readOnly
            value={translation}
            className="min-h-[200px] text-lg leading-relaxed tracking-wide word-spacing-relaxed"
          />
          <div className="mt-2 flex justify-end gap-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => saveAsText(translation, "translation.txt")}
            >
              <Download className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(translation)}
            >
              <ClipboardCopy className="w-4 h-4 mr-1" />
              Copy
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
