'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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
