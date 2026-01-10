import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, fileData } = body;

    if (!code || !fileData) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    // Store file data with code as key, expires in 7 days
    await kv.set(`file:${code}`, JSON.stringify(fileData), { ex: 604800 });

    return NextResponse.json({ success: true, code });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}