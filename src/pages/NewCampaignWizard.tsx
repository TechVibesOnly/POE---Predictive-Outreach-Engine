import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, ChevronRight, Rocket, Mail, Linkedin, MessageSquare, 
  Upload, Users, Plus, Sparkles, Calendar, Shield, Info, Clock, GitBranch
} from 'lucide-react';
import { GlowCard } from '../components/GlowCard';
import { cn } from '../lib/utils';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db, collection, addDoc, serverTimestamp } from '../firebase';

const steps = [
  { id: 1, label: "Target" },
  { id: 2, label: "Prospects" },
  { id: 3, label: "Message" },
  { id: 4, label: "Launch" },
];

export const NewCampaignWizard: React.FC = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLaunching, setIsLaunching] = useState(false);
  const navigate = useNavigate();

  const [campaignData, setCampaignData] = useState({
    name: '',
    type: 'email',
    industry: 'SaaS',
    subreddits: ['r/forhire', 'r/startups', 'r/saas'],
    tone: 'Professional',
    prospects: [] as any[],
    messageDescription: '',
    painPoints: '',
    useContext: true,
    schedule: 'POE'
  });

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleLaunch = async () => {
    if (!user) return;
    
    setIsLaunching(true);
    try {
      // Save to Firestore
      await addDoc(collection(db, 'campaigns'), {
        ...campaignData,
        ownerId: user.uid,
        status: 'active',
        createdAt: serverTimestamp(),
        prospectCount: campaignData.prospects.length || 247, // Mocking some count if empty
        targetCount: 500,
        openRate: 0,
        replyRate: 0
      });

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366F1', '#06B6D4', '#F59E0B']
      });

      setTimeout(() => {
        navigate('/campaigns');
      }, 2000);
    } catch (error) {
      console.error("Error launching campaign:", error);
      setIsLaunching(false);
    }
  };

  const updateData = (data: Partial<typeof campaignData>) => {
    setCampaignData(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Progress Indicator */}
      <div className="relative flex items-center justify-between px-12">
        <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-white/5 -translate-y-1/2 -z-10" />
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center gap-2">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
              currentStep === step.id ? "bg-indigo-primary border-indigo-primary shadow-[0_0_15px_rgba(99,102,241,0.5)]" :
              currentStep > step.id ? "bg-indigo-primary border-indigo-primary" :
              "bg-bg-deep border-white/10"
            )}>
              {currentStep > step.id ? <Check size={18} /> : <span className="text-sm font-bold">{step.id}</span>}
            </div>
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-widest transition-colors",
              currentStep >= step.id ? "text-white" : "text-white/20"
            )}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {currentStep === 1 && <Step1 data={campaignData} update={updateData} />}
          {currentStep === 2 && <Step2 data={campaignData} update={updateData} />}
          {currentStep === 3 && <Step3 data={campaignData} update={updateData} />}
          {currentStep === 4 && <Step4 data={campaignData} update={updateData} />}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between pt-8 border-t border-border-default">
        <button 
          onClick={handleBack}
          disabled={currentStep === 1}
          className="px-6 py-2 rounded-lg text-sm font-bold text-white/40 hover:text-white disabled:opacity-0 transition-all"
        >
          Back
        </button>
        {currentStep < 4 ? (
          <button 
            onClick={handleNext}
            className="px-8 py-3 rounded-xl bg-indigo-primary font-bold flex items-center gap-2 hover:bg-indigo-600 transition-all"
          >
            Continue <ChevronRight size={18} />
          </button>
        ) : (
          <button 
            onClick={handleLaunch}
            disabled={isLaunching}
            className="px-12 py-4 rounded-xl bg-linear-to-r from-indigo-primary to-teal-primary font-bold flex items-center gap-2 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all disabled:opacity-50"
          >
            {isLaunching ? "Queuing 247 personalized emails..." : "🚀 Launch Campaign"}
          </button>
        )}
      </div>
    </div>
  );
};

