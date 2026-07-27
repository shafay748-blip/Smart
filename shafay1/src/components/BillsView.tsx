import React, { useState } from 'react';
import { 
  Receipt, 
  CreditCard, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  FileText, 
  DollarSign, 
  X, 
  ShieldCheck, 
  Clock,
  Printer
} from 'lucide-react';
import { Bill, UserAccount, Language } from '../types';
import { translations } from '../i18n/translations';

interface BillsViewProps {
  bills: Bill[];
  user: UserAccount;
  language: Language;
  onPayBill: (billId: string) => void;
}

export const BillsView: React.FC<BillsViewProps> = ({
  bills,
  user,
  language,
  onPayBill,
}) => {
  const t = translations[language];

  const [selectedBillForPayment, setSelectedBillForPayment] = useState<Bill | null>(null);
  const [selectedBillForReceipt, setSelectedBillForReceipt] = useState<Bill | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('jazzcash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [autoPay, setAutoPay] = useState(true);

  const unpaidBill = (bills || []).find(b => b.status === 'unpaid' || b.status === 'overdue');

  const handleConfirmPay = () => {
    if (!selectedBillForPayment) return;
    setIsProcessing(true);

    setTimeout(() => {
      onPayBill(selectedBillForPayment.id);
      setIsProcessing(false);
      setSelectedBillForPayment(null);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-[#18181B] p-6 rounded-2xl border border-[#27272A] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Receipt size={18} />
            </span>
            <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">
              {t.bills}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Billing & Invoices History
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            View monthly invoices, payment receipts, auto-pay configurations, and tax breakdowns.
          </p>
        </div>

        {/* Auto-pay Toggle */}
        <div className="p-4 rounded-xl bg-[#27272A] border border-[#3F3F46] text-white flex items-center gap-3 shrink-0">
          <div className="text-right">
            <p className="text-xs font-bold">Auto-Pay Service</p>
            <p className="text-[10px] text-zinc-400">Auto charge via JazzCash</p>
          </div>
          <button
            onClick={() => setAutoPay(!autoPay)}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${autoPay ? 'bg-emerald-500' : 'bg-zinc-700'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${autoPay ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      {/* Unpaid Bill Alert Callout */}
      {unpaidBill && (
        <div className="p-6 rounded-2xl bg-rose-950/30 border border-rose-800/60 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-800/40 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">Unpaid Statement</span>
                <h3 className="text-xl font-bold text-white">{unpaidBill.monthYear} Invoice ({unpaidBill.invoiceNumber})</h3>
                <p className="text-xs text-rose-300">Due Date: <strong>{unpaidBill.dueDate}</strong></p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-zinc-400">Total Payable Amount</p>
              <h2 className="text-3xl font-black text-rose-400 font-mono">PKR {unpaidBill.amountPKR.toLocaleString()}</h2>
            </div>
          </div>

          {/* Itemized Fee Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#27272A]/60 border border-[#3F3F46]">
              <span className="text-zinc-400 block text-[10px] uppercase">Plan Fee</span>
              <span className="font-bold font-mono text-white">PKR {unpaidBill.breakdown.packageFee.toLocaleString()}</span>
            </div>

            {unpaidBill.breakdown.staticIpFee && (
              <div className="p-3 rounded-xl bg-[#27272A]/60 border border-[#3F3F46]">
                <span className="text-zinc-400 block text-[10px] uppercase">Static IP</span>
                <span className="font-bold font-mono text-white">PKR {unpaidBill.breakdown.staticIpFee.toLocaleString()}</span>
              </div>
            )}

            {unpaidBill.breakdown.securityShieldFee && (
              <div className="p-3 rounded-xl bg-[#27272A]/60 border border-[#3F3F46]">
                <span className="text-zinc-400 block text-[10px] uppercase">Security Shield</span>
                <span className="font-bold font-mono text-white">PKR {unpaidBill.breakdown.securityShieldFee.toLocaleString()}</span>
              </div>
            )}

            <div className="p-3 rounded-xl bg-[#27272A]/60 border border-[#3F3F46]">
              <span className="text-zinc-400 block text-[10px] uppercase">Govt Taxes</span>
              <span className="font-bold font-mono text-emerald-400">Inclusive</span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setSelectedBillForPayment(unpaidBill)}
              className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition flex items-center gap-2"
            >
              <CreditCard size={16} />
              <span>{t.payNow} (PKR {unpaidBill.amountPKR.toLocaleString()})</span>
            </button>
          </div>
        </div>
      )}

      {/* Invoices List Table */}
      <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-4">
        <h3 className="font-bold text-white text-lg">{t.billingHistory}</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-[#27272A] uppercase text-[10px] font-bold text-zinc-400 tracking-wider">
              <tr>
                <th className="p-3 rounded-l-xl">{t.invoiceNo}</th>
                <th className="p-3">Month</th>
                <th className="p-3">{t.dueDate}</th>
                <th className="p-3">{t.amount}</th>
                <th className="p-3">{t.status}</th>
                <th className="p-3 rounded-r-xl text-right">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A]">
              {bills.map((bill) => (
                <tr key={bill.id} className="hover:bg-[#27272A]/40 transition">
                  <td className="p-3 font-mono font-bold text-white flex items-center gap-2">
                    <FileText size={16} className="text-blue-400" />
                    {bill.invoiceNumber}
                  </td>
                  <td className="p-3 font-medium text-zinc-200">{bill.monthYear}</td>
                  <td className="p-3 text-zinc-400">{bill.dueDate}</td>
                  <td className="p-3 font-mono font-bold text-white">PKR {bill.amountPKR.toLocaleString()}</td>
                  <td className="p-3">
                    {bill.status === 'paid' ? (
                      <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 px-2.5 py-1 rounded-full font-bold text-[10px] flex items-center gap-1 w-fit">
                        <CheckCircle2 size={12} /> Paid
                      </span>
                    ) : (
                      <span className="bg-rose-950/80 text-rose-300 border border-rose-800/60 px-2.5 py-1 rounded-full font-bold text-[10px] flex items-center gap-1 w-fit">
                        <Clock size={12} /> Unpaid
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    {bill.status === 'paid' ? (
                      <button
                        onClick={() => setSelectedBillForReceipt(bill)}
                        className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 ml-auto"
                      >
                        <Download size={14} /> Receipt
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedBillForPayment(bill)}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] transition"
                      >
                        {t.payNow}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedBillForPayment && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl text-slate-100 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-extrabold text-lg text-white">Pay Bill - {selectedBillForPayment.monthYear}</h3>
                <p className="text-xs text-slate-400">Invoice #{selectedBillForPayment.invoiceNumber}</p>
              </div>
              <button
                onClick={() => setSelectedBillForPayment(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2 text-xs">
              <div className="flex justify-between font-bold text-sm text-white">
                <span>{selectedBillForPayment.breakdown.packageName}</span>
                <span className="font-mono text-cyan-300">PKR {selectedBillForPayment.amountPKR.toLocaleString()}</span>
              </div>
              <p className="text-slate-400">Customer ID: {user.id} • {user.name}</p>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase text-slate-300 tracking-wider">{t.paymentMethods}</p>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { id: 'jazzcash', name: t.jazzcash, icon: '📱' },
                  { id: 'easypaisa', name: t.easypaisa, icon: '📲' },
                  { id: 'card', name: t.creditCard, icon: '💳' },
                  { id: 'bank', name: t.bankTransfer, icon: '🏛️' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`p-3 rounded-xl border text-left font-medium flex items-center gap-2 transition ${
                      paymentMethod === m.id
                        ? 'bg-rose-950 border-rose-500 text-rose-200'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span className="text-base">{m.icon}</span>
                    <span className="truncate">{m.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setSelectedBillForPayment(null)}
                className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleConfirmPay}
                disabled={isProcessing}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:brightness-110 text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <CreditCard size={16} />
                    <span>Confirm PKR {selectedBillForPayment.amountPKR.toLocaleString()}</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* PDF Receipt Printable Modal */}
      {selectedBillForReceipt && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl text-slate-100 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Receipt className="text-emerald-400" size={20} />
                <h3 className="font-extrabold text-lg text-white">Payment Receipt</h3>
              </div>
              <button
                onClick={() => setSelectedBillForReceipt(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="bg-white text-slate-900 p-6 rounded-2xl space-y-4 font-sans text-xs">
              <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                <div>
                  <h4 className="font-extrabold text-base text-cyan-900">{t.appName}</h4>
                  <p className="text-[10px] text-slate-500">Official Broadband Receipt</p>
                </div>
                <div className="text-right">
                  <span className="text-emerald-600 font-bold uppercase border border-emerald-600 px-2 py-0.5 rounded text-[10px]">
                    PAID
                  </span>
                  <p className="text-[10px] text-slate-500 mt-1">{selectedBillForReceipt.paymentDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-500 block">Customer Name:</span>
                  <strong className="text-slate-800">{user.name}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Customer ID:</span>
                  <strong className="font-mono text-slate-800">{user.id}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Invoice Number:</span>
                  <strong className="font-mono text-slate-800">{selectedBillForReceipt.invoiceNumber}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Payment Method:</span>
                  <strong className="text-slate-800">{selectedBillForReceipt.paymentMethod || 'Wallet'}</strong>
                </div>
              </div>

              <div className="border-t border-b border-slate-200 py-2 space-y-1">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>{selectedBillForReceipt.breakdown.packageName}</span>
                  <span className="font-mono">PKR {selectedBillForReceipt.amountPKR.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm font-black text-slate-900 pt-1">
                <span>Total Paid</span>
                <span className="font-mono text-emerald-700">PKR {selectedBillForReceipt.amountPKR.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedBillForReceipt(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                {t.close}
              </button>
              <button
                onClick={() => {
                  alert('Receipt downloaded as PDF!');
                  setSelectedBillForReceipt(null);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Download size={14} /> Download PDF
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
