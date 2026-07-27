import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client server-side
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", aiConfigured: !!ai });
});

// AI WiFi Assistant endpoint
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, history = [], userContext = {}, language = 'en' } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is missing or server is offline
      const fallbackEn = "I am Smart WiFi Assistant (Offline Mode). Your connection status is Active on " + 
        (userContext.packageName || "Speed Ultra 250 Mbps") + ". Try restarting your router from the Router Information tab or checking connected devices.";
      const fallbackUr = "میں سمارٹ وائی فائی اسسٹنٹ ہوں۔ آپ کا کنکشن فعال ہے۔ اگر آپ کو رفتار کے مسائل ہیں تو راؤٹر کو ری سٹارٹ کریں۔";
      return res.json({
        reply: language === 'ur' ? fallbackUr : fallbackEn,
        suggestedActions: ["Restart Router", "Run Speed Test", "Check Bills"]
      });
    }

    const langInstruction = language === 'ur'
      ? "Respond in Urdu language (using standard Urdu script) mixed with common technical English words if needed (like Wi-Fi, Router, Mbps, Ping)."
      : "Respond in clear, concise, and helpful English.";

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

    const modelName = "gemini-3.6-flash";

    // Format chat history for Gemini
    const contents: any[] = [];
    
    // Add history
    if (Array.isArray(history)) {
      history.slice(-6).forEach((h: { sender: string; text: string }) => {
        contents.push({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        });
      });
    }

    // Append current prompt
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: modelName,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I'm sorry, I couldn't process your request right now. Please try again.";

    return res.json({ reply: replyText });
  } catch (err: any) {
    console.error("Gemini AI API Error:", err);
    res.status(500).json({
      error: "Failed to generate response from AI Assistant.",
      details: err.message || "Internal server error"
    });
  }
});

// Speed Test Simulation Endpoint
app.post("/api/speedtest/simulate", (req, res) => {
  const baseSpeed = req.body.packageSpeed || 250;
  
  // Add realistic random variation
  const pingMs = Math.floor(8 + Math.random() * 8); // 8-16ms
  const jitterMs = Math.floor(1 + Math.random() * 3); // 1-4ms
  const downloadMbps = +(baseSpeed * (0.92 + Math.random() * 0.12)).toFixed(1);
  const uploadMbps = +(baseSpeed * 0.85 * (0.90 + Math.random() * 0.12)).toFixed(1);

  res.json({
    pingMs,
    jitterMs,
    downloadMbps,
    uploadMbps,
    server: "SmartWiFi Fiber Server - Node #04 (Low Latency)",
    timestamp: new Date().toISOString()
  });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Smart WiFi Assistant Server running on http://localhost:${PORT}`);
  });
}

startServer();
