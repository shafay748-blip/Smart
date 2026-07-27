import React, { useState } from 'react';
import { 
  Router, 
  Wifi, 
  RotateCw, 
  Key, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  Radio, 
  ShieldCheck, 
  Users, 
  Cpu, 
  Info,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { RouterInfo, Language } from '../types';
import { translations } from '../i18n/translations';

interface RouterInfoViewProps {
  router: RouterInfo;
  language: Language;
  onUpdateWifiPassword: (band: '2G' | '5G', newPass: string) => void;
  onToggleGuestWifi: (enabled: boolean) => void;
  onRestartRouter: () => void;
  isRebooting: boolean;
}

export const RouterInfoView: React.FC<RouterInfoViewProps> = ({
  router,
  language,
  onUpdateWifiPassword,
  onToggleGuestWifi,
  onRestartRouter,
  isRebooting,
}) => {
  const t = translations[language];

  const [show2GPass, setShow2GPass] = useState(false);
  const [show5GPass, setShow5GPass] = useState(false);
  const [copied2G, setCopied2G] = useState(false);
  const [copied5G, setCopied5G] = useState(false);

  const [new2GPass, setNew2GPass] = useState(router.wifi2G.password);
  const [new5GPass, setNew5GPass] = useState(router.wifi5G.password);
  const [editModalBand, setEditModalBand] = useState<'2G' | '5G' | null>(null);

  const handleCopy = (text: string, setCopied: (c: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSavePassword = () => {
    if (editModalBand === '2G') {
      onUpdateWifiPassword('2G', new2GPass);
    } else if (editModalBand === '5G') {
      onUpdateWifiPassword('5G', new5GPass);
    }
    setEditModalBand(null);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-[#18181B] p-6 rounded-2xl border border-[#27272A] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Router size={18} />
            </span>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              {t.router}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {router.model}
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            {router.brand} • Firmware {router.firmwareVersion} • Uptime {router.uptimeHours} hrs
          </p>
        </div>

        <button
          onClick={onRestartRouter}
          disabled={isRebooting}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center gap-2 shrink-0 disabled:opacity-50"
        >
          <RotateCw size={16} className={isRebooting ? "animate-spin text-white" : ""} />
          <span>{isRebooting ? t.rebooting : t.restartRouter}</span>
        </button>
      </div>

      {/* Router Reboot Animated Countdown Banner */}
      {isRebooting && (
        <div className="p-6 rounded-2xl bg-blue-950/50 border border-blue-500/40 text-blue-100 space-y-3 shadow-2xl animate-pulse">
          <div className="flex items-center gap-3">
            <RotateCw size={24} className="animate-spin text-blue-400" />
            <div>
              <h4 className="font-extrabold text-base text-white">{t.rebooting}</h4>
              <p className="text-xs text-blue-300">{t.routerRebootNotice}</p>
            </div>
          </div>
          <div className="w-full bg-[#27272A] h-2 rounded-full overflow-hidden">
            <div className="bg-blue-400 h-full animate-pulse w-full" />
          </div>
        </div>
      )}

      {/* Hardware Status Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] space-y-1">
          <span className="text-zinc-400 block text-[10px] uppercase font-bold">WAN Public IP</span>
          <span className="font-mono font-bold text-blue-400 text-sm">{router.wanIp}</span>
        </div>

        <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] space-y-1">
          <span className="text-zinc-400 block text-[10px] uppercase font-bold">LAN Router Gateway</span>
          <span className="font-mono font-bold text-zinc-200 text-sm">{router.lanIp}</span>
        </div>

        <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] space-y-1">
          <span className="text-zinc-400 block text-[10px] uppercase font-bold">Fiber Optical Signal</span>
          <span className="font-mono font-bold text-emerald-400 text-sm">{router.signalDbm} dBm (Excellent)</span>
        </div>

        <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] space-y-1">
          <span className="text-zinc-400 block text-[10px] uppercase font-bold">MAC Address</span>
          <span className="font-mono font-bold text-zinc-300 text-sm truncate block">{router.macAddress}</span>
        </div>
      </div>

      {/* Dual Band SSIDs Section */}
      <div className="space-y-4">
        <h3 className="font-bold text-white text-lg flex items-center gap-2">
          <Radio size={20} className="text-blue-400" />
          {t.dualBandSSID}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 2.4 GHz Band */}
          <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-4">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{t.frequency2G}</span>
                <h4 className="font-extrabold text-white text-lg mt-0.5">{router.wifi2G.ssid}</h4>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 text-[11px] font-bold border border-emerald-800/60">
                Channel {router.wifi2G.channel}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#27272A]/60 border border-[#3F3F46] flex items-center justify-between">
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase">{t.wifiPassword}</span>
                  <span className="font-mono text-sm font-bold text-white">
                    {show2GPass ? router.wifi2G.password : '••••••••••••'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShow2GPass(!show2GPass)}
                    className="p-2 rounded-lg bg-[#27272A] hover:bg-[#3F3F46] text-zinc-200"
                    title={show2GPass ? t.hidePassword : t.showPassword}
                  >
                    {show2GPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    onClick={() => handleCopy(router.wifi2G.password, setCopied2G)}
                    className="p-2 rounded-lg bg-[#27272A] hover:bg-[#3F3F46] text-zinc-200"
                    title="Copy Password"
                  >
                    {copied2G ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-zinc-400 text-xs pt-1">
                <span>Security: <strong className="text-zinc-200">{router.wifi2G.security}</strong></span>
                <button
                  onClick={() => {
                    setEditModalBand('2G');
                    setNew2GPass(router.wifi2G.password);
                  }}
                  className="text-blue-400 hover:underline font-semibold"
                >
                  {t.changePasswordModal}
                </button>
              </div>
            </div>
          </div>

          {/* 5 GHz Band */}
          <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-4">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{t.frequency5G}</span>
                <h4 className="font-extrabold text-white text-lg mt-0.5">{router.wifi5G.ssid}</h4>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 text-[11px] font-bold border border-blue-500/20">
                Channel {router.wifi5G.channel}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#27272A]/60 border border-[#3F3F46] flex items-center justify-between">
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase">{t.wifiPassword}</span>
                  <span className="font-mono text-sm font-bold text-white">
                    {show5GPass ? router.wifi5G.password : '••••••••••••'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShow5GPass(!show5GPass)}
                    className="p-2 rounded-lg bg-[#27272A] hover:bg-[#3F3F46] text-zinc-200"
                    title={show5GPass ? t.hidePassword : t.showPassword}
                  >
                    {show5GPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    onClick={() => handleCopy(router.wifi5G.password, setCopied5G)}
                    className="p-2 rounded-lg bg-[#27272A] hover:bg-[#3F3F46] text-zinc-200"
                    title="Copy Password"
                  >
                    {copied5G ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-zinc-400 text-xs pt-1">
                <span>Security: <strong className="text-zinc-200">{router.wifi5G.security}</strong></span>
                <button
                  onClick={() => {
                    setEditModalBand('5G');
                    setNew5GPass(router.wifi5G.password);
                  }}
                  className="text-blue-400 hover:underline font-semibold"
                >
                  {t.changePasswordModal}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Guest Wi-Fi Section */}
      <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Users size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">{t.guestNetworkTitle}</h3>
              <p className="text-xs text-zinc-400">Isolated guest network without local network access</p>
            </div>
          </div>

          <button
            onClick={() => onToggleGuestWifi(!router.guestNetwork.enabled)}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${router.guestNetwork.enabled ? 'bg-emerald-500' : 'bg-zinc-700'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${router.guestNetwork.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        {router.guestNetwork.enabled && (
          <div className="p-4 rounded-xl bg-[#27272A]/60 border border-[#3F3F46] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-zinc-400 block text-[10px] uppercase">Guest SSID</span>
              <span className="font-bold font-mono text-white">{router.guestNetwork.ssid}</span>
            </div>
            <div>
              <span className="text-zinc-400 block text-[10px] uppercase">Guest Password</span>
              <span className="font-bold font-mono text-blue-400">{router.guestNetwork.password}</span>
            </div>
            <div>
              <span className="text-zinc-400 block text-[10px] uppercase">Max Device Limit</span>
              <span className="font-bold font-mono text-zinc-200">{router.guestNetwork.maxDevices} Devices</span>
            </div>
          </div>
        )}
      </div>

      {/* Edit Password Modal */}
      {editModalBand && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-slate-100 animate-in zoom-in-95 duration-200">
            <h3 className="font-bold text-lg text-white">Change {editModalBand} Wi-Fi Password</h3>
            <p className="text-xs text-slate-400">Connected devices will need to reconnect with the new password.</p>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">New Password (Min 8 characters)</label>
              <input
                type="text"
                value={editModalBand === '2G' ? new2GPass : new5GPass}
                onChange={(e) => editModalBand === '2G' ? setNew2GPass(e.target.value) : setNew5GPass(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => setEditModalBand(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleSavePassword}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md"
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
