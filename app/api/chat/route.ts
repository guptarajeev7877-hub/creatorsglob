import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userMessage = body.messages?.[body.messages.length - 1]?.content || "";
    const systemPrompt = body.system || "";

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        max_tokens: 1000,
        temperature: 0.9
      })
    });

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      const errorMsg = data?.error?.message || JSON.stringify(data);
      return NextResponse.json({
        content: [{ type: "text", text: `Error: ${errorMsg}` }]
      });
    }

    return NextResponse.json({ content: [{ type: "text", text }] });

  } catch (error) {
    return NextResponse.json({
      content: [{ type: "text", text: `Server Error: ${error}` }]
    });
  }
}