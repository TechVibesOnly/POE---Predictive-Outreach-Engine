import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, Rocket, Users, Zap, Wand2, GitBranch, 
  FileText, BarChart2, Settings, Bell, Search, HelpCircle,
  TrendingUp, ArrowUpRight, MessageSquare, Clock, Plus
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { GlowCard } from '../components/GlowCard';
import { cn } from '../lib/utils';

import { useAuth } from '../context/AuthContext';
import { 
  db, 
  collection, 
  query, 
  where, 
  onSnapshot, 
  orderBy, 
  limit 
} from '../firebase';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { user, logout } = useAuth();
  const [signalCount, setSignalCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    
    // Listen for high-intent signals count for the badge
    const q = query(
      collection(db, 'signals'),
      where('ownerId', '==', user.uid),
      where('intentScore', '>=', 80)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSignalCount(snapshot.size);
    });
    
    return () => unsubscribe();
  }, [user]);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Rocket, label: "Campaigns", path: "/campaigns" },
    { icon: Users, label: "Prospects", path: "/prospects" },
    { icon: Zap, label: "Signals", path: "/signals", badge: signalCount > 0 ? signalCount.toString() : undefined },
    { icon: Wand2, label: "Generator", path: "/generator", gradient: true },
    { icon: GitBranch, label: "Sequences", path: "/sequences" },
    { icon: FileText, label: "Templates", path: "/templates" },
    { icon: BarChart2, label: "Analytics", path: "/analytics" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-bg-deep flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 bottom-0 z-40 w-64 bg-bg-surface backdrop-blur-2xl border-r border-border-default transition-transform duration-300 lg:translate-x-0",
        !isSidebarOpen && "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-linear-to-br from-indigo-primary to-teal-primary rounded-lg flex items-center justify-center font-bold">P</div>
            <span className="text-xl font-display font-bold tracking-tight">POE</span>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all group",
                  location.pathname === item.path 
                    ? "bg-indigo-primary/10 text-indigo-400" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} className={cn(item.gradient && "text-teal-primary")} />
                  {item.label}
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-white/40 uppercase tracking-widest">
                <span>Credits</span>
                <span>842 / 2,000</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[42%] bg-linear-to-r from-indigo-primary to-teal-primary" />
              </div>
            </div>

            <button 
              onClick={logout}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-border-default hover:bg-white/10 transition-all w-full text-left"
            >
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-teal-500 overflow-hidden">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-white">
                    {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold truncate">{user?.displayName || 'User'}</div>
                <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Pro Plan</div>
              </div>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* TopNav */}
        <header className="h-16 border-b border-border-default bg-bg-deep/50 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
          <h2 className="text-lg font-display font-bold capitalize">
            {location.pathname.split('/').pop() || 'Dashboard'}
          </h2>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indigo-primary transition-colors" size={16} />
              <input 
                placeholder="Search anything... (Cmd+K)" 
                className="w-full bg-white/5 border border-border-default rounded-full pl-10 pr-4 py-2 text-sm outline-hidden focus:border-indigo-primary transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/campaigns/new"
              className="hidden md:flex px-4 py-2 rounded-xl bg-indigo-primary text-xs font-bold items-center gap-2 hover:bg-indigo-600 transition-all shadow-[0_0_15px_rgba(99,102,241,0.2)]"
            >
              <Plus size={14} /> New Campaign
            </Link>
            <div className="h-6 w-px bg-border-default mx-2 hidden md:block" />
            <button className="p-2 text-white/40 hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-bg-deep" />
            </button>
            <button className="p-2 text-white/40 hover:text-white transition-colors">
              <HelpCircle size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-white/10 border border-border-default cursor-pointer overflow-hidden">
              {user?.photoURL && <img src={user.photoURL} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />}
            </div>
          </div>
        </header>

        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};

