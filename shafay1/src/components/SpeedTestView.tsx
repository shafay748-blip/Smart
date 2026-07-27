import React, { useState } from 'react';
import { 
  Gauge, 
  Download, 
  Upload, 
  Zap, 
  RotateCw, 
  CheckCircle2, 
  Server, 
  Award,
  Globe
} from 'lucide-react';
import { SpeedTestResult, Language } from '../types';
import { translations } from '../i18n/translations';

interface SpeedTestViewProps {
  speedHistory: SpeedTestResult[];
  packageSpeed: number;
  language: Language;
  onAddTestResult: (result: SpeedTestResult) => void;
}

export const SpeedTestView: React.FC<SpeedTestViewProps> = ({
  speedHistory,
  packageSpeed,
  language,
  onAddTestResult,
}) => {
  const t = translations[language];

  const [isRunning, setIsRunning] = useState(false);
  const [stage, setStage] = useState<'idle' | 'ping' | 'download' | 'upload' | 'complete'>('idle');
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);
  const [results, setResults] = useState<Partial<SpeedTestResult>>({
    pingMs: 0,
    jitterMs: 0,
    downloadMbps: 0,
    uploadMbps: 0,
  });

  const runSpeedTest = async () => {
    setIsRunning(true);
    setStage('ping');
    setCurrentSpeed(0);

    // Step 1: Ping
    await new Promise(r => setTimeout(r, 1000));
    const ping = Math.floor(8 + Math.random() * 6);
    const jitter = Math.floor(1 + Math.random() * 3);
    setResults(prev => ({ ...prev, pingMs: ping, jitterMs: jitter }));

    // Step 2: Download Test Simulation
    setStage('download');
    for (let i = 10; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 150));
      const simulatedDl = +(packageSpeed * (i / 100) * (0.9 + Math.random() * 0.15)).toFixed(1);
      setCurrentSpeed(simulatedDl);
    }
    const finalDl = +(packageSpeed * (0.95 + Math.random() * 0.08)).toFixed(1);
    setResults(prev => ({ ...prev, downloadMbps: finalDl }));

    // Step 3: Upload Test Simulation
    setStage('upload');
    for (let i = 10; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 150));
      const simulatedUl = +(packageSpeed * 0.8 * (i / 100) * (0.9 + Math.random() * 0.15)).toFixed(1);
      setCurrentSpeed(simulatedUl);
    }
    const finalUl = +(packageSpeed * 0.85 * (0.92 + Math.random() * 0.08)).toFixed(1);
    setResults(prev => ({ ...prev, uploadMbps: finalUl }));

    // Complete
    setStage('complete');
    setIsRunning(false);

    const newResult: SpeedTestResult = {
      id: `st-${Date.now()}`,
      timestamp: 'Just now',
      downloadMbps: finalDl,
      uploadMbps: finalUl,
      pingMs: ping,
      jitterMs: jitter,
      server: 'SmartWiFi Fiber Node #04 (Lahore)',
      rating: 'Excellent',
    };

    onAddTestResult(newResult);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-[#18181B] p-6 rounded-2xl border border-[#27272A] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Gauge size={18} />
            </span>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              {t.speedtest}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {t.speedTestTitle}
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Test real-time download Mbps, upload Mbps, ping latency, and connection stability.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-[#27272A] border border-[#3F3F46] text-zinc-300 text-xs flex items-center gap-2">
          <Server size={18} className="text-blue-400" />
          <div>
            <span className="text-zinc-500 block text-[10px]">Test Server</span>
            <span className="font-bold text-white">SmartWiFi Fiber Node #04</span>
          </div>
        </div>
      </div>

      {/* Main Gauge & Test Runner Box */}
      <div className="p-8 rounded-2xl bg-[#18181B] border border-[#27272A] flex flex-col items-center justify-center space-y-8 relative overflow-hidden">
        
        {/* Speedometer Gauge Dial Display */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          
          {/* Animated Outer Ring */}
          <div className={`absolute inset-0 rounded-full border-4 ${
            isRunning ? 'border-blue-500 animate-spin border-t-transparent' : 'border-[#27272A]'
          }`} />

          {/* Central Digital Speed Number */}
          <div className="text-center z-10 space-y-1">
            <span className="text-xs uppercase font-bold text-zinc-400 tracking-wider block">
              {stage === 'ping' && t.testingPing}
              {stage === 'download' && t.testingDownload}
              {stage === 'upload' && t.testingUpload}
              {stage === 'complete' && t.testComplete}
              {stage === 'idle' && 'Ready To Test'}
            </span>

            <div className="text-5xl sm:text-6xl font-black text-white font-mono tracking-tight">
              {stage === 'idle' ? packageSpeed : currentSpeed || results.downloadMbps || 0}
            </div>

            <span className="text-sm font-bold text-blue-400 uppercase tracking-widest block">
              Mbps
            </span>
          </div>

        </div>

        {/* Action Run Button */}
        <button
          onClick={runSpeedTest}
          disabled={isRunning}
          className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm transition transform active:scale-95 disabled:opacity-50 flex items-center gap-3"
        >
          <RotateCw size={18} className={isRunning ? "animate-spin" : ""} />
          <span>{isRunning ? 'Testing In Progress...' : t.runTest}</span>
        </button>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl text-center">
          
          <div className="p-4 rounded-xl bg-[#27272A]/60 border border-[#3F3F46]">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Ping Latency</span>
            <span className="text-xl font-mono font-bold text-emerald-400">
              {results.pingMs ? `${results.pingMs} ms` : '--'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#27272A]/60 border border-[#3F3F46]">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Jitter</span>
            <span className="text-xl font-mono font-bold text-amber-400">
              {results.jitterMs ? `${results.jitterMs} ms` : '--'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#27272A]/60 border border-[#3F3F46]">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Download</span>
            <span className="text-xl font-mono font-bold text-blue-400">
              {results.downloadMbps ? `${results.downloadMbps} Mbps` : '--'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#27272A]/60 border border-[#3F3F46]">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Upload</span>
            <span className="text-xl font-mono font-bold text-blue-400">
              {results.uploadMbps ? `${results.uploadMbps} Mbps` : '--'}
            </span>
          </div>

        </div>

      </div>

      {/* Past Speed Test History */}
      <div className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-4">
        <h3 className="font-bold text-white text-lg">Speed Test History Log</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-[#27272A] uppercase text-[10px] font-bold text-zinc-400 tracking-wider">
              <tr>
                <th className="p-3 rounded-l-xl">Date & Time</th>
                <th className="p-3">Download</th>
                <th className="p-3">Upload</th>
                <th className="p-3">Ping</th>
                <th className="p-3 rounded-r-xl">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A]">
              {speedHistory.map((res) => (
                <tr key={res.id} className="hover:bg-[#27272A]/40 transition">
                  <td className="p-3 font-medium text-zinc-200">{res.timestamp}</td>
                  <td className="p-3 font-mono font-bold text-blue-400">{res.downloadMbps} Mbps</td>
                  <td className="p-3 font-mono font-bold text-blue-400">{res.uploadMbps} Mbps</td>
                  <td className="p-3 font-mono text-emerald-400">{res.pingMs} ms</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 font-bold text-[10px] border border-emerald-800/50">
                      {res.rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
