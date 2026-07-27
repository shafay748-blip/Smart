import React, { useState } from 'react';
import { 
  Smartphone, 
  Laptop, 
  Tv, 
  Gamepad2, 
  ShieldAlert, 
  Zap, 
  PauseCircle, 
  PlayCircle, 
  Edit2, 
  Wifi, 
  X,
  Search,
  Check
} from 'lucide-react';
import { ConnectedDevice, Language } from '../types';
import { translations } from '../i18n/translations';

interface ConnectedDevicesViewProps {
  devices: ConnectedDevice[];
  language: Language;
  onToggleBlockDevice: (id: string) => void;
  onTogglePriorityDevice: (id: string) => void;
  onRenameDevice: (id: string, newName: string) => void;
}

export const ConnectedDevicesView: React.FC<ConnectedDevicesViewProps> = ({
  devices,
  language,
  onToggleBlockDevice,
  onTogglePriorityDevice,
  onRenameDevice,
}) => {
  const t = translations[language];

  const [filterBand, setFilterBand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingDevice, setEditingDevice] = useState<ConnectedDevice | null>(null);
  const [renameInput, setRenameInput] = useState<string>('');

  const filteredDevices = (devices || []).filter(d => {
    const matchesBand = filterBand === 'all' || d.band === filterBand;
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.ipAddress.includes(searchQuery);
    return matchesBand && matchesSearch;
  });

  const getDeviceIcon = (type: ConnectedDevice['type']) => {
    switch (type) {
      case 'phone': return <Smartphone size={18} className="text-cyan-400" />;
      case 'laptop': return <Laptop size={18} className="text-blue-400" />;
      case 'tv': return <Tv size={18} className="text-purple-400" />;
      case 'gaming': return <Gamepad2 size={18} className="text-rose-400" />;
      default: return <Wifi size={18} className="text-emerald-400" />;
    }
  };

  const handleSaveRename = () => {
    if (editingDevice && renameInput.trim()) {
      onRenameDevice(editingDevice.id, renameInput.trim());
      setEditingDevice(null);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-[#18181B] p-6 rounded-2xl border border-[#27272A] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Smartphone size={18} />
            </span>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              {t.devices}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Connected Devices ({devices.length})
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Manage internet access, pause devices, assign QoS priority speeds, and rename active devices.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {['all', '5GHz', '2.4GHz', 'Ethernet'].map((band) => (
            <button
              key={band}
              onClick={() => setFilterBand(band)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition ${
                filterBand === band
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#27272A] border border-[#3F3F46] text-zinc-400 hover:text-white'
              }`}
            >
              {band === 'all' ? 'All Bands' : band}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3.5 top-3 text-zinc-400" />
        <input
          type="text"
          placeholder={t.search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#18181B] border border-[#27272A] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevices.map((dev) => (
          <div
            key={dev.id}
            className={`p-6 rounded-2xl bg-[#18181B] border transition space-y-4 flex flex-col justify-between ${
              dev.isBlocked 
                ? 'border-rose-900/60 opacity-60' 
                : dev.isPriority 
                  ? 'border-amber-500/60 ring-1 ring-amber-500/20' 
                  : 'border-[#27272A] hover:border-[#3F3F46]'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#27272A] border border-[#3F3F46]">
                    {getDeviceIcon(dev.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-extrabold text-white text-sm truncate max-w-[150px]">{dev.name}</h4>
                      <button
                        onClick={() => {
                          setEditingDevice(dev);
                          setRenameInput(dev.name);
                        }}
                        className="text-zinc-500 hover:text-zinc-300 p-0.5"
                        title="Rename Device"
                      >
                        <Edit2 size={12} />
                      </button>
                    </div>
                    <p className="text-[11px] text-zinc-400">{dev.vendor}</p>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                  dev.band === '5GHz' 
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                    : dev.band === '2.4GHz' 
                      ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' 
                      : 'bg-emerald-950/60 text-emerald-300 border-emerald-800/40'
                }`}>
                  {dev.band}
                </span>
              </div>

              {/* IP & MAC Details */}
              <div className="p-3 rounded-xl bg-[#27272A]/50 border border-[#3F3F46] space-y-1 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>IP Address:</span>
                  <span className="text-zinc-200">{dev.ipAddress}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>MAC:</span>
                  <span className="text-zinc-200">{dev.macAddress}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Today Traffic:</span>
                  <span className="text-blue-400 font-bold">{dev.totalDataTodayGB} GB</span>
                </div>
              </div>

              {/* Bandwidth Meter */}
              {!dev.isBlocked && (
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-[11px] font-semibold text-zinc-300">
                    <span>Active Speed</span>
                    <span className="text-emerald-400 font-mono">{dev.downloadCurrentMbps} Mbps</span>
                  </div>
                  <div className="w-full bg-[#27272A] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-400 h-full" 
                      style={{ width: `${Math.min(100, (dev.downloadCurrentMbps / 150) * 100)}%` }} 
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-[#27272A] flex items-center justify-between gap-2 text-xs">
              
              {/* QoS Priority Switch */}
              <button
                onClick={() => onTogglePriorityDevice(dev.id)}
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 transition ${
                  dev.isPriority 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                    : 'bg-[#27272A] text-zinc-400 hover:text-white'
                }`}
              >
                <Zap size={13} className={dev.isPriority ? "text-amber-400" : ""} />
                <span>{dev.isPriority ? 'QoS Priority' : 'Normal'}</span>
              </button>

              {/* Pause/Unpause Internet */}
              <button
                onClick={() => onToggleBlockDevice(dev.id)}
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition ${
                  dev.isBlocked
                    ? 'bg-emerald-600 text-white'
                    : 'bg-rose-950/60 text-rose-300 border border-rose-800/60 hover:bg-rose-900/60'
                }`}
              >
                {dev.isBlocked ? (
                  <>
                    <PlayCircle size={14} />
                    <span>{t.resumeInternet}</span>
                  </>
                ) : (
                  <>
                    <PauseCircle size={14} />
                    <span>{t.pauseInternet}</span>
                  </>
                )}
              </button>

            </div>

          </div>
        ))}
      </div>

      {/* Rename Device Modal */}
      {editingDevice && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl text-slate-100 animate-in zoom-in-95 duration-200">
            <h3 className="font-bold text-lg text-white">Rename Device</h3>
            
            <input
              type="text"
              value={renameInput}
              onChange={(e) => setRenameInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setEditingDevice(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleSaveRename}
                className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs shadow-md"
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
