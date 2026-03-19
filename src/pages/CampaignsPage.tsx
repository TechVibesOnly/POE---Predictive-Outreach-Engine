import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Rocket, MoreVertical, Mail, Linkedin, TrendingUp, Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlowCard } from '../components/GlowCard';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { db, collection, query, where, onSnapshot, orderBy } from '../firebase';

export const CampaignsPage: React.FC = () => {
  const { user } = useAuth();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('All');
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'campaigns'),
      where('ownerId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedCampaigns = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Map Firestore data to UI fields if needed
        date: doc.data().createdAt?.toDate()?.toLocaleDateString() || 'Recently',
        tag: doc.data().type || 'General'
      }));
      setCampaigns(fetchedCampaigns);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const filteredCampaigns = campaigns.filter(c => {
    if (filter === 'All') return true;
    return c.status.toLowerCase() === filter.toLowerCase();
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
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Campaigns</h1>
          <p className="text-white/40">Manage and monitor your automated outreach sequences.</p>
        </div>
        <Link 
          to="/campaigns/new"
          className="px-6 py-3 rounded-xl bg-indigo-primary font-bold flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]"
        >
          <Rocket size={18} />
          New Campaign
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 border-y border-border-default">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          {['All', 'Active', 'Draft', 'Paused', 'Completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap",
                filter === f ? "bg-white text-black" : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <select className="bg-white/5 border border-border-default rounded-lg px-3 py-1.5 text-xs outline-hidden focus:border-indigo-primary">
            <option>Newest First</option>
            <option>Highest Reply Rate</option>
            <option>Most Sent</option>
          </select>
          <div className="flex bg-white/5 rounded-lg p-1 border border-border-default">
            <button 
              onClick={() => setView('grid')}
              className={cn("p-1.5 rounded-md transition-all", view === 'grid' ? "bg-white/10 text-white" : "text-white/40")}
            >
              <TrendingUp size={16} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={cn("p-1.5 rounded-md transition-all", view === 'list' ? "bg-white/10 text-white" : "text-white/40")}
            >
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="masonry-grid">
        {filteredCampaigns.length > 0 ? filteredCampaigns.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="masonry-item"
          >
            <GlowCard className="p-6 group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                    c.status === 'active' ? "bg-green-500/20 text-green-400" :
                    c.status === 'draft' ? "bg-amber-500/20 text-amber-500" :
                    c.status === 'paused' ? "bg-white/10 text-white/40" :
                    "bg-indigo-500/20 text-indigo-400"
                  )}>
                    {c.status}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-white/40 text-[10px] font-bold uppercase flex items-center gap-1">
                    {c.type === 'email' ? <Mail size={10} /> : <Linkedin size={10} />}
                    {c.type}
                  </span>
                </div>
                <button className="p-1 text-white/20 hover:text-white transition-colors">
                  <MoreVertical size={16} />
                </button>
              </div>

              <h3 className="text-xl font-display font-bold mb-2 group-hover:text-indigo-400 transition-colors">{c.name}</h3>
              <p className="text-xs text-white/40 line-clamp-2 mb-6 leading-relaxed">{c.desc || "No description provided."}</p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="space-y-1">
                  <div className="text-xs font-bold">{c.prospectCount || 0}</div>
                  <div className="text-[10px] text-white/20 uppercase tracking-widest">Sent</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-teal-400">{c.openRate || "0%"}</div>
                  <div className="text-[10px] text-white/20 uppercase tracking-widest">Open</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-indigo-400">{c.replyRate ? `${c.replyRate.toFixed(1)}%` : "0%"}</div>
                  <div className="text-[10px] text-white/20 uppercase tracking-widest">Reply</div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-[10px] font-bold text-white/40">
                  <span>Progress: {c.prospectCount || 0}/{c.targetCount || 100}</span>
                  <span>{Math.round(((c.prospectCount || 0) / (c.targetCount || 100)) * 100)}%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-primary transition-all duration-1000" 
                    style={{ width: `${((c.prospectCount || 0) / (c.targetCount || 100)) * 100}%` }} 
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border-default">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-[10px] text-white/20">
                    <Calendar size={10} />
                    {c.date}
                  </div>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-white/40">
                    <Tag size={10} />
                    {c.tag}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  View Analytics →
                </span>
              </div>
            </GlowCard>
          </motion.div>
        )) : (
          <div className="col-span-full py-20 text-center space-y-4">
            <Rocket size={48} className="mx-auto text-white/10" />
            <h3 className="text-xl font-bold">No campaigns found</h3>
            <p className="text-white/40">Try changing your filter or create a new campaign.</p>
          </div>
        )}
      </div>
    </div>
  );
};
