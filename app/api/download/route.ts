import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.STORAGE_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN || process.env.STORAGE_REST_API_TOKEN!,
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    const fileData = await redis.get(`file:${code}`);

    if (!fileData) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    return NextResponse.json({ fileData: typeof fileData === 'string' ? JSON.parse(fileData) : fileData });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ 
      error: 'Download failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}