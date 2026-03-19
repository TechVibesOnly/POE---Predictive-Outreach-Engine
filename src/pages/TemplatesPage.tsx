import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, Plus, Search, Filter, 
  MoreVertical, Copy, Edit3, Trash2,
  Mail, Linkedin, MessageSquare, Tag
} from 'lucide-react';
import { GlowCard } from '../components/GlowCard';
import { cn } from '../lib/utils';

export const TemplatesPage: React.FC = () => {
  const [category, setCategory] = useState('All');
  
  const templates = [
    { id: 1, name: "Reddit Context Warm-up", type: "EMAIL", cat: "Outreach", usage: 1242, rating: 4.8, body: "Hi {{first_name}}, I saw your post in r/{{subreddit}} about {{topic}}..." },
    { id: 2, name: "LinkedIn Connection Request", type: "LINKEDIN", cat: "Networking", usage: 842, rating: 4.5, body: "Hi {{first_name}}, noticed your profile through the Bangalore tech ecosystem..." },
    { id: 3, name: "The 'Value-First' Follow-up", type: "EMAIL", cat: "Follow-up", usage: 532, rating: 4.9, body: "Hey {{first_name}}, I was just reading this article on {{topic}} and thought of you..." },
    { id: 4, name: "Break-up Email", type: "EMAIL", cat: "Closing", usage: 321, rating: 4.2, body: "Hi {{first_name}}, I haven't heard back so I'm assuming {{pain_point}} isn't a priority..." },
    { id: 5, name: "WhatsApp Business Intro", type: "WHATSAPP", cat: "Outreach", usage: 156, rating: 4.6, body: "Hello {{first_name}}, Arjun here from POE. I'm reaching out because..." },
    { id: 6, name: "Case Study Share", type: "EMAIL", cat: "Nurture", usage: 442, rating: 4.7, body: "Hi {{first_name}}, we recently helped a company in {{industry}} achieve {{result}}..." },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Templates</h1>
          <p className="text-white/40">Save and reuse your best performing outreach messages.</p>
        </div>
        <button className="px-6 py-3 rounded-xl bg-indigo-primary font-bold flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]">
          <Plus size={18} />
          New Template
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 border-y border-border-default">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          {['All', 'Outreach', 'Follow-up', 'Networking', 'Closing', 'Nurture'].map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap",
                category === c ? "bg-white text-black" : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              {c}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
          <input 
            placeholder="Search templates..." 
            className="w-full bg-white/5 border border-border-default rounded-lg pl-9 pr-4 py-1.5 text-xs outline-hidden focus:border-indigo-primary transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((t) => (
          <GlowCard key={t.id} className="p-6 flex flex-col group">
            <div className="flex items-center justify-between mb-4">
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                t.type === 'EMAIL' ? "bg-indigo-500/20 text-indigo-400" :
                t.type === 'LINKEDIN' ? "bg-teal-500/20 text-teal-400" :
                "bg-green-500/20 text-green-400"
              )}>
                {t.type === 'EMAIL' ? <Mail size={14} /> : 
                 t.type === 'LINKEDIN' ? <Linkedin size={14} /> : 
                 <MessageSquare size={14} />}
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/20 hover:text-white transition-colors">
                  <Edit3 size={14} />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/20 hover:text-white transition-colors">
                  <Copy size={14} />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/20 hover:text-white transition-colors">
                  <MoreVertical size={14} />
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h3 className="font-bold group-hover:text-indigo-400 transition-colors">{t.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{t.cat}</span>
                  <span className="text-white/10">•</span>
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{t.usage} Uses</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-border-default text-xs text-white/60 line-clamp-3 font-mono leading-relaxed italic">
                "{t.body}"
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border-default flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Tag size={12} className="text-white/20" />
                <span className="text-[10px] font-bold text-white/40 uppercase">AI Optimized</span>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <span className="text-xs font-bold">{t.rating}</span>
                <span className="text-[10px]">★</span>
              </div>
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  );
};
