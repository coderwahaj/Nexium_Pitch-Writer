import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { pitch } = await req.json();

  // Fake summarization logic for demo
  const summary = pitch.length > 100 ? pitch.slice(0, 100) + '...' : pitch;

  return NextResponse.json({ summary });
}