export const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    emailsSent: 0,
    replyRate: 0,
    activeCampaigns: 0,
    newSignals: 0,
    highIntentSignals: 0
  });
  const [recentCampaigns, setRecentCampaigns] = useState<any[]>([]);
  const [recentSignals, setRecentSignals] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    // Fetch stats
    const campaignsQuery = query(collection(db, 'campaigns'), where('ownerId', '==', user.uid));
    const unsubscribeCampaigns = onSnapshot(campaignsQuery, (snapshot) => {
      const active = snapshot.docs.filter(doc => doc.data().status === 'active').length;
      setStats(prev => ({ ...prev, activeCampaigns: active }));
      
      const recent = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a: any, b: any) => {
          const dateA = a.createdAt?.toMillis?.() || 0;
          const dateB = b.createdAt?.toMillis?.() || 0;
          return dateB - dateA;
        })
        .slice(0, 4);
      setRecentCampaigns(recent);
    });

    const signalsQuery = query(
      collection(db, 'signals'), 
      where('ownerId', '==', user.uid),
      orderBy('timestamp', 'desc'),
      limit(20)
    );
    const unsubscribeSignals = onSnapshot(signalsQuery, (snapshot) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todaySignals = snapshot.docs.filter(doc => {
        const ts = doc.data().timestamp?.toDate();
        return ts && ts >= today;
      });
      
      const highIntent = todaySignals.filter(doc => doc.data().intentScore >= 80).length;
      
      setStats(prev => ({ 
        ...prev, 
        newSignals: todaySignals.length,
        highIntentSignals: highIntent
      }));
      
      setRecentSignals(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).slice(0, 8));
    });

    // Mocking email stats for now as we don't have a real email sending service yet
    setStats(prev => ({ ...prev, emailsSent: 247, replyRate: 6.8 }));

    return () => {
      unsubscribeCampaigns();
      unsubscribeSignals();
    };
  }, [user]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Command Center</h1>
          <p className="text-white/40">Good morning, {user?.displayName?.split(' ')[0] || 'Founder'}. 🌟 Your campaigns are performing 2.3x better than last week.</p>
        </div>
        <Link 
          to="/generator"
          className="px-6 py-3 rounded-xl bg-linear-to-r from-indigo-primary to-teal-primary text-sm font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
        >
          <Wand2 size={18} />
          AI Generator
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Emails Sent Today" 
          value={stats.emailsSent.toString()} 
          sub="+18% vs yesterday" 
          trend="up" 
        />
        <MetricCard 
          title="Reply Rate" 
          value={`${stats.replyRate}%`} 
          sub="Industry avg: 1.2%" 
          color="text-teal-400"
        />
        <MetricCard 
          title="Active Campaigns" 
          value={stats.activeCampaigns.toString()} 
          sub="Real-time tracking" 
        />
        <MetricCard 
          title="New Signals Today" 
          value={stats.newSignals.toString()} 
          sub={`${stats.highIntentSignals} high-intent (score > 80)`} 
          pulse 
        />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Recent Campaigns</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentCampaigns.length > 0 ? recentCampaigns.map((campaign, i) => (
              <GlowCard key={campaign.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                    campaign.status === 'active' ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white/40"
                  )}>
                    {campaign.status}
                  </span>
                  <Rocket size={14} className="text-white/20" />
                </div>
                <h4 className="font-bold mb-2">{campaign.name}</h4>
                <div className="flex items-center gap-4 text-xs text-white/40">
                  <span>✉ {campaign.prospectCount || 0} sent</span>
                  <span>💬 {Math.round((campaign.prospectCount || 0) * (campaign.replyRate || 0) / 100)} replies</span>
                </div>
              </GlowCard>
            )) : (
              <div className="col-span-2 p-12 rounded-2xl bg-white/5 border border-dashed border-border-default flex flex-col items-center justify-center text-center space-y-4">
                <Rocket size={32} className="text-white/10" />
                <p className="text-white/40">No active campaigns yet.</p>
                <Link to="/campaigns/new" className="text-indigo-400 font-bold hover:underline">Create your first campaign</Link>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Signal Pulse Feed</h3>
          <GlowCard className="p-4 h-[400px] overflow-y-auto space-y-4">
            {recentSignals.length > 0 ? recentSignals.map((signal, i) => (
              <div key={signal.id} className="p-3 rounded-lg bg-white/5 border border-border-default flex gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className={cn(
                  "w-8 h-8 rounded flex items-center justify-center shrink-0",
                  signal.source === 'reddit' ? "bg-red-500/20" : "bg-blue-500/20"
                )}>
                  {signal.source === 'reddit' ? <Zap size={14} className="text-red-500" /> : <MessageSquare size={14} className="text-blue-500" />}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">{signal.author} in {signal.source}</div>
                  <p className="text-[10px] text-white/40 line-clamp-1">{signal.content}</p>
                  <div className="text-[9px] text-indigo-400 font-bold mt-1">Score: {Math.round(signal.intentScore)}</div>
                </div>
              </div>
            )) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-2 opacity-20">
                <Zap size={24} />
                <p className="text-xs">Waiting for signals...</p>
              </div>
            )}
          </GlowCard>
        </div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlowCard className="p-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">Top Performing Subject Lines</h3>
          <div className="space-y-4">
            {[
              { text: "Quick question about your post in r/SaaS", rate: "12.4%", winner: true },
              { text: "Loved your insights on LinkedIn today", rate: "9.8%", winner: false },
              { text: "Automation idea for your agency", rate: "8.2%", winner: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-white/20">#{i+1}</span>
                  <span className="text-sm">{item.text}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-teal-400">{item.rate}</span>
                  {item.winner && <div className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-500 text-[8px] font-bold uppercase">Winner</div>}
                </div>
              </div>
            ))}
          </div>
        </GlowCard>

        <GlowCard className="p-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">Outreach Activity Heatmap</h3>
          <div className="grid grid-cols-24 gap-1 h-32">
            {Array.from({ length: 24 * 7 }).map((_, i) => (
              <div 
                key={i} 
                className="rounded-sm" 
                style={{ 
                  backgroundColor: `rgba(99, 102, 241, ${Math.random() * 0.8 + 0.1})` 
                }} 
              />
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] text-white/20 font-bold uppercase tracking-widest">
            <span>Mon</span>
            <span>Sun</span>
          </div>
        </GlowCard>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, sub, trend, color = "text-white", pulse = false }: any) => (
  <GlowCard className="p-6">
    <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center justify-between">
      {title}
      {pulse && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
    </div>
    <div className={cn("text-3xl font-display font-bold mb-2", color)}>{value}</div>
    <div className="flex items-center gap-1 text-xs">
      {trend === 'up' && <ArrowUpRight size={12} className="text-green-400" />}
      <span className={cn(trend === 'up' ? "text-green-400" : "text-white/40")}>{sub}</span>
    </div>
  </GlowCard>
);
