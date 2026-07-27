import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  CreditCard, 
  Award, 
  FileText 
} from 'lucide-react';
import { UserAccount, Language } from '../types';
import { translations } from '../i18n/translations';

interface ProfileViewProps {
  user: UserAccount;
  language: Language;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, language }) => {
  const t = translations[language];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-[#18181B] p-6 rounded-2xl border border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-black text-2xl flex items-center justify-center shadow-lg">
            {user.name.charAt(0)}
          </div>
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest font-mono">
              Account ID: {user.id}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {user.name}
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Member Since {user.memberSince} • Fiber Home Line
            </p>
          </div>
        </div>

        <span className="px-3 py-1.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-bold text-xs flex items-center gap-1.5 w-fit">
          <ShieldCheck size={16} /> Verified Broadband Customer
        </span>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Personal & Contact Details */}
        <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-4">
          <h3 className="font-bold text-white text-base border-b border-[#27272A] pb-3">Contact & Identification</h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#27272A]/80 border border-[#3F3F46]">
              <Mail size={18} className="text-blue-400 shrink-0" />
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase">Email Address</span>
                <span className="font-semibold text-white">{user.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#27272A]/80 border border-[#3F3F46]">
              <Phone size={18} className="text-blue-400 shrink-0" />
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase">Mobile Number</span>
                <span className="font-semibold text-white font-mono">{user.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#27272A]/80 border border-[#3F3F46]">
              <FileText size={18} className="text-blue-400 shrink-0" />
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase">CNIC Number</span>
                <span className="font-semibold text-white font-mono">{user.cnic}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Installation Address Details */}
        <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-4">
          <h3 className="font-bold text-white text-base border-b border-[#27272A] pb-3">Fiber Installation Location</h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#27272A]/80 border border-[#3F3F46]">
              <MapPin size={18} className="text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase">Service Address</span>
                <span className="font-semibold text-white leading-relaxed">{user.address}, {user.city}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#27272A]/80 border border-[#3F3F46]">
              <Award size={18} className="text-amber-400 shrink-0" />
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase">Reward Points Balance</span>
                <span className="font-bold text-amber-300 font-mono text-sm">{user.rewardPoints} Points</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
