import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Linkedin, MessageSquare, Zap, 
  BarChart3, Check, Copy, Edit3, Save, Plus,
  ChevronRight, ArrowRight, Info
} from 'lucide-react';
import { GlowCard } from '../components/GlowCard';
import { cn } from '../lib/utils';

export const AIGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState('email-a');

  const statuses = [
    "Analyzing 847 similar campaigns...",
    "Crafting opening hook...",
    "Personalizing with signal data...",
    "Done!"
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    setOutput("");
    
    let step = 0;
    const interval = setInterval(() => {
      setStatus(statuses[step]);
      setProgress((step + 1) * 25);
      step++;
      if (step >= statuses.length) {
        clearInterval(interval);
        startStreaming();
      }
    }, 800);
  };

  const startStreaming = () => {
    const text = `Hey Arjun! I saw your post in r/SaaS about looking for a way to automate cold DMs. 

I'm building POE, which does exactly that by mining Reddit signals. Given you're working on a CRM for small agencies, I thought you'd find our intent scoring particularly useful.

Would you be open to a quick 5-min chat next week?`;
    
    let i = 0;
    const interval = setInterval(() => {
      setOutput(prev => prev + text[i]);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 15);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-120px)]">
      {/* Panel 1: Input */}
      <div className="lg:col-span-4 bg-bg-surface border border-border-default rounded-2xl overflow-y-auto p-6 space-y-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
            <Sparkles className="text-indigo-primary" size={18} />
          </div>
          <h2 className="text-lg font-display font-bold">Prospect Intelligence</h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Prospect Data</h3>
            <div className="relative">
              <input placeholder="LinkedIn URL" className="w-full bg-white/5 border border-border-default rounded-xl pl-4 pr-20 py-3 text-sm outline-hidden focus:border-indigo-primary" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-indigo-primary text-[10px] font-bold">Analyze</button>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border-default"></div></div>
              <span className="relative bg-bg-surface px-4 text-[10px] text-white/20 font-bold uppercase tracking-widest">or</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Name" className="bg-white/5 border border-border-default rounded-xl px-4 py-3 text-sm outline-hidden focus:border-indigo-primary" />
              <input placeholder="Company" className="bg-white/5 border border-border-default rounded-xl px-4 py-3 text-sm outline-hidden focus:border-indigo-primary" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Signal Context</h3>
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" id="auto-load" className="accent-indigo-primary" defaultChecked />
              <label htmlFor="auto-load" className="text-xs text-white/60">Auto-load from Signals feed</label>
            </div>
            <textarea placeholder="Paste a Reddit thread or post context..." className="w-full h-24 bg-white/5 border border-border-default rounded-xl px-4 py-3 text-sm outline-hidden focus:border-indigo-primary resize-none" />
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Your Offer</h3>
            <textarea placeholder="Your product/service in 2-3 sentences..." className="w-full h-24 bg-white/5 border border-border-default rounded-xl px-4 py-3 text-sm outline-hidden focus:border-indigo-primary resize-none" />
            <div className="grid grid-cols-2 gap-3">
              <select className="bg-white/5 border border-border-default rounded-xl px-4 py-3 text-sm outline-hidden focus:border-indigo-primary">
                <option>Professional</option>
                <option>Casual</option>
                <option>Bold</option>
              </select>
              <select className="bg-white/5 border border-border-default rounded-xl px-4 py-3 text-sm outline-hidden focus:border-indigo-primary">
                <option>Cold Email</option>
                <option>LinkedIn DM</option>
              </select>
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full h-14 rounded-xl bg-linear-to-r from-indigo-primary to-teal-primary font-bold flex items-center justify-center gap-2 relative overflow-hidden group"
          >
            {isGenerating ? (
              <div className="absolute inset-0 bg-white/10 transition-all duration-300" style={{ width: `${progress}%` }} />
            ) : null}
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles size={18} />
              {isGenerating ? "Generating..." : "Generate Personalized Message"}
            </span>
          </button>
        </div>
      </div>

      {/* Panel 2: Intelligence */}
      <div className="lg:col-span-3 bg-bg-elevated border border-border-default rounded-2xl p-6 space-y-8 overflow-y-auto">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
            <Zap className="text-teal-primary" size={18} />
          </div>
          <h2 className="text-lg font-display font-bold">Persona Intelligence</h2>
        </div>

        {output ? (
          <div className="space-y-6 animate-in fade-in duration-700">
            <GlowCard className="p-6 border-indigo-primary/30">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-primary/50 flex items-center justify-center text-3xl font-display font-bold text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                  I
                </div>
                <div>
                  <div className="text-sm font-bold">Influencer Type</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest">DISC Profile</div>
                </div>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Prefers enthusiastic, personal communication. Focus on social proof and shared community values.
              </p>
            </GlowCard>

            <div className="space-y-4">
              <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Intent Score</h3>
              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                    <motion.circle 
                      cx="50" cy="50" r="45" fill="none" stroke="#22C55E" strokeWidth="8" 
                      strokeDasharray="283"
                      initial={{ strokeDashoffset: 283 }}
                      animate={{ strokeDashoffset: 283 - (283 * 0.84) }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-display font-bold">84</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-green-400">High Purchase Intent</div>
                  <div className="text-[10px] text-white/40">Based on recent Reddit activity</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Pain Points</h3>
              <div className="flex flex-wrap gap-2">
                {['Client acquisition', 'Manual outreach', 'Tool fragmentation'].map(p => (
                  <span key={p} className="px-2 py-1 rounded-full bg-white/5 border border-border-default text-[10px] font-bold text-white/60">{p}</span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-20">
            <BarChart3 size={48} className="mb-4" />
            <p className="text-sm">Intelligence will populate after generation</p>
          </div>
        )}
      </div>

      {/* Panel 3: Output */}
      <div className="lg:col-span-5 flex flex-col space-y-4">
        <div className="flex bg-white/5 p-1 rounded-xl border border-border-default">
          {['email-a', 'email-b', 'linkedin'].map(t => (
            <button 
              key={t}
              onClick={() => setActiveTab(t)}
              className={cn(
                "flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-all",
                activeTab === t ? "bg-white text-black" : "text-white/40 hover:text-white"
              )}
            >
              {t.replace('-', ' ')}
            </button>
          ))}
        </div>

        <GlowCard className="flex-1 p-8 flex flex-col relative">
          {isGenerating && (
            <div className="absolute top-4 right-4 flex items-center gap-2 text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              {status}
            </div>
          )}

          <div className="flex-1 space-y-6">
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Subject Line</div>
              <div className="text-sm font-bold pb-2 border-b border-border-default">
                {output ? "Quick question about your post in r/SaaS" : ""}
              </div>
            </div>

            <div className="text-sm text-white/80 leading-relaxed font-mono whitespace-pre-wrap">
              {output}
              {isGenerating && <span className="inline-block w-2 h-4 bg-indigo-primary ml-1 animate-pulse" />}
            </div>
          </div>

          {output && (
            <div className="pt-6 border-t border-border-default flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-[10px] font-bold text-white/40 hover:text-white transition-colors">
                  <Copy size={14} /> Copy
                </button>
                <button className="flex items-center gap-2 text-[10px] font-bold text-white/40 hover:text-white transition-colors">
                  <Edit3 size={14} /> Edit
                </button>
                <button className="flex items-center gap-2 text-[10px] font-bold text-white/40 hover:text-white transition-colors">
                  <Save size={14} /> Save Template
                </button>
              </div>
              <div className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-[10px] font-bold">96% Personalized</div>
            </div>
          )}
        </GlowCard>

        {output && (
          <div className="flex gap-2">
            {['Try different tone', 'Make shorter', 'More aggressive', 'Add urgency'].map(opt => (
              <button key={opt} className="px-3 py-1.5 rounded-full bg-white/5 border border-border-default text-[10px] font-bold text-white/40 hover:text-white hover:border-white/20 transition-all">
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
