import React, { useState } from 'react';
import { 
  Wifi, 
  Bell, 
  Globe, 
  ShieldCheck, 
  AlertCircle, 
  User, 
  Menu, 
  X,
  Zap,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { Language, NavigationTab, NotificationItem, UserAccount, RouterInfo } from '../types';
import { translations } from '../i18n/translations';

interface HeaderProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  language: Language;
  onLanguageToggle: () => void;
  user: UserAccount;
  router: RouterInfo;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  language,
  onLanguageToggle,
  user,
  router,
  notifications,
  onMarkNotificationRead,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const t = translations[language];

  const safeNotifications = notifications || [];
  const unreadCount = safeNotifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-[#0A0A0B]/80 backdrop-blur-sm border-b border-[#27272A] text-[#E4E4E7] px-4 md:px-8 py-3 transition-all">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        
        {/* Left Side: Brand Logo & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#27272A] text-zinc-300 hover:text-white hover:bg-[#323235] transition"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div 
            onClick={() => onTabChange('dashboard')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <Wifi size={22} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white">
                  {t.appName}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Fiber 6
                </span>
              </div>
              <p className="text-xs text-zinc-400 hidden sm:block">
                {user.city} • IP: <span className="font-mono text-blue-400">{router.wanIp}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Center: Live Status Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18181B] border border-[#27272A] text-xs">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-zinc-200 font-medium">{t.statusOnline}</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400 flex items-center gap-1">
            <Zap size={13} className="text-amber-400" /> Ping: <strong className="text-zinc-200 font-mono">9ms</strong>
          </span>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick AI Button */}
          <button
            onClick={() => onTabChange('ai')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              currentTab === 'ai' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                : 'bg-[#27272A] hover:bg-[#323235] text-blue-400 border border-blue-500/30'
            }`}
          >
            <SparklesIcon />
            <span>{t.aiAssistant}</span>
          </button>

          {/* Language Switcher Button (EN / Urdu) */}
          <button
            onClick={onLanguageToggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#27272A] hover:bg-[#323235] text-xs font-medium text-zinc-200 border border-[#3F3F46] transition"
            title="Switch Language (English / Urdu)"
          >
            <Globe size={15} className="text-blue-400" />
            <span className="font-semibold">{language === 'en' ? 'اردو' : 'English'}</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg bg-[#27272A] hover:bg-[#323235] text-zinc-300 transition border border-[#3F3F46]"
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce shadow-md">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Menu */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#18181B] border border-[#27272A] rounded-2xl shadow-2xl z-50 p-4 text-[#E4E4E7] animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between border-b border-[#27272A] pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Bell size={16} className="text-blue-400" />
                    <h4 className="font-semibold text-sm">Smart Notifications</h4>
                  </div>
                  <span className="text-xs text-zinc-400 bg-[#27272A] px-2 py-0.5 rounded-full">
                    {unreadCount} unread
                  </span>
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
                  {safeNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => onMarkNotificationRead(notif.id)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                        notif.read 
                          ? 'bg-[#27272A]/40 border-[#27272A] text-zinc-400' 
                          : 'bg-[#27272A] border-[#3F3F46] text-zinc-200 shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-semibold text-white flex items-center gap-1.5">
                          {notif.type === 'warning' && <AlertCircle size={14} className="text-amber-400 shrink-0" />}
                          {notif.type === 'success' && <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />}
                          {notif.type === 'info' && <HelpCircle size={14} className="text-blue-400 shrink-0" />}
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-zinc-500 shrink-0">{notif.timestamp}</span>
                      </div>
                      <p className="text-zinc-300 leading-relaxed">{notif.message}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-2 border-t border-[#27272A] text-center">
                  <button 
                    onClick={() => {
                      onTabChange('support');
                      setShowNotifications(false);
                    }}
                    className="text-xs text-blue-400 hover:text-blue-300 font-medium"
                  >
                    View Support Help & System Logs
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div 
            onClick={() => onTabChange('profile')}
            className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-xl bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] cursor-pointer transition"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
              {user.name.charAt(0)}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold leading-tight text-white">{user.name}</p>
              <p className="text-[10px] text-zinc-400 font-mono">ID: {user.id}</p>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};

function SparklesIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-cyan-300 animate-spin" style={{ animationDuration: '6s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}
