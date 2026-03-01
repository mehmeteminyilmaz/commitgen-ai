import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { diff } = await req.json();
    // ARTIK ANAHTARI BURAYA YAZMIYORUZ
const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
    if (!apiKey) return NextResponse.json({ message: "Groq API Key eksik!" }, { status: 500 });

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // Çok hızlı ve zeki bir modeldir
        messages: [
          {
            role: "system",
            content: "Sen kıdemli bir yazılımcısın. Verilen git diff için sadece profesyonel, kısa ve Türkçe bir commit mesajı üret. Format: 'tip: açıklama'."
          },
          {
            role: "user",
            content: `Bu değişikliği analiz et: ${diff}`
          }
        ]
      })
    });

    const data = await response.json();
    const result = data.choices[0]?.message?.content || "Mesaj üretilemedi.";
    
    return NextResponse.json({ message: result.trim() });

  } catch (error: any) {
    return NextResponse.json({ message: "Bağlantı Hatası: " + error.message }, { status: 500 });
  }
}