import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { pitch, targetLang } = await req.json();

  // Fake translation (replace with real API like Google Translate if needed)
  const translated = `یہ اردو ترجمہ ہے: ${pitch}`;

  return NextResponse.json({ translated });
}
