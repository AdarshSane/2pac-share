import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.STORAGE_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN || process.env.STORAGE_REST_API_TOKEN!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, fileData } = body;

    if (!code || !fileData) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    // Store file data with code as key, expires in 7 days (604800 seconds)
    await redis.set(`file:${code}`, JSON.stringify(fileData), { ex: 604800 });

    return NextResponse.json({ success: true, code });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Upload failed', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}