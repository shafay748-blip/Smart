import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Upload, 
  Zap, 
  Clock, 
  Smartphone, 
  TrendingUp, 
  ShieldAlert,
  Calendar
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { DailyUsage, ConnectedDevice, Language } from '../types';
import { translations } from '../i18n/translations';

interface UsageAnalyticsViewProps {
  dailyUsage: DailyUsage[];
  devices: ConnectedDevice[];
  language: Language;
}

export const UsageAnalyticsView: React.FC<UsageAnalyticsViewProps> = ({
  dailyUsage,
  devices,
  language,
}) => {
  const t = translations[language];

  const [timeframe, setTimeframe] = useState<'week' | 'month'>('week');

  const totalDownloadGB = (dailyUsage || []).reduce((acc, curr) => acc + curr.downloadGB, 0).toFixed(1);
  const totalUploadGB = (dailyUsage || []).reduce((acc, curr) => acc + curr.uploadGB, 0).toFixed(1);
  const grandTotalGB = (+totalDownloadGB + +totalUploadGB).toFixed(1);

  // Data for Download vs Upload Pie
  const ratioData = [
    { name: 'Download', value: +totalDownloadGB, color: '#06b6d4' }, // cyan-500
    { name: 'Upload', value: +totalUploadGB, color: '#3b82f6' },   // blue-500
  ];

  // Hourly Peak Traffic Simulation Data
  const hourlyData = [
    { hour: '08:00', mbps: 45 },
    { hour: '10:00', mbps: 82 },
    { hour: '12:00', mbps: 110 },
    { hour: '14:00', mbps: 95 },
    { hour: '16:00', mbps: 140 },
    { hour: '18:00', mbps: 198 },
    { hour: '20:00', mbps: 248 }, // Peak
    { hour: '22:00', mbps: 235 },
    { hour: '00:00', mbps: 120 },
  ];

  // Sort devices by total data today
  const sortedDevices = [...devices].sort((a, b) => b.totalDataTodayGB - a.totalDataTodayGB);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-[#18181B] p-6 rounded-2xl border border-[#27272A] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <BarChart3 size={18} />
            </span>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              {t.usage}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Broadband Consumption & Analytics
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Real-time insights into your fiber bandwidth, peak hours, and device data allocation.
          </p>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-2 bg-[#27272A] p-1.5 rounded-xl border border-[#3F3F46] shrink-0">
          <button
            onClick={() => setTimeframe('week')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition ${
              timeframe === 'week' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setTimeframe('month')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition ${
              timeframe === 'month' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      {/* 3 Summary Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-2xl bg-[#18181B] border border-[#27272A] flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Downloaded</span>
            <h3 className="text-2xl font-black text-blue-400 font-mono mt-1">{totalDownloadGB} <span className="text-sm font-normal text-zinc-400">GB</span></h3>
            <p className="text-[11px] text-zinc-500 mt-1">84% of total traffic</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Download size={22} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#18181B] border border-[#27272A] flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Uploaded</span>
            <h3 className="text-2xl font-black text-blue-400 font-mono mt-1">{totalUploadGB} <span className="text-sm font-normal text-zinc-400">GB</span></h3>
            <p className="text-[11px] text-zinc-500 mt-1">16% of total traffic</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Upload size={22} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#18181B] border border-[#27272A] flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Peak Bandwidth Speed</span>
            <h3 className="text-2xl font-black text-emerald-400 font-mono mt-1">251 <span className="text-sm font-normal text-zinc-400">Mbps</span></h3>
            <p className="text-[11px] text-zinc-500 mt-1">Saturday @ 20:15 PM</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
            <TrendingUp size={22} />
          </div>
        </div>

      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Daily Download & Upload Bar Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-base">{t.dailyDataUsage}</h3>
              <p className="text-xs text-zinc-400">Download vs Upload GB per day</p>
            </div>
            <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
              Total: {grandTotalGB} GB
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyUsage} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" stroke="#71717a" fontSize={12} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181B', borderColor: '#27272A', borderRadius: '12px', color: '#E4E4E7' }}
                  formatter={(val: any) => [`${val} GB`, 'Data']}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="downloadGB" name="Download (GB)" fill="#2563eb" radius={[6, 6, 0, 0]} />
                <Bar dataKey="uploadGB" name="Upload (GB)" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Ratio Pie Chart */}
        <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-bold text-white text-base">{t.downloadVsUpload}</h3>
            <p className="text-xs text-zinc-400">Overall traffic breakdown</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ratioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {ratioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#2563eb' : '#60a5fa'} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181B', borderColor: '#27272A', borderRadius: '12px', color: '#E4E4E7' }}
                  formatter={(val: any) => [`${val} GB`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 border-t border-[#27272A] pt-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600" />
                <span className="text-zinc-300">Download</span>
              </div>
              <span className="font-mono font-bold text-blue-400">{totalDownloadGB} GB</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-400" />
                <span className="text-zinc-300">Upload</span>
              </div>
              <span className="font-mono font-bold text-blue-400">{totalUploadGB} GB</span>
            </div>
          </div>
        </div>

      </div>

      {/* Hourly Peak Speed Curve & Top Consuming Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Peak Hours Line Chart */}
        <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-4">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-amber-400" />
            <h3 className="font-bold text-white text-base">{t.peakHoursAnalysis}</h3>
          </div>
          <p className="text-xs text-zinc-400">Peak bandwidth usage occurs between 08:00 PM and 10:00 PM.</p>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMbps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" stroke="#71717a" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181B', borderColor: '#27272A', borderRadius: '12px', color: '#E4E4E7' }}
                  formatter={(val: any) => [`${val} Mbps`, 'Speed']}
                />
                <Area type="monotone" dataKey="mbps" stroke="#f59e0b" fillOpacity={1} fill="url(#colorMbps)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Data Consuming Devices */}
        <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-4">
          <div className="flex items-center gap-2">
            <Smartphone size={18} className="text-blue-400" />
            <h3 className="font-bold text-white text-base">{t.topConsumingDevices}</h3>
          </div>
          <p className="text-xs text-zinc-400">Devices sorted by today's total data usage</p>

          <div className="space-y-3 pt-1">
            {sortedDevices.slice(0, 4).map((dev, idx) => (
              <div key={dev.id} className="p-3 rounded-xl bg-[#27272A]/50 border border-[#3F3F46] space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold text-white">
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#3F3F46] text-zinc-300 text-[10px] flex items-center justify-center font-mono">
                      #{idx + 1}
                    </span>
                    {dev.name}
                  </span>
                  <span className="font-mono text-blue-400">{dev.totalDataTodayGB} GB</span>
                </div>
                
                <div className="w-full bg-[#27272A] h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full" 
                    style={{ width: `${Math.min(100, (dev.totalDataTodayGB / 34) * 100)}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
