'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Sidebar from '@/components/ui/Sidebar';
import { Loader2, Sparkles, Wand2 ,Zap , Brain , Lightbulb } from "lucide-react";
export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pitch = searchParams.get('pitch') || '';
  const [summary, setSummary] = useState('');
  const [translation, setTranslation] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingTranslation, setLoadingTranslation] = useState(false);

  useEffect(() => {
    setSummary('');
    setTranslation('');
  }, [pitch]);

  const handleRegenerate = () => {
    router.push('/dashboard');
  };

  const handleSummarize = async () => {
    setLoadingSummary(true);
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pitch }),
      });

      const data = await res.json();
      if (res.ok) {
        setSummary(data.summary);
      } else {
        alert('Failed to summarize: ' + data.message);
      }
    } catch (err) {
      alert('Error while summarizing.');
    } finally {
      setLoadingSummary(false);
    }
  };

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
  const handleTranslate = async () => {
    setLoadingTranslation(true);
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pitch, targetLang: 'ur' }),
      });

      const data = await res.json();
      if (res.ok) {
        setTranslation(data.translated);
      } else {
        alert('Failed to translate: ' + data.message);
      }
    } catch (err) {
      alert('Error while translating.');
    } finally {
      setLoadingTranslation(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
        <div><Sidebar /></div>
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

      <h1 className="text-3xl font-bold">Your Generated Pitch</h1>

      <Textarea readOnly className="min-h-[150px]" value={pitch} />

      <div className="flex gap-3">
        <Button onClick={handleRegenerate} variant="secondary">
          Regenerate
        </Button>
        <Button onClick={handleSummarize} disabled={loadingSummary}>
          {loadingSummary ? 'Summarizing...' : 'Summarize'}
        </Button>
        <Button onClick={handleTranslate} disabled={loadingTranslation}>
          {loadingTranslation ? 'Translating...' : 'Translate to Urdu'}
        </Button>
      </div>

      {summary && (
        <div>
          <h2 className="text-xl font-semibold mt-6">Summary</h2>
          <Textarea readOnly className="min-h-[100px]" value={summary} />
        </div>
      )}

      {translation && (
        <div>
          <h2 className="text-xl font-semibold mt-6">Translation (Urdu)</h2>
          <Textarea readOnly className="min-h-[100px]" value={translation} />
        </div>
      )}
    </div>
  );
}
