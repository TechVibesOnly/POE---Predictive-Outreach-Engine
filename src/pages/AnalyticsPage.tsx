import React from 'react';
import { motion } from 'motion/react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { 
  TrendingUp, Users, Rocket, Mail, MessageSquare, 
  ArrowUpRight, ArrowDownRight, Copy, ChevronRight
} from 'lucide-react';
import { GlowCard } from '../components/GlowCard';
import { cn } from '../lib/utils';

const data = [
  { name: 'Mon', sent: 400, replies: 24, revenue: 1200 },
  { name: 'Tue', sent: 300, replies: 18, revenue: 900 },
  { name: 'Wed', sent: 600, replies: 42, revenue: 2100 },
  { name: 'Thu', sent: 800, replies: 56, revenue: 2800 },
  { name: 'Fri', sent: 500, replies: 35, revenue: 1750 },
  { name: 'Sat', sent: 200, replies: 12, revenue: 600 },
  { name: 'Sun', sent: 100, replies: 8, revenue: 400 },
];

const campaigns = [
  { name: 'r/SaaS Outreach', sent: 1240, open: '64%', reply: '8.2%' },
  { name: 'LinkedIn Growth', sent: 840, open: '72%', reply: '12.4%' },
  { name: 'Agency Leads', sent: 2100, open: '42%', reply: '3.1%' },
  { name: 'PM Networking', sent: 450, open: '81%', reply: '15.2%' },
];

const discData = [
  { name: 'D', value: 25, color: '#6366F1' },
  { name: 'I', value: 40, color: '#06B6D4' },
  { name: 'S', value: 20, color: '#F59E0B' },
  { name: 'C', value: 15, color: '#22C55E' },
];

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold">Analytics Dashboard</h1>
        <div className="flex bg-white/5 p-1 rounded-xl border border-border-default">
          {['7D', '30D', '90D', 'Custom'].map(r => (
            <button key={r} className={cn("px-4 py-1.5 rounded-lg text-xs font-bold transition-all", r === '30D' ? "bg-white text-black" : "text-white/40 hover:text-white")}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Macro Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <StatCard title="Revenue" value="₹1.2 Cr" trend="+12.4%" up />
        <StatCard title="Paid Users" value="842" trend="+8.2%" up />
        <StatCard title="Campaigns Run" value="147" trend="+4.1%" up />
        <StatCard title="Emails Sent" value="24.8k" trend="-2.4%" up={false} />
        <StatCard title="Avg Reply Rate" value="6.8%" trend="+1.2%" up />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <GlowCard className="lg:col-span-8 p-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-8">Revenue Over Time</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366F1" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlowCard>

        <GlowCard className="lg:col-span-4 p-8 flex flex-col">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-8">Conversion Funnel</h3>
          <div className="flex-1 flex flex-col justify-between py-4">
            {[
              { label: 'Signals Found', value: '12,402', rate: '100%' },
              { label: 'Prospects Added', value: '4,821', rate: '38%' },
              { label: 'Emails Sent', value: '2,482', rate: '51%' },
              { label: 'Opened', value: '1,588', rate: '64%' },
              { label: 'Replied', value: '169', rate: '10.6%' },
            ].map((stage, i) => (
              <div key={i} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">{stage.label}</span>
                  <span className="text-xs font-bold text-indigo-400">{stage.value}</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-indigo-primary to-teal-primary" style={{ width: stage.rate }} />
                </div>
              </div>
            ))}
          </div>
        </GlowCard>
      </div>

      {/* Detail Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlowCard className="p-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-8">Top Campaigns</h3>
          <div className="space-y-6">
            {campaigns.map((c, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>{c.name}</span>
                  <span className="text-indigo-400">{c.reply}</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-primary" style={{ width: c.reply }} />
                </div>
              </div>
            ))}
          </div>
        </GlowCard>

        <GlowCard className="p-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-8">Send Time Heatmap</h3>
          <div className="grid grid-cols-7 gap-1 h-40">
            {Array.from({ length: 7 * 12 }).map((_, i) => (
              <div 
                key={i} 
                className="rounded-sm" 
                style={{ 
                  backgroundColor: `rgba(6, 182, 212, ${Math.random() * 0.8 + 0.1})` 
                }} 
              />
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[8px] text-white/20 font-bold uppercase tracking-widest">
            <span>Mon</span>
            <span>Sun</span>
          </div>
        </GlowCard>

        <GlowCard className="p-8 flex flex-col items-center">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4 w-full text-left">DISC Distribution</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={discData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {discData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 w-full">
            {discData.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[10px] font-bold text-white/60">{item.name} Type</span>
              </div>
            ))}
          </div>
        </GlowCard>
      </div>

      {/* Subject Lines Table */}
      <GlowCard className="p-8 overflow-x-auto">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-8">Top Subject Lines</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border-default text-[10px] font-bold text-white/20 uppercase tracking-widest">
              <th className="pb-4 px-4">Subject Line</th>
              <th className="pb-4 px-4">Sent</th>
              <th className="pb-4 px-4">Open Rate</th>
              <th className="pb-4 px-4">Reply Rate</th>
              <th className="pb-4 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {[
              { s: "Quick question about your post in r/SaaS", sent: 1240, open: '64%', reply: '8.2%' },
              { s: "Loved your insights on LinkedIn today", sent: 840, open: '72%', reply: '12.4%' },
              { s: "Automation idea for your agency", sent: 2100, open: '42%', reply: '3.1%' },
              { s: "Question about your growth strategy", sent: 450, open: '81%', reply: '15.2%' },
            ].map((row, i) => (
              <tr key={i} className="border-b border-border-default hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-medium">{row.s}</td>
                <td className="py-4 px-4 text-white/60">{row.sent}</td>
                <td className="py-4 px-4 text-white/60">{row.open}</td>
                <td className="py-4 px-4">
                  <span className={cn(
                    "font-bold",
                    parseFloat(row.reply) > 10 ? "text-green-400" :
                    parseFloat(row.reply) > 5 ? "text-amber-400" : "text-red-400"
                  )}>{row.reply}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <button className="p-2 text-white/20 hover:text-white transition-colors"><Copy size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlowCard>
    </div>
  );
};

const StatCard = ({ title, value, trend, up }: any) => (
  <GlowCard className="p-6">
    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4">{title}</div>
    <div className="text-2xl font-display font-bold mb-2">{value}</div>
    <div className="flex items-center gap-1 text-[10px] font-bold">
      {up ? <ArrowUpRight size={12} className="text-green-400" /> : <ArrowDownRight size={12} className="text-red-400" />}
      <span className={up ? "text-green-400" : "text-red-400"}>{trend}</span>
    </div>
  </GlowCard>
);
