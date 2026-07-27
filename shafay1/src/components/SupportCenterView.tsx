import React, { useState } from 'react';
import { 
  LifeBuoy, 
  HelpCircle, 
  AlertCircle, 
  MessageSquare, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Send, 
  X,
  Wrench,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { SupportTicket, Language } from '../types';
import { translations } from '../i18n/translations';

interface SupportCenterViewProps {
  tickets: SupportTicket[];
  language: Language;
  onSubmitTicket: (ticket: Partial<SupportTicket>) => void;
  onAddMessageToTicket: (ticketId: string, text: string) => void;
}

export const SupportCenterView: React.FC<SupportCenterViewProps> = ({
  tickets,
  language,
  onSubmitTicket,
  onAddMessageToTicket,
}) => {
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'troubleshoot' | 'tickets'>('troubleshoot');
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<string | null>(null);

  // New Ticket Form State
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<SupportTicket['category']>('speed');
  const [priority, setPriority] = useState<SupportTicket['priority']>('medium');
  const [description, setDescription] = useState('');

  // Selected ticket for chat detail view
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(tickets[0] || null);
  const [replyInput, setReplyInput] = useState('');

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !description) return;

    onSubmitTicket({
      subject,
      category,
      priority,
      messages: [
        {
          id: `m-${Date.now()}`,
          sender: 'user',
          senderName: 'Shafay Ali',
          text: description,
          timestamp: 'Just now',
        }
      ]
    });

    setShowNewTicketModal(false);
    setSubject('');
    setDescription('');
    setActiveTab('tickets');
  };

  const handleSendReply = () => {
    if (selectedTicket && replyInput.trim()) {
      onAddMessageToTicket(selectedTicket.id, replyInput.trim());
      setReplyInput('');
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-[#18181B] p-6 rounded-2xl border border-[#27272A] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <LifeBuoy size={18} />
            </span>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              {t.support}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {t.supportCenterTitle}
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Interactive self-service diagnostic, instant troubleshooter, and direct NOC engineer ticketing.
          </p>
        </div>

        <button
          onClick={() => setShowNewTicketModal(true)}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center gap-2 shrink-0"
        >
          <Plus size={16} />
          <span>{t.createNewTicket}</span>
        </button>
      </div>

      {/* Main Mode Tabs */}
      <div className="flex items-center gap-2 border-b border-[#27272A] pb-3">
        <button
          onClick={() => setActiveTab('troubleshoot')}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition ${
            activeTab === 'troubleshoot' 
              ? 'bg-blue-600 text-white' 
              : 'bg-[#27272A] border border-[#3F3F46] text-zinc-400 hover:text-white'
          }`}
        >
          {t.quickTroubleshoot}
        </button>
        <button
          onClick={() => setActiveTab('tickets')}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition ${
            activeTab === 'tickets' 
              ? 'bg-blue-600 text-white' 
              : 'bg-[#27272A] border border-[#3F3F46] text-zinc-400 hover:text-white'
          }`}
        >
          {t.myTickets} ({tickets.length})
        </button>
      </div>

      {/* Mode 1: Interactive Self-Service Troubleshooter */}
      {activeTab === 'troubleshoot' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {[
              { id: 'red_light', title: 'LOS Red Light on Router', desc: 'PON optical light blinking red or off entirely.', icon: <AlertCircle className="text-rose-400" /> },
              { id: 'slow_speed', title: 'Slow Speeds & High Latency', desc: 'Speed test results lower than subscribed package.', icon: <Wrench className="text-amber-400" /> },
              { id: 'disconnect', title: 'Frequent Disconnections', desc: 'Wi-Fi drops every few minutes across devices.', icon: <ShieldAlert className="text-blue-400" /> },
            ].map((diag) => (
              <div
                key={diag.id}
                onClick={() => setSelectedDiagnostic(diag.id)}
                className={`p-6 rounded-2xl bg-[#18181B] border cursor-pointer transition space-y-3 ${
                  selectedDiagnostic === diag.id
                    ? 'border-blue-500 ring-1 ring-blue-500/20 bg-[#27272A]/80'
                    : 'border-[#27272A] hover:border-[#3F3F46]'
                }`}
              >
                <div className="p-3 rounded-xl bg-[#27272A] w-fit">{diag.icon}</div>
                <h4 className="font-extrabold text-white text-base">{diag.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{diag.desc}</p>
                <span className="text-xs font-semibold text-blue-400 flex items-center gap-1 pt-1">
                  Start Diagnostic <ChevronRight size={14} />
                </span>
              </div>
            ))}

          </div>

          {/* Diagnostic Steps Panel */}
          {selectedDiagnostic && (
            <div className="p-6 rounded-2xl bg-[#18181B] border border-blue-500/50 space-y-4 animate-in fade-in duration-200">
              <h3 className="font-extrabold text-white text-lg flex items-center gap-2">
                <Wrench size={20} className="text-blue-400" />
                Step-by-Step Diagnostic Resolution
              </h3>

              <div className="space-y-3 text-xs text-zinc-300">
                <div className="p-4 rounded-xl bg-[#27272A]/80 border border-[#3F3F46] flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">1</span>
                  <div>
                    <h5 className="font-bold text-white text-sm">Verify Fiber Cable Connections</h5>
                    <p className="text-zinc-400 mt-0.5">Ensure the blue/green fiber patch cord at the back of the Archer AX73 router is firmly connected without bends or twists.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#27272A]/80 border border-[#3F3F46] flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h5 className="font-bold text-white text-sm">Soft Reboot Router</h5>
                    <p className="text-zinc-400 mt-0.5">Unplug the power adapter for 15 seconds or use the "Restart Router" button in the top menu.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#27272A]/80 border border-[#3F3F46] flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h5 className="font-bold text-white text-sm">Check 5GHz vs 2.4GHz Band</h5>
                    <p className="text-zinc-400 mt-0.5">Connect heavy devices (smart TV, laptops) to the 5GHz band for maximum throughput.</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#27272A]">
                <span className="text-xs text-zinc-400">Issue still not resolved?</span>
                <button
                  onClick={() => setShowNewTicketModal(true)}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition"
                >
                  Submit Support Ticket To Field Team
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Support Tickets List & Messaging Thread */}
      {activeTab === 'tickets' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Tickets List */}
          <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-3">
            <h3 className="font-bold text-white text-base mb-2">My Tickets</h3>

            <div className="space-y-2">
              {tickets.map((tkt) => (
                <div
                  key={tkt.id}
                  onClick={() => setSelectedTicket(tkt)}
                  className={`p-4 rounded-xl border cursor-pointer transition text-xs space-y-2 ${
                    selectedTicket?.id === tkt.id
                      ? 'bg-blue-950/40 border-blue-500'
                      : 'bg-[#27272A]/60 border-[#3F3F46] hover:bg-[#27272A]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-zinc-400">{tkt.ticketNo}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      tkt.status === 'resolved' 
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/50' 
                        : 'bg-amber-950/80 text-amber-300 border border-amber-800/50'
                    }`}>
                      {tkt.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  <h5 className="font-bold text-white line-clamp-1">{tkt.subject}</h5>
                  <p className="text-[10px] text-zinc-400">{tkt.createdAt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ticket Messages Thread */}
          {selectedTicket && (
            <div className="lg:col-span-2 p-6 rounded-2xl bg-[#18181B] border border-[#27272A] flex flex-col justify-between space-y-4">
              <div className="space-y-4 border-b border-[#27272A] pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs text-blue-400">{selectedTicket.ticketNo}</span>
                    <h3 className="font-extrabold text-white text-lg">{selectedTicket.subject}</h3>
                  </div>
                  <span className="text-xs text-zinc-400">Created: {selectedTicket.createdAt}</span>
                </div>
              </div>

              {/* Chat Thread Messages */}
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
                {selectedTicket.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-xl max-w-[85%] text-xs space-y-1 ${
                      msg.sender === 'user'
                        ? 'ml-auto bg-blue-600 text-white'
                        : 'bg-[#27272A] border border-[#3F3F46] text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] opacity-80 mb-1">
                      <span className="font-bold">{msg.senderName}</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>

              {/* Message Reply Box */}
              <div className="pt-2 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type message reply to support agent..."
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#27272A] border border-[#3F3F46] text-xs text-white focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSendReply}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
                >
                  <Send size={16} />
                </button>
              </div>

            </div>
          )}

        </div>
      )}

      {/* New Support Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateTicketSubmit} className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl text-slate-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-lg text-white">Create New Support Ticket</h3>
              <button
                type="button"
                onClick={() => setShowNewTicketModal(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Subject</label>
              <input
                type="text"
                required
                placeholder="e.g. Slow speed on 5GHz band"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Category</label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                >
                  <option value="speed">Speed & Latency</option>
                  <option value="billing">Billing Issue</option>
                  <option value="disconnection">Frequent Disconnections</option>
                  <option value="router">Router Settings</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Priority</label>
                <select
                  value={priority}
                  onChange={(e: any) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent (Red Light)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Issue Description</label>
              <textarea
                required
                rows={4}
                placeholder="Describe what happened, error lights, or affected devices..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowNewTicketModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md"
              >
                {t.submitTicket}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
