import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Rocket, Zap, Users, Shield, BarChart3, ArrowRight, Star, Check, X, Mail, Linkedin, Twitter, MessageSquare } from 'lucide-react';
import { GlowCard } from '../components/GlowCard';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <IntelligenceStack />
      <LiveDemoWidget />
      <ComparisonTable />
      <PricingSection />
      <Testimonials />
      <Footer />
    </div>
  );
};

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass-effect border-b-0 bg-transparent">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-linear-to-br from-indigo-primary to-teal-primary rounded-lg flex items-center justify-center font-bold">P</div>
      <span className="text-xl font-display font-bold tracking-tight">POE</span>
    </div>
    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
      <a href="#features" className="hover:text-white transition-colors">Features</a>
      <a href="#demo" className="hover:text-white transition-colors">Demo</a>
      <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
    </div>
    <div className="flex items-center gap-4">
      <Link to="/login" className="text-sm font-medium hover:text-white transition-colors">Login</Link>
      <Link to="/signup" className="px-5 py-2 rounded-full bg-linear-to-r from-indigo-primary to-teal-primary text-sm font-bold hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all scale-100 hover:scale-105 active:scale-95">
        Start Free
      </Link>
    </div>
  </nav>
);

const HeroSection = () => (
  <section className="relative h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl"
    >
      <h1 className="text-6xl md:text-8xl font-display font-bold leading-tight tracking-tighter mb-6">
        Stop Sending Emails.<br />
        Start Starting <span className="text-gradient-indigo-teal">Conversations.</span>
      </h1>
      <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto mb-10">
        POE mines Reddit threads, LinkedIn signals, and real-time buying intent to craft hyper-personalized outreach that converts. 4x output. 1/4 the cost.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        <Link to="/signup" className="w-full sm:w-auto px-8 py-4 rounded-full bg-linear-to-r from-indigo-primary to-teal-primary text-lg font-bold hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all">
          Start Free — 50 Emails/Month
        </Link>
        <button className="w-full sm:w-auto px-8 py-4 rounded-full border border-border-default text-white/60 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2">
          Watch 90-second Demo <ArrowRight size={18} />
        </button>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex -space-x-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="w-10 h-10 rounded-full border-2 border-bg-deep bg-linear-to-br from-indigo-500/20 to-teal-500/20 flex items-center justify-center overflow-hidden">
              <img src={`https://picsum.photos/seed/user${i}/40/40`} alt="User" referrerPolicy="no-referrer" />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm text-white/40">
          <div className="flex text-amber-primary">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
          </div>
          <span>Trusted by 847+ solopreneurs in beta (4.9/5)</span>
        </div>
      </div>
    </motion.div>

    {/* Floating Signal Card Preview */}
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-10 right-10 hidden lg:block"
    >
      <GlowCard className="w-80 p-5 border-indigo-primary/30">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded bg-red-500/20 flex items-center justify-center">
            <MessageSquare size={12} className="text-red-500" />
          </div>
          <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Reddit Signal</span>
        </div>
        <p className="text-sm text-white/80 mb-4 italic">"Anyone know a tool that automates cold DMs based on subreddit activity?"</p>
        <div className="h-px bg-border-default mb-4" />
        <div className="space-y-2">
          <div className="h-2 w-full bg-indigo-primary/20 rounded animate-pulse" />
          <div className="h-2 w-3/4 bg-teal-primary/20 rounded animate-pulse" />
          <div className="h-2 w-1/2 bg-indigo-primary/20 rounded animate-pulse" />
        </div>
      </GlowCard>
    </motion.div>
  </section>
);

