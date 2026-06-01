import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userMessage = body.messages?.[body.messages.length - 1]?.content || "";
    const systemPrompt = body.system || "";

    // Combine system + user message into one simple request
    const fullPrompt = `${systemPrompt}\n\nUser request: ${userMessage}\n\nRespond in a helpful, exciting way with emojis!`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: fullPrompt }]
            }
          ],
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.9
          }
        })
      }
    );

    const data = await response.json();

    // Get the text from Gemini response
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      // Return the actual error so we can debug
      const errorMsg = data?.error?.message || JSON.stringify(data);
      return NextResponse.json({
        content: [{ type: "text", text: `API Error: ${errorMsg}` }]
      });
    }

    return NextResponse.json({
      content: [{ type: "text", text }]
    });

  } catch (error) {
    return NextResponse.json({
      content: [{ type: "text", text: `Server Error: ${error}` }]
    });
  }
}