const Step1 = ({ data, update }: any) => (
  <div className="space-y-8">
    <div className="text-center space-y-2">
      <h2 className="text-3xl font-display font-bold">Define Your Target</h2>
      <p className="text-white/40">Tell us who you want to reach and how.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Campaign Name</label>
          <input 
            placeholder="e.g., Q1 SaaS Founders Outreach" 
            value={data.name}
            onChange={(e) => update({ name: e.target.value })}
            className="w-full bg-white/5 border border-border-default rounded-xl px-4 py-3 outline-hidden focus:border-indigo-primary" 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Outreach Type</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Mail, label: "Email", id: 'email' },
              { icon: Linkedin, label: "LinkedIn DM", id: 'linkedin' },
              { icon: MessageSquare, label: "WhatsApp", id: 'whatsapp' },
              { icon: Rocket, label: "Sequence", id: 'sequence' },
            ].map((type) => (
              <button 
                key={type.label} 
                onClick={() => update({ type: type.id })}
                className={cn(
                  "p-4 rounded-xl border flex flex-col items-center gap-2 transition-all",
                  data.type === type.id ? "border-indigo-primary bg-indigo-primary/10" : "border-border-default bg-white/5 hover:border-white/20"
                )}
              >
                <type.icon size={20} className={cn(data.type === type.id ? "text-indigo-400" : "text-white/20")} />
                <span className="text-xs font-bold">{type.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Target Industry</label>
          <select 
            value={data.industry}
            onChange={(e) => update({ industry: e.target.value })}
            className="w-full bg-white/5 border border-border-default rounded-xl px-4 py-3 outline-hidden focus:border-indigo-primary"
          >
            <option>SaaS</option>
            <option>Agencies</option>
            <option>E-commerce</option>
            <option>Fintech</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Target Subreddits</label>
          <div className="flex flex-wrap gap-2 p-3 border border-border-default rounded-xl bg-white/5">
            {data.subreddits.map((tag: string) => (
              <span key={tag} className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-400 text-[10px] font-bold flex items-center gap-1">
                {tag} <X size={10} className="cursor-pointer" onClick={() => update({ subreddits: data.subreddits.filter((s: string) => s !== tag) })} />
              </span>
            ))}
            <input 
              placeholder="Add subreddit..." 
              className="bg-transparent outline-hidden text-xs flex-1 min-w-[100px]" 
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = (e.target as HTMLInputElement).value;
                  if (val && !data.subreddits.includes(val)) {
                    update({ subreddits: [...data.subreddits, val] });
                    (e.target as HTMLInputElement).value = '';
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Tone</label>
          <div className="flex gap-2">
            {['Professional', 'Casual', 'Bold', 'Empathetic'].map(tone => (
              <button 
                key={tone} 
                onClick={() => update({ tone })}
                className={cn(
                  "flex-1 py-2 rounded-lg border text-[10px] font-bold transition-all",
                  data.tone === tone ? "border-indigo-primary bg-indigo-primary/10 text-indigo-400" : "border-border-default bg-white/5 text-white/40 hover:text-white"
                )}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Step2 = ({ data, update }: any) => {
  const [tab, setTab] = useState('signals');
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-display font-bold">Add Your Prospects</h2>
        <p className="text-white/40">{data.prospects.length} prospects added so far.</p>
      </div>

      <div className="flex bg-white/5 p-1 rounded-xl border border-border-default max-w-md mx-auto">
        {['csv', 'signals', 'manual'].map(t => (
          <button 
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-all",
              tab === t ? "bg-white text-black" : "text-white/40 hover:text-white"
            )}
          >
            {t === 'csv' ? 'Upload CSV' : t === 'signals' ? 'From Signals' : 'Add Manually'}
          </button>
        ))}
      </div>

      <GlowCard className="p-12 border-dashed border-2">
        {tab === 'csv' && (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <Upload className="text-indigo-primary" size={32} />
            </div>
            <div>
              <p className="font-bold">Drop your CSV here</p>
              <p className="text-sm text-white/40">or click to browse files</p>
            </div>
          </div>
        )}
        {tab === 'signals' && (
          <div className="space-y-4">
            {[
              { id: 1, name: 'u/founder_guy', source: 'r/SaaS', intent: 94 },
              { id: 2, name: 'u/startup_gal', source: 'r/startups', intent: 88 },
              { id: 3, name: 'u/tech_lead', source: 'r/forhire', intent: 91 }
            ].map(p => (
              <div key={p.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-border-default">
                <div className="flex items-center gap-4">
                  <input 
                    type="checkbox" 
                    className="accent-indigo-primary" 
                    checked={data.prospects.some((pr: any) => pr.id === p.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        update({ prospects: [...data.prospects, p] });
                      } else {
                        update({ prospects: data.prospects.filter((pr: any) => pr.id !== p.id) });
                      }
                    }}
                  />
                  <div>
                    <div className="text-sm font-bold">{p.name}</div>
                    <div className="text-[10px] text-white/40">{p.source} • Intent: {p.intent}%</div>
                  </div>
                </div>
                <div className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase">High Intent</div>
              </div>
            ))}
          </div>
        )}
        {tab === 'manual' && (
          <div className="grid grid-cols-2 gap-4">
            <input id="manual-name" placeholder="Full Name" className="bg-white/5 border border-border-default rounded-xl px-4 py-3 outline-hidden focus:border-indigo-primary" />
            <input id="manual-email" placeholder="Email Address" className="bg-white/5 border border-border-default rounded-xl px-4 py-3 outline-hidden focus:border-indigo-primary" />
            <input id="manual-company" placeholder="Company" className="col-span-2 bg-white/5 border border-border-default rounded-xl px-4 py-3 outline-hidden focus:border-indigo-primary" />
            <button 
              onClick={() => {
                const name = (document.getElementById('manual-name') as HTMLInputElement).value;
                const email = (document.getElementById('manual-email') as HTMLInputElement).value;
                const company = (document.getElementById('manual-company') as HTMLInputElement).value;
                if (name && email) {
                  update({ prospects: [...data.prospects, { id: Date.now(), name, email, company, source: 'manual', intent: 100 }] });
                  (document.getElementById('manual-name') as HTMLInputElement).value = '';
                  (document.getElementById('manual-email') as HTMLInputElement).value = '';
                  (document.getElementById('manual-company') as HTMLInputElement).value = '';
                }
              }}
              className="col-span-2 py-3 rounded-xl bg-white/5 border border-border-default font-bold flex items-center justify-center gap-2"
            >
              <Plus size={18} /> Add Prospect
            </button>
          </div>
        )}
      </GlowCard>
    </div>
  );
};

const Step3 = ({ data, update }: any) => {
  const [isGenerated, setIsGenerated] = useState(false);
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-display font-bold">Generate Your Message</h2>
        <p className="text-white/40">Let AI craft the perfect opening hook.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Describe your product</label>
            <textarea 
              placeholder="e.g., A predictive outreach engine for Indian solopreneurs..." 
              value={data.messageDescription}
              onChange={(e) => update({ messageDescription: e.target.value })}
              className="w-full h-32 bg-white/5 border border-border-default rounded-xl px-4 py-3 outline-hidden focus:border-indigo-primary resize-none" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">What pain does it solve?</label>
            <textarea 
              placeholder="e.g., Low reply rates and manual prospecting time..." 
              value={data.painPoints}
              onChange={(e) => update({ painPoints: e.target.value })}
              className="w-full h-24 bg-white/5 border border-border-default rounded-xl px-4 py-3 outline-hidden focus:border-indigo-primary resize-none" 
            />
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="context" 
              className="accent-indigo-primary" 
              checked={data.useContext}
              onChange={(e) => update({ useContext: e.target.checked })}
            />
            <label htmlFor="context" className="text-sm text-white/60">Use Reddit signal context if available</label>
          </div>
          <button 
            onClick={() => setIsGenerated(true)}
            className="w-full py-4 rounded-xl bg-indigo-primary font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all"
          >
            <Sparkles size={18} /> Generate Variants
          </button>
        </div>

        <div className="space-y-4">
          {isGenerated ? (
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 'A', score: 94 },
                { id: 'B', score: 88 }
              ].map(variant => (
                <GlowCard key={variant.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/40">Variant {variant.id}</span>
                    <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-[10px] font-bold">Personalization: {variant.score}%</span>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm font-bold">Subject: Quick question about your post in r/SaaS</div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      Hey there! I saw your post in r/SaaS about looking for a way to automate cold DMs...
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <button className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Edit Message</button>
                    <input type="radio" name="winner" className="accent-indigo-primary" />
                  </div>
                </GlowCard>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 border border-border-default rounded-2xl bg-white/5">
              <Sparkles className="text-white/10 mb-4" size={48} />
              <p className="text-white/20">Variants will appear here after generation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Step4 = ({ data, update }: any) => (
  <div className="space-y-8">
    <div className="text-center space-y-2">
      <h2 className="text-3xl font-display font-bold">Schedule & Launch</h2>
      <p className="text-white/40">Review your campaign and set it live.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <GlowCard className="p-8 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Campaign Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Name</span>
              <span className="font-bold">{data.name || 'Untitled Campaign'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Prospects</span>
              <span className="font-bold">{data.prospects.length || 247}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Type</span>
              <span className="font-bold capitalize">{data.type}</span>
            </div>
          </div>
        </GlowCard>

        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Schedule Options</h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: 'now', icon: Rocket, label: "Send Now", sub: "Immediate delivery" },
              { id: 'schedule', icon: Calendar, label: "Schedule for...", sub: "Pick date & time" },
              { id: 'POE', icon: Sparkles, label: "Let POE decide", sub: "AI optimized timing" },
            ].map((opt) => (
              <button 
                key={opt.label} 
                onClick={() => update({ schedule: opt.id })}
                className={cn(
                  "p-4 rounded-xl border flex items-center gap-4 transition-all",
                  data.schedule === opt.id ? "border-indigo-primary bg-indigo-500/5" : "border-border-default bg-white/5 hover:border-white/20"
                )}
              >
                <opt.icon className={data.schedule === opt.id ? "text-indigo-400" : "text-white/20"} size={20} />
                <div className="text-left">
                  <div className="text-sm font-bold">{opt.label}</div>
                  <div className="text-[10px] text-white/40">{opt.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-primary/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GitBranch className="text-indigo-400" size={20} />
            <div>
              <div className="text-sm font-bold">Add follow-up sequence?</div>
              <div className="text-[10px] text-indigo-400/60 font-bold uppercase tracking-widest">Recommended</div>
            </div>
          </div>
          <div className="w-10 h-5 rounded-full bg-indigo-primary relative p-1">
            <div className="w-3 h-3 rounded-full bg-white ml-auto" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Confirmation Checklist</h3>
          <div className="space-y-3">
            {[
              "Email deliverability check passed",
              "Unsubscribe link included",
              "SPF/DKIM configured",
              "Sending from: arjun@poe.ai"
            ].map(item => (
              <div key={item} className="flex items-center gap-3 text-sm text-white/60">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check size={12} className="text-green-400" />
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const X = ({ size, className, onClick }: any) => (
  <svg 
    onClick={onClick}
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