const StatsBar = () => {
  const stats = [
    { value: "6.8%", label: "Average Reply Rate", sub: "industry avg: 1.2%", color: "text-indigo-400" },
    { value: "4 min", label: "To Generate 100 Emails", sub: "fully personalized", color: "text-teal-400" },
    { value: "₹999/mo", label: "Starting Price", sub: "billed annually", color: "text-amber-400" },
    { value: "82%", label: "Gross Margin", sub: "efficiency score", color: "text-green-400" },
  ];

  return (
    <div className="w-full bg-bg-elevated border-y border-border-default py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className={cn("text-4xl font-display font-bold mb-1", stat.color)}>{stat.value}</div>
            <div className="text-sm font-bold text-white/80">{stat.label}</div>
            <div className="text-xs text-white/40">{stat.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const IntelligenceStack = () => {
  const layers = [
    { num: "01", title: "Signal Harvesting", desc: "Real-time monitoring of subreddits and LinkedIn for high-intent keywords.", icon: Zap, color: "rgba(99, 102, 241, 0.15)" },
    { num: "02", title: "Intent Scoring", desc: "AI ranks prospects based on urgency, pain point depth, and budget signals.", icon: BarChart3, color: "rgba(6, 182, 212, 0.15)" },
    { num: "03", title: "Persona Mapping", desc: "Psychographic profiling to match your voice to the prospect's DISC type.", icon: Users, color: "rgba(168, 85, 247, 0.15)" },
    { num: "04", title: "Message Synthesis", desc: "Hyper-personalized drafting that references specific context from the signal.", icon: Rocket, color: "rgba(245, 158, 11, 0.15)" },
    { num: "05", title: "Autonomous A/B", desc: "Self-optimizing sequences that learn which hooks land best for each niche.", icon: Shield, color: "rgba(34, 197, 94, 0.15)" },
  ];

  return (
    <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">The Intelligence Stack</h2>
        <p className="text-white/60 text-lg">Five layers of AI that turn cold prospects into warm conversations</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {layers.map((layer, i) => (
          <GlowCard key={i} accentColor={layer.color} className="p-8 flex flex-col h-full">
            <div className="text-6xl font-display font-bold text-white/5 mb-4">{layer.num}</div>
            <layer.icon className="mb-6 text-indigo-primary" size={32} />
            <h3 className="text-xl font-bold mb-3">{layer.title}</h3>
            <p className="text-sm text-white/50 leading-relaxed">{layer.desc}</p>
          </GlowCard>
        ))}
      </div>
    </section>
  );
};

const LiveDemoWidget = () => {
  const [input, setInput] = useState("");
  const [product, setProduct] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    if (!input || !product) return;
    setIsGenerating(true);
    setOutput("");
    
    const text = `Hey there! I saw your post in r/SaaS about looking for a way to automate cold outreach. 

I'm building POE, which does exactly that by mining Reddit signals. Given you're working on ${product}, I thought you'd find our intent scoring particularly useful.

Would you be open to a quick 5-min chat next week?`;
    
    let i = 0;
    const interval = setInterval(() => {
      setOutput(prev => prev + text[i]);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 20);
  };

  return (
    <section id="demo" className="py-32 px-6 bg-bg-elevated/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-display font-bold mb-6">See the Magic in Action</h2>
            <p className="text-white/60 mb-8">Paste a Reddit thread or LinkedIn profile and see how POE crafts a hyper-personalized message in seconds.</p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Signal Source</label>
                <input 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="reddit.com/r/SaaS/comments/..." 
                  className="w-full bg-bg-deep border border-border-default rounded-xl px-4 py-3 focus:border-indigo-primary outline-hidden transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Your Product</label>
                <input 
                  value={product}
                  onChange={e => setProduct(e.target.value)}
                  placeholder="A CRM for small agencies" 
                  className="w-full bg-bg-deep border border-border-default rounded-xl px-4 py-3 focus:border-indigo-primary outline-hidden transition-all"
                />
              </div>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !input || !product}
                className="w-full py-4 rounded-xl bg-indigo-primary font-bold hover:bg-indigo-600 transition-all disabled:opacity-50"
              >
                {isGenerating ? "Generating..." : "Generate Sample Email"}
              </button>
            </div>
          </div>

          <GlowCard className="h-[400px] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                <div className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase">Persona: I</div>
                <div className="px-2 py-1 rounded bg-teal-500/20 text-teal-400 text-[10px] font-bold uppercase">Intent: 94%</div>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            </div>
            
            <div className="flex-1 font-mono text-sm text-white/80 overflow-y-auto whitespace-pre-wrap">
              {output || (
                <div className="text-white/20 italic">Output will appear here...</div>
              )}
            </div>
            
            <div className="mt-6 pt-4 border-t border-border-default flex items-center justify-between">
              <span className="text-[10px] text-white/20 uppercase tracking-widest">Powered by POE — Try Free</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
};

const ComparisonTable = () => {
  const rows = [
    "Reddit Signal Harvesting",
    "LinkedIn Intent Scoring",
    "Psychographic Persona Mapping",
    "Autonomous A/B Testing",
    "Multi-channel Sequences",
    "Real-time CRM Sync",
    "Starting Price"
  ];

  const data = [
    { name: "POE", values: [true, true, true, true, true, true, "₹999"] },
    { name: "Lemlist", values: [false, false, false, true, true, true, "₹4,500"] },
    { name: "Apollo", values: [false, true, false, false, true, true, "₹3,900"] },
    { name: "Clay", values: [true, true, false, false, false, true, "₹12,000"] },
  ];

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto overflow-x-auto">
      <h2 className="text-4xl font-display font-bold text-center mb-16">Why POE Wins</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border-default">
            <th className="text-left py-6 px-4 text-white/40 font-medium">Feature</th>
            {data.map(col => (
              <th key={col.name} className={cn("py-6 px-8 text-center", col.name === "POE" && "bg-indigo-500/5 border-x border-t border-indigo-primary/30 rounded-t-2xl")}>
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border-default">
              <td className="py-6 px-4 text-white/80 font-medium">{row}</td>
              {data.map(col => (
                <td key={col.name} className={cn("py-6 px-8 text-center", col.name === "POE" && "bg-indigo-500/5 border-x border-indigo-primary/30")}>
                  {typeof col.values[i] === "boolean" ? (
                    col.values[i] ? <Check className="mx-auto text-green-400" size={20} /> : <X className="mx-auto text-white/10" size={20} />
                  ) : (
                    <span className={cn("font-bold", col.name === "POE" ? "text-amber-primary" : "text-white/40")}>{col.values[i]}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="py-6 px-4"></td>
            {data.map(col => (
              <td key={col.name} className={cn("py-6 px-8 text-center", col.name === "POE" && "bg-indigo-500/5 border-x border-b border-indigo-primary/30 rounded-b-2xl")}></td>
            ))}
          </tr>
        </tbody>
      </table>
    </section>
  );
};

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  
  const plans = [
    { name: "Free", price: "0", features: ["50 emails/mo", "Reddit signals", "Basic templates"] },
    { name: "Starter", price: "499", features: ["500 emails/mo", "LinkedIn signals", "A/B testing"] },
    { name: "Pro", price: "999", features: ["2,000 emails/mo", "Persona mapping", "CRM integration", "Priority support"], popular: true },
    { name: "Agency", price: "2,499", features: ["10,000 emails/mo", "White-label reports", "Team seats (5)"] },
    { name: "Enterprise", price: "Custom", features: ["Unlimited emails", "Custom AI training", "Dedicated manager"] },
  ];

  return (
    <section id="pricing" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Transparent Pricing. No Surprises.</h2>
        <div className="flex items-center justify-center gap-4">
          <span className={cn("text-sm transition-colors", !isAnnual ? "text-white" : "text-white/40")}>Monthly</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-12 h-6 rounded-full bg-white/10 relative p-1 transition-all"
          >
            <motion.div 
              animate={{ x: isAnnual ? 24 : 0 }}
              className="w-4 h-4 rounded-full bg-indigo-primary" 
            />
          </button>
          <span className={cn("text-sm transition-colors", isAnnual ? "text-white" : "text-white/40")}>Annual (Save 20%)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {plans.map((plan, i) => (
          <GlowCard 
            key={i} 
            className={cn("p-8 flex flex-col", plan.popular && "border-indigo-primary ring-1 ring-indigo-primary/50 scale-105 z-10")}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Most Popular
              </div>
            )}
            <h3 className="text-xl font-display font-bold mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-3xl font-bold">₹{plan.price}</span>
              <span className="text-xs text-white/40">/mo</span>
            </div>
            <ul className="space-y-4 mb-12 flex-1">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-white/60">
                  <Check size={14} className="text-teal-400" /> {f}
                </li>
              ))}
            </ul>
            <button className={cn(
              "w-full py-3 rounded-xl font-bold transition-all",
              plan.popular ? "bg-indigo-primary hover:bg-indigo-600" : "bg-white/5 hover:bg-white/10"
            )}>
              Get Started
            </button>
          </GlowCard>
        ))}
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    { name: "Arjun Mehta", role: "SaaS Founder", text: "POE increased our reply rates from 1.2% to 7.4% in just two weeks. The Reddit signals are a game changer.", rating: 5 },
    { name: "Priya Sharma", role: "Growth Lead", text: "Finally, a tool that doesn't sound like a robot. The persona mapping is scary accurate.", rating: 5 },
    { name: "Rahul Singh", role: "Solo Consultant", text: "I save at least 10 hours a week on outreach. Worth every rupee.", rating: 4 },
    { name: "Ananya Iyer", role: "Agency Owner", text: "The masonry dashboard is beautiful, but the results are even better. Our clients are thrilled.", rating: 5 },
    { name: "Vikram Goel", role: "Sales Manager", text: "Best ROI we've seen from any sales tool this year.", rating: 5 },
  ];

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-display font-bold text-center mb-16">Loved by Founders</h2>
      <div className="masonry-grid">
        {testimonials.map((t, i) => (
          <GlowCard key={i} className="masonry-item p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-teal-500" />
              <div>
                <div className="text-sm font-bold">{t.name}</div>
                <div className="text-xs text-white/40">{t.role}</div>
              </div>
            </div>
            <p className="text-sm text-white/80 leading-relaxed mb-4 italic">"{t.text}"</p>
            <div className="flex text-amber-primary">
              {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={12} fill="currentColor" />)}
            </div>
          </GlowCard>
        ))}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-bg-deep border-t border-border-default pt-24 pb-12 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-br from-indigo-primary to-teal-primary rounded-lg flex items-center justify-center font-bold">P</div>
          <span className="text-xl font-display font-bold tracking-tight">POE</span>
        </div>
        <p className="text-sm text-white/40 leading-relaxed">
          Predictive Outreach Engine — The intelligence layer for modern sales teams.
        </p>
        <div className="flex gap-4 text-white/40">
          <Linkedin size={20} className="hover:text-white cursor-pointer" />
          <Twitter size={20} className="hover:text-white cursor-pointer" />
          <MessageSquare size={20} className="hover:text-white cursor-pointer" />
        </div>
      </div>
      
      <div className="space-y-6">
        <h4 className="text-sm font-bold uppercase tracking-widest text-white/20">Product</h4>
        <ul className="space-y-4 text-sm text-white/60">
          <li className="hover:text-white cursor-pointer">Features</li>
          <li className="hover:text-white cursor-pointer">Pricing</li>
          <li className="hover:text-white cursor-pointer">API Docs</li>
          <li className="hover:text-white cursor-pointer">Changelog</li>
        </ul>
      </div>

      <div className="space-y-6">
        <h4 className="text-sm font-bold uppercase tracking-widest text-white/20">Company</h4>
        <ul className="space-y-4 text-sm text-white/60">
          <li className="hover:text-white cursor-pointer">About</li>
          <li className="hover:text-white cursor-pointer">Careers</li>
          <li className="hover:text-white cursor-pointer">Privacy</li>
          <li className="hover:text-white cursor-pointer">Terms</li>
        </ul>
      </div>

      <div className="space-y-6">
        <h4 className="text-sm font-bold uppercase tracking-widest text-white/20">Newsletter</h4>
        <p className="text-sm text-white/40">Join 4,200 founders getting outreach tips.</p>
        <div className="flex gap-2">
          <input placeholder="Email address" className="flex-1 bg-white/5 border border-border-default rounded-lg px-4 py-2 text-sm outline-hidden focus:border-indigo-primary" />
          <button className="px-4 py-2 bg-indigo-primary rounded-lg text-sm font-bold">Join</button>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto pt-12 border-t border-border-default text-center text-xs text-white/20">
      © 2025 Predictive Outreach Engine Pvt. Ltd. · founders@predictiveoutreach.in
    </div>
  </footer>
);
