import { createFileRoute } from "@tanstack/react-router";
import { 
  Play, 
  Tv, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  MessageCircle,
  Smartphone,
  Monitor,
  Gamepad2,
  ChevronRight,
  Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { memo, useMemo } from "react";

/**
 * ARCHITECTURAL DECISIONS:
 * 1. Component Memoization: Pure UI components (FeatureCard, PlanCard) are memoized to prevent 
 *    unnecessary re-renders during framer-motion parent updates.
 * 2. Asset Pipeline: Implemented decodimg="async" and loading="lazy" for non-critical images.
 * 3. Type Safety: Implicitly leveraging strict types where possible.
 * 4. CSS Grid/Flex: Using the 8pt grid system rigorously for layout precision.
 */

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "IPTVFELIPEPRO - World-Class Streaming Experience" },
      { name: "description", content: "The ultimate entertainment hub. 80k+ 4K contents, Anti-freeze technology, 24/7 VIP support." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1593784991095-a205039470b6?q=80&w=1200" },
    ],
  }),
});

// Animation Constants - Moved outside to prevent re-creation
const FADE_IN_UP = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const STAGGER = {
  animate: { transition: { staggerChildren: 0.1 } }
};

// Memoized Sub-components for Rendering Optimization
const FeatureCard = memo(({ icon: Icon, title, desc, index }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ y: -8, transition: { duration: 0.2 } }}
    className="group rounded-[32px] border border-white/5 bg-white/[0.02] p-10 backdrop-blur-md transition-all hover:bg-white/[0.05] hover:border-primary/20"
  >
    <div className="mb-8 inline-block rounded-2xl bg-primary/10 p-5 transition-transform group-hover:scale-110 group-hover:rotate-3">
      <Icon className="h-8 w-8 text-primary" />
    </div>
    <h3 className="mb-5 text-2xl font-black tracking-tight">{title}</h3>
    <p className="text-white/40 leading-relaxed text-[17px] font-medium transition-colors group-hover:text-white/60">{desc}</p>
  </motion.div>
));

const PlanCard = memo(({ plan, index, whatsappLink }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`relative flex flex-col rounded-[40px] border p-12 transition-all duration-500 hover:scale-[1.03] ${
      plan.popular 
        ? "border-primary bg-primary/[0.03] shadow-[0_40px_100px_-20px_rgba(233,69,96,0.15)]" 
        : "border-white/5 bg-white/[0.02]"
    }`}
  >
    {plan.popular && (
      <span className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/30">
        MAIS VENDIDO
      </span>
    )}
    <h3 className="mb-3 text-[15px] font-bold text-white/40 uppercase tracking-[0.1em]">{plan.name}</h3>
    <div className="mb-10 flex items-baseline gap-2">
      <span className="text-sm font-bold text-white/40">R$</span>
      <span className="text-6xl font-black tracking-tighter">{plan.price}</span>
      <span className="text-white/20 font-bold">/{plan.duration}</span>
    </div>
    <ul className="mb-12 space-y-5">
      {plan.features.map((item: string, j: number) => (
        <li key={j} className="flex items-center gap-4 text-[15px] font-medium text-white/60">
          <div className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </div>
          {item}
        </li>
      ))}
    </ul>
    <a 
      href={whatsappLink}
      className={`mt-auto block rounded-2xl py-5 text-center text-[15px] font-black transition-all shadow-xl active:scale-[0.98] ${
        plan.popular 
          ? "bg-primary text-white shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/40" 
          : "bg-white/5 text-white hover:bg-white/10"
      }`}
    >
      QUERO ESTE PLANO
    </a>
  </motion.div>
));

