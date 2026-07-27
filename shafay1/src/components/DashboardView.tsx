import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  Zap, 
  Clock, 
  BarChart2, 
  CreditCard, 
  AlertTriangle, 
  ArrowUpRight, 
  RotateCw, 
  CheckCircle2, 
  Smartphone, 
  Gauge, 
  Sparkles, 
  ChevronRight,
  ShieldAlert,
  Download,
  Upload,
  Globe
} from 'lucide-react';
import { 
  UserAccount, 
  ActiveSubscription, 
  InternetPackage, 
  Bill, 
  RouterInfo, 
  ConnectedDevice, 
  NavigationTab, 
  Language 
} from '../types';
import { translations } from '../i18n/translations';

interface DashboardViewProps {
  user: UserAccount;
  subscription: ActiveSubscription;
  currentPackage: InternetPackage;
  bills: Bill[];
  router: RouterInfo;
  devices: ConnectedDevice[];
  language: Language;
  onTabChange: (tab: NavigationTab) => void;
  onRestartRouter: () => void;
  isRebootingRouter: boolean;
  onPayBill: (billId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  subscription,
  currentPackage,
  bills,
  router,
  devices,
  language,
  onTabChange,
  onRestartRouter,
  isRebootingRouter,
  onPayBill,
}) => {
  const t = translations[language];

  const unpaidBill = (bills || []).find(b => b.status === 'unpaid' || b.status === 'overdue');
  const activeDevices = (devices || []).filter(d => !d.isBlocked);

  // Live countdown timer state for expiry
  const [timeLeft, setTimeLeft] = useState({ days: subscription.daysRemaining, hours: 14, mins: 28, secs: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Top Banner Greeting & Quick Status */}
      <div className="bg-[#18181B] p-6 rounded-2xl border border-[#27272A] relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-widest font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                Fiber Broadband Customer
              </span>
              <span className="text-zinc-500 text-xs">ID: {user.id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.welcomeUser}, {user.name}! 👋
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              {user.address} • High-speed fiber connection active
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onTabChange('speedtest')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 transition"
            >
              <Gauge size={16} />
              <span>{t.runTest}</span>
            </button>
            <button
              onClick={onRestartRouter}
              disabled={isRebootingRouter}
              className="px-4 py-2.5 rounded-xl bg-[#27272A] hover:bg-[#323235] text-zinc-200 border border-[#3F3F46] font-semibold text-xs flex items-center gap-2 transition disabled:opacity-50"
            >
              <RotateCw size={15} className={isRebootingRouter ? "animate-spin text-blue-400" : "text-zinc-400"} />
              <span>{isRebootingRouter ? t.rebooting : t.restartRouter}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Unpaid Bill Warning Alert Banner */}
      {unpaidBill && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/60 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-pulse">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-rose-200">
                {t.unpaidBillAlert} ({unpaidBill.monthYear})
              </h4>
              <p className="text-xs text-rose-300/80">
                {t.dueAmount}: <strong className="text-white font-mono text-sm">PKR {unpaidBill.amountPKR.toLocaleString()}</strong> • Due date: {unpaidBill.dueDate}
              </p>
            </div>
          </div>
          <button
            onClick={() => onTabChange('bills')}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/30 transition shrink-0"
          >
            {t.payNow}
          </button>
        </div>
      )}

      {/* Grid: 4 Core Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Active Package */}
        <div className="p-5 rounded-2xl bg-[#18181B] border border-[#27272A] hover:border-[#3F3F46] transition flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{t.activePackage}</span>
              <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Zap size={16} />
              </span>
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">
              {currentPackage.name}
            </h3>
            <p className="text-2xl font-black text-blue-400 font-mono mt-1">
              {currentPackage.speedMbps} <span className="text-sm font-normal text-zinc-400">Mbps</span>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#27272A] flex items-center justify-between text-xs">
            <span className="text-zinc-400">PKR {currentPackage.priceMonthlyPKR.toLocaleString()}/mo</span>
            <button 
              onClick={() => onTabChange('packages')} 
              className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
            >
              {t.upgrade} <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Card 2: Package Expiry Countdown */}
        <div className="p-5 rounded-2xl bg-[#18181B] border border-[#27272A] hover:border-[#3F3F46] transition flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{t.packageExpiry}</span>
              <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Clock size={16} />
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <div className="text-center bg-[#27272A] px-2.5 py-1 rounded-lg border border-[#3F3F46]">
                <span className="block text-lg font-bold font-mono text-white">{timeLeft.days}</span>
                <span className="text-[9px] uppercase text-zinc-400">Days</span>
              </div>
              <span className="text-zinc-600 font-mono font-bold">:</span>
              <div className="text-center bg-[#27272A] px-2.5 py-1 rounded-lg border border-[#3F3F46]">
                <span className="block text-lg font-bold font-mono text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[9px] uppercase text-zinc-400">Hours</span>
              </div>
              <span className="text-zinc-600 font-mono font-bold">:</span>
              <div className="text-center bg-[#27272A] px-2.5 py-1 rounded-lg border border-[#3F3F46]">
                <span className="block text-lg font-bold font-mono text-white">{String(timeLeft.mins).padStart(2, '0')}</span>
                <span className="text-[9px] uppercase text-zinc-400">Mins</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#27272A] flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 size={13} /> Auto-Renew On
            </span>
            <button 
              onClick={() => onTabChange('packages')} 
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              {t.renewNow}
            </button>
          </div>
        </div>

        {/* Card 3: Data Used This Month */}
        <div className="p-5 rounded-2xl bg-[#18181B] border border-[#27272A] hover:border-[#3F3F46] transition flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{t.dataUsedThisMonth}</span>
              <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <BarChart2 size={16} />
              </span>
            </div>
            <h3 className="text-2xl font-black text-white font-mono mt-1">
              {subscription.dataUsedGB} <span className="text-sm font-normal text-zinc-400">GB</span>
            </h3>
            <div className="w-full bg-[#27272A] h-2 rounded-full overflow-hidden mt-3">
              <div className="bg-blue-500 h-full w-[42%]" />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#27272A] flex items-center justify-between text-xs">
            <span className="text-blue-400 font-medium">{t.unlimitedData}</span>
            <button 
              onClick={() => onTabChange('usage')} 
              className="text-zinc-400 hover:text-white flex items-center gap-1"
            >
              View Stats <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Card 4: Connected Devices */}
        <div className="p-5 rounded-2xl bg-[#18181B] border border-[#27272A] hover:border-[#3F3F46] transition flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{t.connectedDevicesCount}</span>
              <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Smartphone size={16} />
              </span>
            </div>
            <h3 className="text-2xl font-black text-white font-mono mt-1">
              {activeDevices.length} <span className="text-sm font-normal text-zinc-400">Active</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-2">
              Wi-Fi 6 (5GHz): 4 • 2.4GHz: 2 • LAN: 1
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#27272A] flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-mono">Router: {router.model.split('-')[0]}</span>
            <button 
              onClick={() => onTabChange('devices')} 
              className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
            >
              Manage <ChevronRight size={14} />
            </button>
          </div>
        </div>

      </div>

      {/* Main Row: Router Hardware Info + Quick AI Assistant Suggestion */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Router Hardware Panel */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-4">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                <Wifi size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">{router.model}</h3>
                <p className="text-xs text-zinc-400">{router.brand} • Firmware {router.firmwareVersion}</p>
              </div>
            </div>

            <button
              onClick={() => onTabChange('router')}
              className="text-xs px-3 py-1.5 rounded-lg bg-[#27272A] hover:bg-[#323235] text-zinc-200 border border-[#3F3F46] transition font-medium"
            >
              Wi-Fi Settings
            </button>
          </div>

          {/* Wi-Fi SSIDs Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* 2.4 GHz Band */}
            <div className="p-4 rounded-xl bg-[#27272A]/50 border border-[#3F3F46] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-medium">{t.frequency2G}</span>
                <span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md font-mono text-[10px] border border-emerald-800/40">
                  ON (Ch 6)
                </span>
              </div>
              <p className="font-mono text-sm font-bold text-white truncate">{router.wifi2G.ssid}</p>
              <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                <span>Pass: <code className="text-blue-400 font-mono">••••••••</code></span>
                <span>{router.wifi2G.connectedCount} devices</span>
              </div>
            </div>

            {/* 5 GHz Band */}
            <div className="p-4 rounded-xl bg-[#27272A]/50 border border-[#3F3F46] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-medium">{t.frequency5G}</span>
                <span className="text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md font-mono text-[10px] border border-blue-500/20">
                  ON (Ch 36)
                </span>
              </div>
              <p className="font-mono text-sm font-bold text-white truncate">{router.wifi5G.ssid}</p>
              <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                <span>Pass: <code className="text-blue-400 font-mono">••••••••</code></span>
                <span>{router.wifi5G.connectedCount} devices</span>
              </div>
            </div>

          </div>

          {/* Connected Device Mini List */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-semibold text-zinc-300 uppercase tracking-wider">Top Connected Devices</span>
              <button onClick={() => onTabChange('devices')} className="text-blue-400 hover:underline">
                View All ({devices.length})
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {devices.slice(0, 3).map((dev) => (
                <div key={dev.id} className="p-3 rounded-xl bg-[#27272A]/40 border border-[#3F3F46] text-xs space-y-1">
                  <div className="flex items-center justify-between font-semibold text-zinc-200">
                    <span className="truncate">{dev.name}</span>
                    <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">
                      {dev.band}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-mono">{dev.ipAddress}</p>
                  <div className="text-[10px] text-emerald-400 flex items-center justify-between pt-1">
                    <span>{dev.downloadCurrentMbps} Mbps</span>
                    {dev.isPriority && <span className="bg-amber-500/20 text-amber-300 px-1 rounded">Priority</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Smart Troubleshooter Widget */}
        <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Sparkles size={18} />
              </div>
              <h3 className="font-bold text-white text-base">{t.quickTroubleshoot}</h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Ask our AI WiFi Assistant about slow speeds, red lights on router, Wi-Fi password changes, or best gaming package advice in English or Urdu!
            </p>

            <div className="space-y-2 mt-4">
              <button
                onClick={() => onTabChange('ai')}
                className="w-full text-left p-3 rounded-xl bg-[#27272A] hover:bg-[#323235] border border-[#3F3F46] text-xs text-zinc-200 flex items-center justify-between group transition"
              >
                <span>"Why is my Wi-Fi speed slower in back bedroom?"</span>
                <ChevronRight size={14} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onTabChange('ai')}
                className="w-full text-left p-3 rounded-xl bg-[#27272A] hover:bg-[#323235] border border-[#3F3F46] text-xs text-zinc-200 flex items-center justify-between group transition"
              >
                <span>"وائی فائی سگنل کیسے بہتر کریں؟" (Urdu)</span>
                <ChevronRight size={14} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onTabChange('ai')}
                className="w-full text-left p-3 rounded-xl bg-[#27272A] hover:bg-[#323235] border border-[#3F3F46] text-xs text-zinc-200 flex items-center justify-between group transition"
              >
                <span>"Recommend best package for 4K TV & Gaming"</span>
                <ChevronRight size={14} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <button
            onClick={() => onTabChange('ai')}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <Sparkles size={16} />
            <span>Open AI WiFi Assistant</span>
          </button>
        </div>

      </div>

    </div>
  );
};
