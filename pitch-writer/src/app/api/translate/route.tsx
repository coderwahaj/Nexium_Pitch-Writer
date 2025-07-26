// FILE: app/api/translate/route.ts
import { NextResponse } from 'next/server';
import { translateToUrdu } from '@/lib/translate';

export async function POST(req: Request) {
  try {
    const { pitch, targetLang } = await req.json();

    if (!pitch || targetLang !== 'ur') {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
    }

    const translatedText = await translateToUrdu(pitch);
    return NextResponse.json({ translated: translatedText });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Translation failed' }, { status: 500 });
  }
}
