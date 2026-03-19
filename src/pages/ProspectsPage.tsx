import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, Search, Filter, Download, Plus, 
  MoreVertical, Mail, Linkedin, MapPin, 
  Briefcase, ExternalLink, Trash2, UserPlus
} from 'lucide-react';
import { GlowCard } from '../components/GlowCard';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { db, collection, query, where, onSnapshot, orderBy } from '../firebase';

export const ProspectsPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedProspects, setSelectedProspects] = useState<string[]>([]);
  const [prospects, setProspects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'prospects'),
      where('ownerId', '==', user.uid),
      orderBy('name', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedProspects = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        location: doc.data().location || 'Unknown',
        source: doc.data().source || 'Direct'
      }));
      setProspects(fetchedProspects);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const filteredProspects = prospects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    setSelectedProspects(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

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
          <h1 className="text-3xl font-display font-bold mb-2">Prospects</h1>
          <p className="text-white/40">Manage your leads and their outreach status.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 rounded-xl bg-white/5 border border-border-default text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2">
            <Download size={14} /> Export CSV
          </button>
          <button className="px-6 py-2.5 rounded-xl bg-indigo-primary text-xs font-bold hover:bg-indigo-600 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <UserPlus size={14} /> Add Prospect
          </button>
        </div>
      </div>

      <GlowCard className="overflow-hidden">
        <div className="p-4 border-b border-border-default flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
            <input 
              placeholder="Search prospects..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-border-default rounded-lg pl-10 pr-4 py-2 text-sm outline-hidden focus:border-indigo-primary transition-all"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="p-2 rounded-lg bg-white/5 border border-border-default text-white/40 hover:text-white transition-colors">
              <Filter size={18} />
            </button>
            <div className="h-8 w-px bg-border-default mx-2" />
            <span className="text-xs text-white/40 font-bold">{selectedProspects.length} Selected</span>
            {selectedProspects.length > 0 && (
              <button className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors">
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-default bg-white/2">
                <th className="p-4 w-10">
                  <input 
                    type="checkbox" 
                    className="rounded border-white/10 bg-white/5 text-indigo-primary focus:ring-indigo-primary"
                    onChange={(e) => {
                      if (e.target.checked) setSelectedProspects(filteredProspects.map(p => p.id));
                      else setSelectedProspects([]);
                    }}
                  />
                </th>
                <th className="p-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Prospect</th>
                <th className="p-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Company</th>
                <th className="p-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Location</th>
                <th className="p-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Source</th>
                <th className="p-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Status</th>
                <th className="p-4 text-[10px] font-bold text-white/40 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProspects.length > 0 ? filteredProspects.map((p) => (
                <tr key={p.id} className="border-b border-border-default hover:bg-white/2 transition-colors group">
                  <td className="p-4">
                    <input 
                      type="checkbox" 
                      checked={selectedProspects.includes(p.id)}
                      onChange={() => toggleSelect(p.id)}
                      className="rounded border-white/10 bg-white/5 text-indigo-primary focus:ring-indigo-primary"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500/20 to-teal-500/20 flex items-center justify-center text-xs font-bold text-indigo-400">
                        {p.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-bold">{p.name}</div>
                        <div className="text-[10px] text-white/40">{p.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">{p.company}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-xs text-white/40">
                      <MapPin size={12} />
                      {p.location}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-border-default text-[10px] font-bold text-white/60">
                      {p.source}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                      p.status === 'active' || p.status === 'Active' ? "bg-green-500/20 text-green-400" :
                      p.status === 'contacted' || p.status === 'Contacted' ? "bg-indigo-500/20 text-indigo-400" :
                      p.status === 'replied' || p.status === 'Replied' ? "bg-teal-500/20 text-teal-400" :
                      "bg-white/10 text-white/40"
                    )}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors">
                        <Mail size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors">
                        <Linkedin size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors">
                        <MoreVertical size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="p-20 text-center space-y-4">
                    <Users size={48} className="mx-auto text-white/10" />
                    <h3 className="text-xl font-bold">No prospects found</h3>
                    <p className="text-white/40">Try searching for someone else or add a new prospect.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlowCard>
    </div>
  );
};
