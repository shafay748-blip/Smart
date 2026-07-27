import React, { useState } from 'react';
import { 
  Settings, 
  Globe, 
  Bell, 
  ShieldCheck, 
  Moon, 
  Sun, 
  Smartphone, 
  Mail, 
  CheckCircle2 
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface SettingsViewProps {
  language: Language;
  onLanguageToggle: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  language,
  onLanguageToggle,
}) => {
  const t = translations[language];

  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailInvoices, setEmailInvoices] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [securityLevel, setSecurityLevel] = useState('WPA3-Personal');
  const [savedAlert, setSavedAlert] = useState(false);

  const handleSave = () => {
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-[#18181B] p-6 rounded-2xl border border-[#27272A] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Settings size={18} />
            </span>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              {t.settings}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {t.settingsTitle}
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Configure application language, notification triggers, and router security policies.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
        >
          {t.save}
        </button>
      </div>

      {savedAlert && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700/80 text-emerald-200 flex items-center gap-3">
          <CheckCircle2 size={20} className="text-emerald-400" />
          <span className="font-bold text-sm">Settings saved successfully!</span>
        </div>
      )}

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Language & Regional */}
        <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-4">
          <div className="flex items-center gap-2 border-b border-[#27272A] pb-3">
            <Globe size={18} className="text-blue-400" />
            <h3 className="font-bold text-white text-base">Language & Interface / زبان</h3>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-[#27272A]/80 border border-[#3F3F46]">
            <div>
              <span className="font-bold text-white text-sm">Display Language</span>
              <p className="text-xs text-zinc-400">Switch between English and Urdu (اردو)</p>
            </div>

            <button
              onClick={onLanguageToggle}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
            >
              {language === 'en' ? 'اردو میں تبدیل کریں' : 'Switch to English'}
            </button>
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-4">
          <div className="flex items-center gap-2 border-b border-[#27272A] pb-3">
            <Bell size={18} className="text-blue-400" />
            <h3 className="font-bold text-white text-base">{t.notifications}</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#27272A]/80 border border-[#3F3F46]">
              <span className="font-bold text-zinc-200">{t.smsAlerts}</span>
              <button
                onClick={() => setSmsAlerts(!smsAlerts)}
                className={`w-11 h-6 rounded-full p-1 transition ${smsAlerts ? 'bg-emerald-500' : 'bg-zinc-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${smsAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#27272A]/80 border border-[#3F3F46]">
              <span className="font-bold text-zinc-200">{t.emailAlerts}</span>
              <button
                onClick={() => setEmailInvoices(!emailInvoices)}
                className={`w-11 h-6 rounded-full p-1 transition ${emailInvoices ? 'bg-emerald-500' : 'bg-zinc-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${emailInvoices ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#27272A]/80 border border-[#3F3F46]">
              <span className="font-bold text-zinc-200">{t.pushAlerts}</span>
              <button
                onClick={() => setPushNotifs(!pushNotifs)}
                className={`w-11 h-6 rounded-full p-1 transition ${pushNotifs ? 'bg-emerald-500' : 'bg-zinc-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${pushNotifs ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Security Level */}
        <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-4 md:col-span-2">
          <div className="flex items-center gap-2 border-b border-[#27272A] pb-3">
            <ShieldCheck size={18} className="text-blue-400" />
            <h3 className="font-bold text-white text-base">Wi-Fi Security Policy</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <button
              onClick={() => setSecurityLevel('WPA3-Personal')}
              className={`p-4 rounded-xl border text-left space-y-1 transition ${
                securityLevel === 'WPA3-Personal'
                  ? 'bg-blue-950/40 border-blue-500 text-blue-200'
                  : 'bg-[#27272A]/80 border-[#3F3F46] text-zinc-300'
              }`}
            >
              <h5 className="font-bold text-white text-sm">WPA3 Personal (Recommended)</h5>
              <p className="text-zinc-400">Latest Wi-Fi 6 encryption against brute force dictionary attacks.</p>
            </button>

            <button
              onClick={() => setSecurityLevel('WPA2/WPA3 Mixed')}
              className={`p-4 rounded-xl border text-left space-y-1 transition ${
                securityLevel === 'WPA2/WPA3 Mixed'
                  ? 'bg-blue-950/40 border-blue-500 text-blue-200'
                  : 'bg-[#27272A]/80 border-[#3F3F46] text-zinc-300'
              }`}
            >
              <h5 className="font-bold text-white text-sm">WPA2 / WPA3 Mixed Mode</h5>
              <p className="text-zinc-400">Backward compatibility for older smart TVs and legacy IoT devices.</p>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
