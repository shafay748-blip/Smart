import React, { useState } from 'react';
import { 
  Gift, 
  Zap, 
  Copy, 
  Check, 
  Award, 
  Users, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Offer, UserAccount, Language } from '../types';
import { translations } from '../i18n/translations';

interface OffersViewProps {
  offers: Offer[];
  user: UserAccount;
  language: Language;
}

export const OffersView: React.FC<OffersViewProps> = ({
  offers,
  user,
  language,
}) => {
  const t = translations[language];

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [promoInput, setPromoInput] = useState('');
  const [claimStatus, setClaimStatus] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleClaimPromo = () => {
    if (!promoInput.trim()) return;
    if (promoInput.toUpperCase() === 'SUMMER500' || promoInput.toUpperCase() === 'STATICFREE') {
      setClaimStatus(`Promo code ${promoInput.toUpperCase()} successfully applied! 50% discount added to next invoice.`);
    } else {
      setClaimStatus(`Promo code ${promoInput.toUpperCase()} claimed! Rewards points increased by 200.`);
    }
    setPromoInput('');
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-[#18181B] p-6 rounded-2xl border border-[#27272A] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Gift size={18} />
            </span>
            <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">
              {t.offers}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {t.promotionsTitle}
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Claim seasonal fiber speed upgrades, referral bonuses, and reward points credits.
          </p>
        </div>

        {/* Reward Points Badge */}
        <div className="p-4 rounded-xl bg-[#27272A] border border-[#3F3F46] text-white flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
            <Award size={20} />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 block uppercase font-bold">Reward Balance</span>
            <h4 className="text-xl font-black font-mono text-amber-300">{user.rewardPoints} Points</h4>
          </div>
        </div>
      </div>

      {/* Claim Status Alert */}
      {claimStatus && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700/80 text-emerald-200 flex items-center gap-3">
          <CheckCircle2 size={20} className="text-emerald-400" />
          <span className="font-bold text-sm">{claimStatus}</span>
        </div>
      )}

      {/* Referral Code Box */}
      <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
            <Users size={16} /> {t.referralTitle}
          </span>
          <h3 className="text-xl font-extrabold text-white">Give 50% Off, Get PKR 1,000 Cash Credit</h3>
          <p className="text-xs text-zinc-400">Share your referral link with neighbors in Johar Town. Unlimited credits!</p>
        </div>

        <div className="flex items-center gap-2 bg-[#27272A] p-2 rounded-xl border border-[#3F3F46]">
          <code className="font-mono font-bold text-blue-400 text-sm px-3">{user.referralCode}</code>
          <button
            onClick={() => handleCopy(user.referralCode)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1 transition"
          >
            {copiedCode === user.referralCode ? <Check size={16} /> : <Copy size={16} />}
            <span>{copiedCode === user.referralCode ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Redeem Promo Input Bar */}
      <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-3">
        <h3 className="font-bold text-white text-base">Have a Promo or Coupon Code?</h3>
        <div className="flex items-center gap-2 max-w-md">
          <input
            type="text"
            placeholder="Enter code (e.g. SUMMER500)"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#27272A] border border-[#3F3F46] text-xs text-white uppercase font-mono focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleClaimPromo}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
          >
            Apply Code
          </button>
        </div>
      </div>

      {/* Offers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map((off) => (
          <div
            key={off.id}
            className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] hover:border-[#3F3F46] transition space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-rose-950/80 text-rose-300 text-[10px] font-bold border border-rose-800/60">
                  {off.badge}
                </span>
                <span className="text-[10px] text-zinc-400">Till {off.validTill}</span>
              </div>

              <h3 className="font-bold text-white text-lg">{off.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{off.description}</p>
            </div>

            <div className="pt-3 border-t border-[#27272A] flex items-center justify-between">
              <code className="font-mono text-blue-400 font-bold text-xs">{off.code}</code>
              <button
                onClick={() => handleCopy(off.code)}
                className="px-3 py-1.5 rounded-xl bg-[#27272A] hover:bg-[#3F3F46] text-zinc-200 font-bold text-xs transition flex items-center gap-1"
              >
                {copiedCode === off.code ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copiedCode === off.code ? 'Copied' : 'Claim'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
