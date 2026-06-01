import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1280&height=720&nologo=true&seed=${Date.now()}`;
    return NextResponse.json({ imageUrl });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}