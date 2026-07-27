import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  BarChart3, 
  Receipt, 
  Router, 
  Smartphone, 
  Gauge, 
  LifeBuoy, 
  Bot, 
  Gift, 
  User, 
  Settings,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { NavigationTab, Language } from '../types';
import { translations } from '../i18n/translations';

interface SidebarProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  language: Language;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  unpaidBillsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  language,
  mobileOpen,
  onCloseMobile,
  unpaidBillsCount,
}) => {
  const t = translations[language];

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string | number; color?: string }[] = [
    { id: 'dashboard', label: t.dashboard, icon: <LayoutDashboard size={18} /> },
    { id: 'packages', label: t.packages, icon: <Package size={18} />, color: 'text-emerald-400' },
    { id: 'usage', label: t.usage, icon: <BarChart3 size={18} /> },
    { id: 'bills', label: t.bills, icon: <Receipt size={18} />, badge: unpaidBillsCount > 0 ? `${unpaidBillsCount} Due` : undefined },
    { id: 'router', label: t.router, icon: <Router size={18} /> },
    { id: 'devices', label: t.devices, icon: <Smartphone size={18} />, badge: '7' },
    { id: 'speedtest', label: t.speedtest, icon: <Gauge size={18} />, color: 'text-amber-400' },
    { id: 'support', label: t.support, icon: <LifeBuoy size={18} /> },
    { id: 'ai', label: t.aiAssistant, icon: <Bot size={18} />, color: 'text-cyan-400', badge: 'AI' },
    { id: 'offers', label: t.offers, icon: <Gift size={18} />, color: 'text-rose-400' },
    { id: 'profile', label: t.profile, icon: <User size={18} /> },
    { id: 'settings', label: t.settings, icon: <Settings size={18} /> },
  ];

  const handleSelect = (id: NavigationTab) => {
    onTabChange(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Navigation Drawer */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#0A0A0B] border-r border-[#27272A] text-[#E4E4E7] flex flex-col transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Top Header Mobile Branding */}
        <div className="p-4 border-b border-[#27272A] md:hidden flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Zap size={18} />
            </div>
            <span className="font-bold text-white text-base">{t.appName}</span>
          </div>
          <button 
            onClick={onCloseMobile}
            className="text-zinc-400 hover:text-white p-1"
          >
            ✕
          </button>
        </div>

        {/* Main Nav Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          <p className="px-3 text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-2">
            Broadband Control
          </p>

          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium text-xs transition-all group ${
                  isActive
                    ? 'bg-[#27272A] text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-[#18181B]'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isActive ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                  ) : (
                    <span className={`shrink-0 ${item.color || 'text-zinc-400 group-hover:text-blue-400'}`}>
                      {item.icon}
                    </span>
                  )}
                  {isActive && <span className="text-blue-400 shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive 
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                        : typeof item.badge === 'string' && item.badge.includes('Due')
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
                          : 'bg-[#27272A] text-blue-400 border border-[#3F3F46]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight size={14} className="text-zinc-400" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Banner Card */}
        <div className="p-4 border-t border-[#27272A]">
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-4 rounded-xl border border-[#3F3F46]">
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span className="text-xs font-semibold text-zinc-200">Fiber Shield Active</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Protected against DDoS attacks & phishing attempts at network level.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
