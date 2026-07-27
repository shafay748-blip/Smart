import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { message, history = [], userContext = {}, language = 'en' } = req.body || {};

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is missing or server is offline
      const fallbackEn =
        'I am Smart WiFi Assistant (Offline Mode). Your connection status is Active on ' +
        (userContext.packageName || 'Speed Ultra 250 Mbps') +
        '. Try restarting your router from the Router Information tab or checking connected devices.';
      const fallbackUr =
        'میں سمارٹ وائی فائی اسسٹنٹ ہوں۔ آپ کا کنکشن فعال ہے۔ اگر آپ کو رفتار کے مسائل ہیں تو راؤٹر کو ری سٹارٹ کریں۔';
      res.status(200).json({
        reply: language === 'ur' ? fallbackUr : fallbackEn,
        suggestedActions: ['Restart Router', 'Run Speed Test', 'Check Bills'],
      });
      return;
    }

    const langInstruction =
      language === 'ur'
        ? 'Respond in Urdu language (using standard Urdu script) mixed with common technical English words if needed (like Wi-Fi, Router, Mbps, Ping).'
        : 'Respond in clear, concise, and helpful English.';

    const systemInstruction = `You are "Smart WiFi AI Assistant", an expert AI customer support agent for a modern fiber broadband ISP called Smart WiFi.
You help users troubleshoot WiFi issues, slow speeds, red router lights, bill payments, package selection, router placement, and connected device controls.
Current User Context:
- User Name: ${userContext.userName || 'Shafay Ali'}
- Active Package: ${userContext.packageName || 'Speed Ultra 250 Mbps'} (${userContext.speedMbps || 250} Mbps)
- Days Until Package Expiry: ${userContext.daysRemaining || 12} days
- Router Model: ${userContext.routerModel || 'Archer AX73 Wi-Fi 6'}
- Router Status: ${userContext.routerOnline ? 'Online (Good Signal)' : 'Offline/Warning'}
- Connected Devices: ${userContext.deviceCount || 7} devices
- Unpaid Bills: ${userContext.hasUnpaidBill ? 'Yes (PKR 3,499 due)' : 'None'}

Formatting rules:
- Keep answers structured with bullet points or step-by-step numbers when troubleshooting.
- Always be polite, professional, and directly actionable.
- ${langInstruction}
- Offer relevant quick next steps or actions when applicable.`;

    const modelName = 'gemini-2.0-flash';

    const contents: any[] = [];

    if (Array.isArray(history)) {
      history.slice(-6).forEach((h: { sender: string; text: string }) => {
        contents.push({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }],
        });
      });
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: modelName,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I'm sorry, I couldn't process your request right now. Please try again.";

    res.status(200).json({ reply: replyText });
  } catch (err: any) {
    console.error('Gemini AI API Error:', err);
    res.status(500).json({
      error: 'Failed to generate response from AI Assistant.',
      details: err.message || 'Internal server error',
    });
  }
}
