// src/app/api/summarize/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { pitch } = await req.json();

  const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
  const endpoint = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: pitch }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json({ message: 'Failed to summarize', details: errorText }, { status: 500 });
  }

  const result = await response.json();

  const summary = result?.[0]?.summary_text || 'No summary generated.';
  return NextResponse.json({ summary });
}
