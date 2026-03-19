import React from 'react';
import { motion } from 'motion/react';
import { 
  GitBranch, Plus, MoreVertical, Play, 
  Pause, Clock, Mail, Linkedin, Zap,
  TrendingUp, Users, MessageSquare
} from 'lucide-react';
import { GlowCard } from '../components/GlowCard';
import { cn } from '../lib/utils';

export const SequencesPage: React.FC = () => {
  const sequences = [
    { 
      id: 1, 
      name: "SaaS Founder Warm-up", 
      steps: 4, 
      active: true, 
      enrolled: 124, 
      completed: 42, 
      replyRate: "12.4%",
      nodes: [
        { type: 'EMAIL', delay: 'Day 1', title: 'Initial Outreach' },
        { type: 'LINKEDIN', delay: 'Day 3', title: 'Connection Request' },
        { type: 'EMAIL', delay: 'Day 5', title: 'Follow-up #1' },
        { type: 'EMAIL', delay: 'Day 10', title: 'The Break-up' },
      ]
    },
    { 
      id: 2, 
      name: "Agency Growth Sequence", 
      steps: 3, 
      active: false, 
      enrolled: 86, 
      completed: 12, 
      replyRate: "8.2%",
      nodes: [
        { type: 'EMAIL', delay: 'Day 1', title: 'Case Study Share' },
        { type: 'LINKEDIN', delay: 'Day 2', title: 'Profile View' },
        { type: 'EMAIL', delay: 'Day 4', title: 'Meeting Request' },
      ]
    },
    { 
      id: 3, 
      name: "Reddit Lead Nurture", 
      steps: 5, 
      active: true, 
      enrolled: 210, 
      completed: 156, 
      replyRate: "15.1%",
      nodes: [
        { type: 'EMAIL', delay: 'Day 1', title: 'Reddit Context' },
        { type: 'EMAIL', delay: 'Day 3', title: 'Value Add' },
        { type: 'LINKEDIN', delay: 'Day 5', title: 'Connect' },
        { type: 'EMAIL', delay: 'Day 8', title: 'Follow-up' },
        { type: 'EMAIL', delay: 'Day 14', title: 'Final Check' },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Sequences</h1>
          <p className="text-white/40">Build multi-channel automated outreach flows.</p>
        </div>
        <button className="px-6 py-3 rounded-xl bg-indigo-primary font-bold flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]">
          <Plus size={18} />
          Create Sequence
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {sequences.map((seq) => (
          <GlowCard key={seq.id} className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/3 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-primary/10 flex items-center justify-center text-indigo-400">
                      <GitBranch size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold">{seq.name}</h3>
                      <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{seq.steps} Steps</div>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-white/5 text-white/40 transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-border-default">
                    <div className="text-[10px] font-bold text-white/40 uppercase mb-1">Enrolled</div>
                    <div className="text-lg font-display font-bold">{seq.enrolled}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-border-default">
                    <div className="text-[10px] font-bold text-white/40 uppercase mb-1">Replies</div>
                    <div className="text-lg font-display font-bold text-teal-400">{seq.replyRate}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-border-default">
                    <div className="text-[10px] font-bold text-white/40 uppercase mb-1">Active</div>
                    <div className="mt-1">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        seq.active ? "bg-green-500 animate-pulse" : "bg-white/20"
                      )} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className={cn(
                    "flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all",
                    seq.active ? "bg-white/5 text-white/40 hover:bg-white/10" : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                  )}>
                    {seq.active ? <Pause size={14} /> : <Play size={14} />}
                    {seq.active ? "Pause" : "Resume"}
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-white/5 text-white/40 hover:text-white transition-all text-xs font-bold">
                    Edit Flow
                  </button>
                </div>
              </div>

              <div className="flex-1 relative">
                <div className="absolute left-6 top-0 bottom-0 w-px bg-border-default hidden lg:block" />
                <div className="space-y-4 lg:pl-12">
                  {seq.nodes.map((node, i) => (
                    <div key={i} className="relative flex items-center gap-4 group">
                      <div className="absolute -left-12 w-8 h-8 rounded-full bg-bg-surface border border-border-default flex items-center justify-center z-10 hidden lg:flex">
                        <span className="text-[10px] font-bold text-white/40">{i + 1}</span>
                      </div>
                      <div className="flex-1 p-4 rounded-xl bg-white/5 border border-border-default hover:border-indigo-primary/50 transition-all flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center",
                            node.type === 'EMAIL' ? "bg-indigo-500/20 text-indigo-400" : "bg-teal-500/20 text-teal-400"
                          )}>
                            {node.type === 'EMAIL' ? <Mail size={14} /> : <Linkedin size={14} />}
                          </div>
                          <div>
                            <div className="text-sm font-bold">{node.title}</div>
                            <div className="text-[10px] text-white/40 flex items-center gap-1">
                              <Clock size={10} /> {node.delay}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-[10px] font-bold text-white/40 uppercase">Open Rate</div>
                            <div className="text-xs font-bold">42%</div>
                          </div>
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-3 border-2 border-dashed border-border-default rounded-xl text-white/20 hover:text-white/40 hover:border-white/20 transition-all flex items-center justify-center gap-2 text-xs font-bold">
                    <Plus size={14} /> Add Step
                  </button>
                </div>
              </div>
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  );
};
