import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, MessageSquare, Linkedin, Globe, 
  TrendingUp, RefreshCw, Filter, Search,
  ArrowUpRight, MessageCircle, Save, Send
} from 'lucide-react';
import { GlowCard } from '../components/GlowCard';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { db, collection, query, where, onSnapshot, orderBy, limit } from '../firebase';

export const SignalsFeed: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('All');
  const [signals, setSignals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [minIntent, setMinIntent] = useState(0);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'signals'),
      where('ownerId', '==', user.uid),
      orderBy('timestamp', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedSignals = snapshot.docs.map(doc => {
        const data = doc.data();
        const timestamp = data.timestamp?.toDate();
        const timeAgo = timestamp ? getTimeAgo(timestamp) : 'Recently';
        
        return {
          id: doc.id,
          ...data,
          time: timeAgo,
          tags: data.tags || [],
          intent: data.intentScore || 0,
          sub: data.subreddit || data.source || 'General'
        };
      });
      setSignals(fetchedSignals);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
  };

  const filteredSignals = signals.filter(s => {
    const matchesTab = activeTab === 'All' || s.source.toLowerCase() === activeTab.toLowerCase();
    const matchesIntent = s.intent >= minIntent;
    return matchesTab && matchesIntent;
  });

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-primary border-t-transparent animate-spin rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-display font-bold">Signal Intelligence Feed</h1>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Live Pulse</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs text-white/40">Last updated 30s ago</div>
          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
            <RefreshCw size={16} className="text-white/60" />
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 glass-effect rounded-2xl">
        <div className="flex bg-white/5 p-1 rounded-xl border border-border-default w-full md:w-auto">
          {['All', 'Reddit', 'LinkedIn', 'News'].map(t => (
            <button 
              key={t}
              onClick={() => setActiveTab(t)}
              className={cn(
                "px-6 py-2 rounded-lg text-xs font-bold transition-all",
                activeTab === t ? "bg-white text-black" : "text-white/40 hover:text-white"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-8 w-full md:w-auto">
          <div className="flex-1 md:w-48 space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-white/40 uppercase tracking-widest">
              <span>Min Intent</span>
              <span>{minIntent}+</span>
            </div>
            <input 
              type="range" 
              min="0"
              max="100"
              value={minIntent}
              onChange={(e) => setMinIntent(parseInt(e.target.value))}
              className="w-full accent-indigo-primary h-1 bg-white/10 rounded-full appearance-none cursor-pointer" 
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-white/40" />
            <select className="bg-transparent text-xs font-bold outline-hidden">
              <option>Latest</option>
              <option>Highest Intent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="masonry-grid">
        {filteredSignals.length > 0 ? filteredSignals.map((signal, i) => (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="masonry-item"
          >
            <GlowCard className="p-6 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                    signal.source.toLowerCase() === 'reddit' ? "bg-orange-500/20 text-orange-400" :
                    signal.source.toLowerCase() === 'linkedin' ? "bg-blue-500/20 text-blue-400" :
                    "bg-white/10 text-white/40"
                  )}>
                    {signal.source}
                  </span>
                  <span className="text-[10px] font-bold text-white/40">{signal.sub}</span>
                </div>
                <span className="text-[10px] text-white/20">{signal.time}</span>
              </div>

              <h3 className="text-lg font-display font-bold mb-3 line-clamp-2 leading-tight group-hover:text-indigo-400 transition-colors">
                {signal.title || signal.content?.substring(0, 50) + '...'}
              </h3>
              
              <p className="text-xs text-white/60 mb-6 leading-relaxed">
                {(signal.content || signal.snippet || '').split(' ').map((word: string, j: number) => (
                  <span key={j} className={cn(word.toLowerCase().includes('personalize') || word.toLowerCase().includes('automate') ? "bg-amber-500/20 text-amber-400 underline decoration-amber-500/50 underline-offset-4" : "")}>
                    {word}{' '}
                  </span>
                ))}
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-white/40">Intent Score</span>
                  <span className={cn(
                    signal.intent > 80 ? "text-green-400" : "text-amber-400"
                  )}>{Math.round(signal.intent)}</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full transition-all duration-1000", signal.intent > 80 ? "bg-green-500" : "bg-amber-500")}
                    style={{ width: `${signal.intent}%` }} 
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {signal.tags.map((tag: string) => (
                  <span key={tag} className="px-2 py-1 rounded-full bg-white/5 border border-border-default text-[9px] font-bold text-white/40">{tag}</span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border-default">
                <div className="flex items-center gap-4 text-[10px] text-white/40">
                  <span className="font-bold text-white/60">{signal.author}</span>
                  <span className="flex items-center gap-1"><TrendingUp size={10} /> {signal.upvotes || 0}</span>
                  <span className="flex items-center gap-1"><MessageCircle size={10} /> {signal.comments || 0}</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                    <Save size={14} className="text-white/40" />
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-indigo-primary text-[10px] font-bold flex items-center gap-2 hover:bg-indigo-600 transition-all">
                    Outreach <Send size={12} />
                  </button>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        )) : (
          <div className="col-span-full py-20 text-center space-y-4">
            <Zap size={48} className="mx-auto text-white/10" />
            <h3 className="text-xl font-bold">No signals found</h3>
            <p className="text-white/40">Try adjusting your filters or wait for new signals to arrive.</p>
          </div>
        )}
      </div>
    </div>
  );
};
