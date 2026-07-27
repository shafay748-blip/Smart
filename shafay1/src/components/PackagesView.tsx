import React, { useState } from 'react';
import { 
  Package, 
  Zap, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  CreditCard, 
  X, 
  Gift, 
  Star,
  Award,
  ArrowRight
} from 'lucide-react';
import { InternetPackage, ActiveSubscription, Language } from '../types';
import { availablePackages } from '../data/mockData';
import { translations } from '../i18n/translations';

interface PackagesViewProps {
  currentPackage: InternetPackage;
  subscription: ActiveSubscription;
  packages?: InternetPackage[];
  language: Language;
  onSelectPackage: (pkg: InternetPackage) => void;
}

export const PackagesView: React.FC<PackagesViewProps> = ({
  currentPackage,
  subscription,
  packages,
  language,
  onSelectPackage,
}) => {
  const t = translations[language];

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPkgForCheckout, setSelectedPkgForCheckout] = useState<InternetPackage | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('jazzcash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const safePackages = packages || availablePackages || [];
  const filteredPackages = selectedCategory === 'all'
    ? safePackages
    : safePackages.filter(p => p.category === selectedCategory);

  const handleConfirmSubscription = () => {
    if (!selectedPkgForCheckout) return;
    setIsProcessing(true);

    setTimeout(() => {
      onSelectPackage(selectedPkgForCheckout);
      setIsProcessing(false);
      setSuccessMessage(`Package successfully updated to ${selectedPkgForCheckout.name}!`);
      setSelectedPkgForCheckout(null);
      setTimeout(() => setSuccessMessage(null), 4000);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-[#18181B] p-6 rounded-2xl border border-[#27272A] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Package size={18} />
            </span>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              {t.packages}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            High-Speed Fiber Internet Packages
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Symmetric download & upload speeds, zero throttling, and 24/7 priority customer support.
          </p>
        </div>

        {/* Current Active Plan Badge */}
        <div className="p-4 rounded-xl bg-[#27272A] border border-blue-500/30 text-white flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-zinc-400">{t.currentPlan}</p>
            <h4 className="font-extrabold text-base text-blue-400">{currentPackage.name}</h4>
            <p className="text-xs font-mono text-zinc-300">{currentPackage.speedMbps} Mbps • PKR {currentPackage.priceMonthlyPKR.toLocaleString()}/mo</p>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-700 text-emerald-200 flex items-center gap-3 animate-bounce">
          <CheckCircle2 size={20} className="text-emerald-400" />
          <span className="font-bold text-sm">{successMessage}</span>
        </div>
      )}

      {/* Package Expiry Tracker */}
      <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Clock size={24} />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">{t.packageExpiry}</h3>
            <p className="text-xs text-zinc-400">
              Valid until <strong className="text-zinc-200">{subscription.expiryDate}</strong> ({subscription.daysRemaining} {t.daysLeft})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-800/60 flex items-center gap-1.5">
            <CheckCircle2 size={14} /> Auto-Renew Active
          </span>
          <button
            onClick={() => setSelectedPkgForCheckout(currentPackage)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
          >
            {t.renewNow}
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {[
          { id: 'all', label: t.allPackages },
          { id: 'home', label: t.homePlans },
          { id: 'ultra', label: t.ultraPlans },
          { id: 'gaming', label: t.gamingPlans },
          { id: 'business', label: t.businessPlans },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl font-semibold text-xs whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white'
                : 'bg-[#18181B] border border-[#27272A] text-zinc-400 hover:text-white hover:bg-[#27272A]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => {
          const isCurrent = pkg.id === currentPackage.id;

          return (
            <div
              key={pkg.id}
              className={`p-6 rounded-3xl bg-slate-900/90 border transition-all duration-200 relative flex flex-col justify-between shadow-xl ${
                isCurrent 
                  ? 'border-cyan-500 ring-2 ring-cyan-500/20 shadow-cyan-500/10' 
                  : pkg.popular 
                    ? 'border-blue-500/60 hover:border-blue-400' 
                    : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Top Badges */}
              {pkg.popular && (
                <div className="absolute -top-3 right-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Star size={12} className="fill-white" /> Most Popular
                </div>
              )}

              {isCurrent && (
                <div className="absolute -top-3 left-6 bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <CheckCircle2 size={12} /> Active Subscription
                </div>
              )}

              <div className="space-y-4 pt-2">
                <div>
                  <h3 className="text-xl font-extrabold text-white">{pkg.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 min-h-[36px]">{pkg.description}</p>
                </div>

                {/* Speed & Price Display */}
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <Zap size={22} className="text-cyan-400" />
                    <span className="text-3xl font-black font-mono text-white">{pkg.speedMbps}</span>
                    <span className="text-sm font-bold text-slate-400">Mbps</span>
                  </div>
                  <p className="text-xs text-emerald-400 font-semibold">{t.unlimitedData}</p>
                  <div className="text-xl font-black text-cyan-300 font-mono pt-1">
                    PKR {pkg.priceMonthlyPKR.toLocaleString()} <span className="text-xs font-normal text-slate-400">{t.perMonth}</span>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">{t.packageFeatures}</p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Perks */}
                {pkg.perks.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                    <p className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                      <Gift size={13} /> {t.packagePerks}
                    </p>
                    {pkg.perks.map((perk, idx) => (
                      <p key={idx} className="text-xs text-slate-400 bg-slate-800/50 px-2.5 py-1 rounded-lg">
                        • {perk}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                {isCurrent ? (
                  <button
                    disabled
                    className="w-full py-3 rounded-xl bg-slate-800 text-cyan-400 font-bold text-xs border border-cyan-500/30 flex items-center justify-center gap-2 cursor-default"
                  >
                    <CheckCircle2 size={16} />
                    <span>Current Active Plan</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedPkgForCheckout(pkg)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2"
                  >
                    <span>{t.subscribePlan}</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Add-ons Section */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck size={20} className="text-cyan-400" />
          <h3 className="font-bold text-white text-lg">Broadband Add-ons & Extensions</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">Dedicated Static IP</span>
              <span className="text-cyan-400 font-mono font-bold">PKR 300/mo</span>
            </div>
            <p className="text-slate-400">Fixed public IP for remote CCTV access, port forwarding, and home web servers.</p>
            <span className="inline-block text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-semibold">Active on Account</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">Security Shield Pro</span>
              <span className="text-cyan-400 font-mono font-bold">PKR 200/mo</span>
            </div>
            <p className="text-slate-400">Router-level mal-site blocking, malware protection, and adult content filters.</p>
            <span className="inline-block text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-semibold">Active on Account</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">Mesh Wi-Fi Extender</span>
              <span className="text-cyan-400 font-mono font-bold">PKR 499/mo</span>
            </div>
            <p className="text-slate-400">Eliminate dead zones in multi-story houses with additional Mesh Nodes.</p>
            <button className="text-[11px] font-bold text-cyan-400 hover:underline">Request Node</button>
          </div>
        </div>
      </div>

      {/* Checkout / Upgrade Modal */}
      {selectedPkgForCheckout && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl text-slate-100 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-extrabold text-lg text-white">Subscribe to {selectedPkgForCheckout.name}</h3>
                <p className="text-xs text-slate-400">Review package details and complete payment</p>
              </div>
              <button
                onClick={() => setSelectedPkgForCheckout(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Selected Package Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2 text-xs">
              <div className="flex justify-between font-bold text-sm text-white">
                <span>{selectedPkgForCheckout.name} ({selectedPkgForCheckout.speedMbps} Mbps)</span>
                <span className="font-mono text-cyan-300">PKR {selectedPkgForCheckout.priceMonthlyPKR.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Validity</span>
                <span>30 Days (Instant Upgrade)</span>
              </div>
              <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-700 font-bold text-white text-sm">
                <span>Total Due Now</span>
                <span className="font-mono text-emerald-400">PKR {selectedPkgForCheckout.priceMonthlyPKR.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase text-slate-300 tracking-wider">Select Payment Method</p>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { id: 'jazzcash', name: 'JazzCash Wallet', icon: '📱' },
                  { id: 'easypaisa', name: 'EasyPaisa Wallet', icon: '📲' },
                  { id: 'card', name: 'Debit / Credit Card', icon: '💳' },
                  { id: 'bank', name: 'Bank Transfer', icon: '🏛️' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedPaymentMethod(m.id)}
                    className={`p-3 rounded-xl border text-left font-medium flex items-center gap-2 transition ${
                      selectedPaymentMethod === m.id
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span className="text-base">{m.icon}</span>
                    <span>{m.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Action */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setSelectedPkgForCheckout(null)}
                className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleConfirmSubscription}
                disabled={isProcessing}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <CreditCard size={16} />
                    <span>Pay & Activate Now</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
