import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Globe, 
  Check, 
  RotateCw, 
  Zap, 
  Wifi, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { UserAccount, InternetPackage, ActiveSubscription, RouterInfo, Language } from '../types';
import { translations } from '../i18n/translations';

interface AIAssistantViewProps {
  user: UserAccount;
  currentPackage: InternetPackage;
  subscription: ActiveSubscription;
  router: RouterInfo;
  deviceCount: number;
  language: Language;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({
  user,
  currentPackage,
  subscription,
  router,
  deviceCount,
  language,
}) => {
  const t = translations[language];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: language === 'ur'
        ? `سلام ${user.name}! میں سمارٹ وائی فائی کا اے آئی اسسٹنٹ ہوں۔ میں آپ کے کنکشن (${currentPackage.name})، راؤٹر سیٹنگز اور اسپیڈ کی رہنمائی کے لیے موجود ہوں۔ آپ مجھ سے انگلش یا اردو میں سوال پوچھ سکتے ہیں!`
        : `Hello ${user.name}! I am your Smart WiFi AI Assistant. I have live context for your account (${currentPackage.name} - ${currentPackage.speedMbps} Mbps) and Archer AX73 router. How can I help you today?`,
      timestamp: 'Just now'
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickPrompts = [
    { text: "Why is my internet red light blinking?", label: "🔴 Red Light Issue" },
    { text: "Suggest best package for gaming & 4K streaming", label: "🎮 Gaming Package" },
    { text: "How to separate 2.4G & 5G Wi-Fi channels?", label: "📡 Split Wi-Fi" },
    { text: "میرا انٹرنیٹ سلو چل رہا ہے، کیا کروں؟", label: "🇵🇰 Urdu Help" },
    { text: "How do I change my Wi-Fi password safely?", label: "🔑 Password Reset" },
  ];

  const handleSendMessage = async (customMessage?: string) => {
    const messageToSend = customMessage || inputText;
    if (!messageToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: messageToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customMessage) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageToSend,
          history: messages.map(m => ({ sender: m.sender, text: m.text })),
          language: language,
          userContext: {
            userName: user.name,
            packageName: currentPackage.name,
            speedMbps: currentPackage.speedMbps,
            daysRemaining: subscription.daysRemaining,
            routerModel: router.model,
            routerOnline: router.isOnline,
            deviceCount: deviceCount
          }
        })
      });

      const data = await response.json();

      const aiReplyText = data.reply || "I'm sorry, I encountered an issue processing your request. Please try again.";

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error("AI Assistant Fetch Error:", err);
      const fallbackMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: "I am having trouble connecting to the AI server. Please check your network or try restarting your router.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-[#18181B] p-6 rounded-2xl border border-[#27272A] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Bot size={18} />
            </span>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              {t.aiAssistant}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {t.aiTitle}
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            {t.aiSubtitle}
          </p>
        </div>

        {/* Live User Context Pill */}
        <div className="p-3 rounded-xl bg-[#27272A] border border-[#3F3F46] text-xs text-zinc-300 flex items-center gap-3 shrink-0">
          <Zap size={18} className="text-blue-400" />
          <div>
            <span className="text-zinc-500 block text-[10px]">Active Context</span>
            <span className="font-bold text-white">{currentPackage.name} ({currentPackage.speedMbps} Mbps)</span>
          </div>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] flex flex-col h-[520px] justify-between space-y-4">
        
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                msg.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
              }`}>
                {msg.sender === 'user' ? user.name.charAt(0) : <Bot size={16} />}
              </div>

              <div className={`p-4 rounded-xl text-xs space-y-1 max-w-[80%] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-[#27272A] border border-[#3F3F46] text-zinc-200 rounded-tl-none'
              }`}>
                <div className="flex items-center justify-between text-[10px] opacity-75 mb-1 gap-4">
                  <span className="font-bold">{msg.sender === 'user' ? user.name : 'Smart WiFi AI Assistant'}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <div className="whitespace-pre-line">{msg.text}</div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                <Bot size={16} className="animate-spin" />
              </div>
              <div className="p-3 rounded-xl bg-[#27272A] border border-[#3F3F46] text-xs text-zinc-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                <span>AI Assistant is analyzing WiFi status and generating response...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Prompts Chips */}
        <div className="pt-2 border-t border-[#27272A] space-y-2">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{t.quickQuestions}</p>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(qp.text)}
                disabled={isLoading}
                className="px-3 py-1.5 rounded-xl bg-[#27272A] hover:bg-[#3F3F46] border border-[#3F3F46] text-xs text-blue-300 font-medium whitespace-nowrap transition disabled:opacity-50"
              >
                {qp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder={t.typeMessage}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-xl bg-[#27272A] border border-[#3F3F46] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 disabled:opacity-50"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputText.trim()}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center gap-2 disabled:opacity-50"
          >
            <span>Send</span>
            <Send size={15} />
          </button>
        </div>

      </div>

    </div>
  );
};
