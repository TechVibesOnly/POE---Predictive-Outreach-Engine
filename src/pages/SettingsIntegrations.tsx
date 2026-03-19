import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, Database, Rocket, MessageSquare, 
  Linkedin, Zap, Shield, Copy, RefreshCw,
  ExternalLink, CheckCircle2, Plus, Beaker
} from 'lucide-react';
import { GlowCard } from '../components/GlowCard';
import { cn } from '../lib/utils';
import { seedDatabase } from '../services/seedService';
import { useAuth } from '../context/AuthContext';

export const SettingsIntegrations: React.FC = () => {
  const { user } = useAuth();
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSeed = async () => {
    if (!user) return;
    setIsSeeding(true);
    setSeedStatus('loading');
    try {
      await seedDatabase(user.uid);
      setSeedStatus('success');
      setTimeout(() => setSeedStatus('idle'), 3000);
    } catch (error) {
      console.error('Seeding failed:', error);
      setSeedStatus('error');
    } finally {
      setIsSeeding(false);
    }
  };
  const integrations = [
    { name: "SendGrid", cat: "Email", status: "Connected", desc: "Official API for high-deliverability cold emails.", logo: "https://cdn.worldvectorlogo.com/logos/sendgrid.svg" },
    { name: "Mailgun", cat: "Email", status: "Available", desc: "Powerful transactional email service for developers.", logo: "https://cdn.worldvectorlogo.com/logos/mailgun.svg" },
    { name: "AWS SES", cat: "Email", status: "Available", desc: "Cost-effective, flexible, and scalable email service.", logo: "https://cdn.worldvectorlogo.com/logos/aws-ses.svg" },
    
    { name: "HubSpot", cat: "CRM", status: "Connected", desc: "Sync prospects and outreach activity automatically.", logo: "https://cdn.worldvectorlogo.com/logos/hubspot.svg" },
    { name: "Salesforce", cat: "CRM", status: "Available", desc: "Enterprise-grade CRM integration for large teams.", logo: "https://cdn.worldvectorlogo.com/logos/salesforce-2.svg" },
    { name: "Zoho CRM", cat: "CRM", status: "Available", desc: "Streamline your sales process with Zoho sync.", logo: "https://cdn.worldvectorlogo.com/logos/zoho-1.svg" },
    
    { name: "Zapier", cat: "Automation", status: "Available", desc: "Connect POE to 5,000+ apps without code.", logo: "https://cdn.worldvectorlogo.com/logos/zapier.svg" },
    { name: "Make.com", cat: "Automation", status: "Available", desc: "Design complex workflows with a visual builder.", logo: "https://cdn.worldvectorlogo.com/logos/make-2.svg" },
    { name: "n8n", cat: "Automation", status: "Available", desc: "Self-hosted workflow automation for power users.", logo: "https://cdn.worldvectorlogo.com/logos/n8n.svg" },
    
    { name: "LinkedIn", cat: "Social", status: "Connected", desc: "Official API for safe, automated LinkedIn DMs.", logo: "https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg" },
    { name: "PhantomBuster", cat: "Social", status: "Available", desc: "Extract data and automate LinkedIn actions.", logo: "https://cdn.worldvectorlogo.com/logos/phantombuster.svg" },
    { name: "WhatsApp", cat: "Comms", status: "Coming Soon", desc: "Official WhatsApp Business API integration.", logo: "https://cdn.worldvectorlogo.com/logos/whatsapp-icon.svg" },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Integrations</h1>
        <p className="text-white/40">Connect your stack to supercharge your outreach intelligence.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((item, i) => (
          <GlowCard key={i} className="p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/5 p-2 flex items-center justify-center">
                <img src={item.logo} alt={item.name} className="w-full h-full object-contain grayscale brightness-200" referrerPolicy="no-referrer" />
              </div>
              <span className={cn(
                "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest",
                item.status === 'Connected' ? "bg-green-500/20 text-green-400" :
                item.status === 'Coming Soon' ? "bg-amber-500/20 text-amber-500" :
                "bg-white/10 text-white/40"
              )}>
                {item.status}
              </span>
            </div>
            
            <div className="flex-1 space-y-2 mb-6">
              <div className="flex items-center gap-2">
                <h3 className="font-bold">{item.name}</h3>
                <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{item.cat}</span>
              </div>
              <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
            </div>

            <button className={cn(
              "w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2",
              item.status === 'Connected' ? "bg-white/5 text-white/60 hover:bg-white/10" :
              item.status === 'Coming Soon' ? "bg-white/5 text-white/20 cursor-not-allowed" :
              "bg-indigo-primary text-white hover:bg-indigo-600"
            )}>
              {item.status === 'Connected' ? "Disconnect" : item.status === 'Coming Soon' ? "Notify Me" : "Connect"}
            </button>
          </GlowCard>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold">Development Tools</h2>
          <button 
            onClick={handleSeed}
            disabled={isSeeding}
            className={cn(
              "px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
              seedStatus === 'success' ? "bg-green-500/20 text-green-400 border border-green-500/30" :
              seedStatus === 'error' ? "bg-red-500/20 text-red-400 border border-red-500/30" :
              "bg-white/5 border border-border-default text-white/60 hover:bg-white/10"
            )}
          >
            {isSeeding ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : seedStatus === 'success' ? (
              <CheckCircle2 size={14} />
            ) : (
              <Beaker size={14} />
            )}
            {isSeeding ? "Seeding Database..." : seedStatus === 'success' ? "Database Seeded" : "Seed Sample Data"}
          </button>
        </div>
        <p className="text-sm text-white/40 max-w-2xl">
          Populate your account with sample campaigns, prospects, and signals to test the ₹8,300 Crore vision.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-display font-bold">API Access</h2>
        <GlowCard className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Your API Key</label>
                <div className="relative">
                  <input 
                    readOnly 
                    value="pk_live_••••••••••••••AB3F" 
                    className="w-full bg-white/5 border border-border-default rounded-xl px-4 py-3 text-sm font-mono outline-hidden"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/40 hover:text-white">
                      <Copy size={14} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/40 hover:text-white">
                      <RefreshCw size={14} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="px-6 py-2.5 rounded-xl bg-white/5 border border-border-default text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                  <ExternalLink size={14} /> View API Docs
                </button>
                <button className="px-6 py-2.5 rounded-xl bg-white/5 border border-border-default text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                  <Shield size={14} /> Security Settings
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-border-default flex flex-col justify-between">
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Calls Today</div>
                <div className="text-2xl font-display font-bold">1,242</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-border-default flex flex-col justify-between">
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Calls Month</div>
                <div className="text-2xl font-display font-bold">42.8k</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-border-default flex flex-col justify-between">
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Rate Limit</div>
                <div className="text-2xl font-display font-bold">100/s</div>
              </div>
            </div>
          </div>
        </GlowCard>
      </div>
    </div>
  );
};
