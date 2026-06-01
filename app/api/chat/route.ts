import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        ...body,
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1000,
      }),
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}