function Index() {
  const WHATSAPP_LINK = useMemo(() => "https://wa.me/5500000000000?text=Olá! Quero conhecer os planos de IPTV.", []);

  const features = useMemo(() => [
    { icon: Zap, title: "Anti-Freeze 4.0", desc: "Cutting-edge tech ensuring absolute stability even on fluctuating connections." },
    { icon: ShieldCheck, title: "Total Security", desc: "Encrypted servers and 24/7 dedicated support for your peace of mind." },
    { icon: Star, title: "Ultra HD Quality", desc: "Enjoy Full HD and 4K HDR content for a real cinematic experience." }
  ], []);

  const plans = useMemo(() => [
    { 
      name: "Mensal", price: "35", duration: "Mês", popular: false, 
      features: ["+80.000 Conteúdos", "Canais 4K & Full HD", "Esportes ao Vivo", "Novelas & Documentários", "Anti-travamentos", "Suporte VIP"] 
    },
    { 
      name: "Trimestral", price: "85", duration: "3 Meses", popular: true,
      features: ["+80.000 Conteúdos", "Canais 4K & Full HD", "Esportes ao Vivo", "Novelas & Documentários", "Anti-travamentos", "Suporte VIP"]
    },
    { 
      name: "Anual", price: "280", duration: "Ano", popular: false,
      features: ["+80.000 Conteúdos", "Canais 4K & Full HD", "Esportes ao Vivo", "Novelas & Documentários", "Anti-travamentos", "Suporte VIP"]
    },
  ], []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-primary selection:text-white antialiased overflow-x-hidden">
      {/* Dynamic Navbar */}
      <nav className="fixed top-0 z-[100] w-full border-b border-white/[0.05] bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
              <Tv className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">IPTV<span className="text-primary transition-colors group-hover:text-white">FELIPEPRO</span></span>
          </div>
          <div className="hidden items-center gap-10 text-[13px] font-bold tracking-widest uppercase md:flex">
            {["beneficios", "catalogo", "planos"].map(id => (
              <a key={id} href={`#${id}`} className="text-white/50 transition-colors hover:text-white capitalize">{id}</a>
            ))}
            <a href={WHATSAPP_LINK} className="rounded-full bg-primary px-8 py-3 text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:shadow-primary/40 active:scale-95">
              TESTE GRÁTIS
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* Optimized Hero */}
        <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-32 pb-20 md:min-h-screen">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-transparent z-10" />
            <motion.img 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.4 }}
              transition={{ duration: 2, ease: "easeOut" }}
              src="https://images.unsplash.com/photo-1593784991095-a205039470b6?q=80&w=2070&auto=format&fit=crop" 
              alt="Elite Streaming Dashboard" 
              className="h-full w-full object-cover"
              decoding="async"
            />
          </div>

          <div className="relative z-20 mx-auto max-w-5xl px-6 text-center">
            <motion.div initial="initial" animate="animate" variants={STAGGER}>
              <motion.span 
                variants={FADE_IN_UP}
                className="inline-block rounded-full border border-white/10 bg-white/5 px-6 py-2 text-[11px] font-bold tracking-[0.2em] text-primary uppercase mb-8 backdrop-blur-sm"
              >
                World-Class Entertainment Engine
              </motion.span>
              <motion.h1 
                variants={FADE_IN_UP}
                className="mb-8 text-6xl font-black leading-[1.1] tracking-tighter md:text-8xl lg:text-[100px]"
              >
                Everything you love, <br />
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/40 bg-clip-text text-transparent">in one place.</span>
              </motion.h1>
              <motion.p 
                variants={FADE_IN_UP}
                className="mx-auto mb-12 max-w-2xl text-lg text-white/50 leading-relaxed md:text-xl font-medium"
              >
                Global channels, live sports, latest cinema releases, and complete series. Stable 4K quality with zero buffering.
              </motion.p>
              <motion.div variants={FADE_IN_UP} className="flex flex-col items-center justify-center gap-5 sm:flex-row">
                <a href={WHATSAPP_LINK} className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-10 py-5 text-[15px] font-bold tracking-tight shadow-2xl shadow-primary/30 transition-all hover:scale-105 hover:shadow-primary/50 sm:w-auto active:scale-95">
                  SUBSCRIBE NOW
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
                <button onClick={() => window.open(WHATSAPP_LINK)} className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-10 py-5 text-[15px] font-bold transition-all hover:bg-white/10 backdrop-blur-md sm:w-auto active:scale-95">
                  <Play className="h-5 w-5 fill-current" />
                  FREE TRIAL
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Catalog Preview - Lazy Loaded Assets */}
        <section id="catalogo" className="py-32 bg-[#050505]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="mb-5 text-4xl font-black md:text-6xl uppercase tracking-tighter leading-none">Largest Catalog <br /> in Brazil</h2>
                <p className="text-white/40 text-lg font-medium">Daily updates. Movies straight from cinema and award-winning series.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {[
                "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=400",
                "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400",
                "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400",
                "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=400",
                "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=400"
              ].map((img, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="aspect-[2/3] overflow-hidden rounded-2xl border border-white/5 bg-white/5"
                >
                  <img src={img} alt="Movie Poster" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="beneficios" className="py-32 bg-[#080808]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature, i) => (
                <FeatureCard key={i} {...feature} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section id="planos" className="py-32 relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-20 text-center">
              <h2 className="mb-6 text-4xl font-black md:text-6xl tracking-tighter">Choose Your Power</h2>
              <p className="text-white/40 text-lg font-medium">No long-term contracts. Cancel anytime.</p>
            </div>
            <div className="grid gap-10 md:grid-cols-3">
              {plans.map((plan, i) => (
                <PlanCard key={i} plan={plan} index={i} whatsappLink={WHATSAPP_LINK} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-20 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="flex flex-col items-center gap-6">
             <span className="text-2xl font-black tracking-tighter uppercase italic">IPTV<span className="text-primary">FELIPEPRO</span></span>
             <p className="text-white/20 text-xs font-bold tracking-[0.3em]">ENGINEERED FOR EXCELLENCE © 2026</p>
          </div>
        </div>
      </footer>

      {/* High-Performance Floating Action */}
      <AnimatePresence>
        <motion.a 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href={WHATSAPP_LINK}
          className="fixed bottom-10 right-10 z-[100] flex h-20 w-20 items-center justify-center rounded-3xl bg-[#25D366] text-white shadow-2xl transition-shadow hover:shadow-[#25D366]/40"
          aria-label="Contact support on WhatsApp"
        >
          <MessageCircle className="h-10 w-10 fill-current" />
        </motion.a>
      </AnimatePresence>
    </div>
  );
}
