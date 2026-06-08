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
  Star,
  Menu,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { memo, useMemo, useState, useEffect } from "react";

/**
 * RESPONSIVE ARCHITECTURE:
 * 1. Fluid Typography: Using clamp() for titles and dynamic text scaling.
 * 2. Mobile-First: All layouts are stacked by default and grid-expand on md/lg breakpoints.
 * 3. Touch Ergonomics: Interactive elements have min 48px height on mobile.
 * 4. CLS Prevention: Aspect-ratio defined for all media containers.
 */

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "IPTVFELIPEPRO - Cinema em Casa com Qualidade 4K" },
      { name: "description", content: "A melhor experiência de entretenimento. Mais de 80.000 conteúdos em 4K, Anti-freeze e suporte 24h." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1593784991095-a205039470b6?q=80&w=1200" },
    ],
  }),
});

const FADE_IN_UP = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const STAGGER = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const FeatureCard = memo(({ icon: Icon, title, desc, index }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="group rounded-[clamp(1.5rem,3vw,2.5rem)] border border-white/5 bg-white/[0.02] p-[clamp(1.5rem,4vw,2.5rem)] backdrop-blur-md transition-all hover:bg-white/[0.05] hover:border-primary/20"
  >
    <div className="mb-6 md:mb-8 inline-block rounded-2xl bg-primary/10 p-4 md:p-5 transition-transform group-hover:scale-110 group-hover:rotate-3">
      <Icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
    </div>
    <h3 className="mb-4 text-xl md:text-2xl font-black tracking-tight">{title}</h3>
    <p className="text-white/40 leading-relaxed text-sm md:text-[17px] font-medium transition-colors group-hover:text-white/60">{desc}</p>
  </motion.div>
));

const PlanCard = memo(({ plan, index, whatsappLink }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`relative flex flex-col rounded-[clamp(2rem,5vw,3rem)] border p-[clamp(1.5rem,5vw,3rem)] transition-all duration-500 md:hover:scale-[1.03] ${
      plan.popular 
        ? "border-primary bg-primary/[0.03] shadow-[0_40px_100px_-20px_rgba(233,69,96,0.15)]" 
        : "border-white/5 bg-white/[0.02]"
    }`}
  >
    {plan.popular && (
      <span className="absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 md:px-6 py-1.5 md:py-2 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/30 whitespace-nowrap">
        MAIS VENDIDO
      </span>
    )}
    <h3 className="mb-2 md:mb-3 text-[13px] md:text-[15px] font-bold text-white/40 uppercase tracking-[0.1em]">{plan.name}</h3>
    <div className="mb-8 md:mb-10 flex items-baseline gap-2">
      <span className="text-xs md:text-sm font-bold text-white/40">R$</span>
      <span className="text-4xl md:text-6xl font-black tracking-tighter">{plan.price}</span>
      <span className="text-white/20 font-bold text-xs md:text-sm">/{plan.duration}</span>
    </div>
    <ul className="mb-8 md:mb-12 space-y-4 md:space-y-5">
      {plan.features.map((item: string, j: number) => (
        <li key={j} className="flex items-center gap-3 md:gap-4 text-[13px] md:text-[15px] font-medium text-white/60">
          <div className="flex-shrink-0 flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 text-primary" />
          </div>
          {item}
        </li>
      ))}
    </ul>
    <a 
      href={whatsappLink}
      className={`mt-auto block rounded-xl md:rounded-2xl py-4 md:py-5 text-center text-sm md:text-[15px] font-black transition-all shadow-xl active:scale-[0.96] min-h-[52px] flex items-center justify-center ${
        plan.popular 
          ? "bg-primary text-white shadow-primary/20 md:hover:bg-primary/90 md:hover:shadow-primary/40" 
          : "bg-white/5 text-white md:hover:bg-white/10"
      }`}
    >
      QUERO ESTE PLANO
    </a>
  </motion.div>
));

function Index() {
  const WHATSAPP_LINK = useMemo(() => "https://wa.me/5500000000000?text=Olá! Quero conhecer os planos de IPTV.", []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = useMemo(() => [
    { icon: Zap, title: "Anti-Freeze 4.0", desc: "Tecnologia de ponta para garantir estabilidade absoluta, mesmo em conexões oscilantes." },
    { icon: ShieldCheck, title: "Segurança Total", desc: "Servidores criptografados e suporte dedicado 24h por dia para sua tranquilidade." },
    { icon: Star, title: "Qualidade Ultra HD", desc: "Aproveite conteúdos em Full HD e 4K HDR para uma experiência de cinema real." }
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

  const navLinks = [
    { name: "Benefícios", href: "#beneficios" },
    { name: "Catálogo", href: "#catalogo" },
    { name: "Planos", href: "#planos" }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-primary selection:text-white antialiased overflow-x-hidden">
      {/* Responsive Navbar */}
      <nav className={`fixed top-0 z-[100] w-full transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.05] py-3 md:py-4" : "bg-transparent py-5 md:py-6"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          <div className="flex items-center gap-2 md:gap-3 group cursor-pointer">
            <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
              <Tv className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <span className="text-lg md:text-xl font-black tracking-tighter uppercase leading-none">IPTV<span className="text-primary transition-colors group-hover:text-white">FELIPEPRO</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 lg:gap-10 text-[13px] font-bold tracking-widest uppercase md:flex">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-white/50 transition-colors hover:text-white">{link.name}</a>
            ))}
            <a href={WHATSAPP_LINK} className="rounded-full bg-primary px-8 py-3 text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              TESTE GRÁTIS
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/5 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/[0.05] md:hidden p-6 shadow-2xl"
            >
              <div className="flex flex-col gap-5 text-center">
                {navLinks.map(link => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className="text-lg font-bold text-white/70 active:text-primary py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <a 
                  href={WHATSAPP_LINK} 
                  className="rounded-2xl bg-primary py-4 text-white font-black tracking-widest text-sm shadow-xl mt-2 active:scale-[0.97]"
                >
                  TESTE GRÁTIS AGORA
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Responsive Hero */}
        <section className="relative flex min-h-[95vh] items-center justify-center overflow-hidden pt-28 pb-16 md:min-h-screen">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-transparent z-10" />
            <motion.img 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.4 }}
              transition={{ duration: 2, ease: "easeOut" }}
              src="https://images.unsplash.com/photo-1593784991095-a205039470b6?q=80&w=2070&auto=format&fit=crop" 
              alt="Painel de Streaming Elite" 
              className="h-full w-full object-cover"
              decoding="async"
            />
          </div>

          <div className="relative z-20 mx-auto max-w-7xl px-5 text-center">
            <motion.div initial="initial" animate="animate" variants={STAGGER}>
              <motion.span 
                variants={FADE_IN_UP}
                className="inline-block rounded-full border border-white/10 bg-white/5 px-4 md:px-6 py-1.5 md:py-2 text-[9px] md:text-[11px] font-bold tracking-[0.2em] text-primary uppercase mb-6 md:mb-8 backdrop-blur-sm"
              >
                Entretenimento de Elite
              </motion.span>
              <motion.h1 
                variants={FADE_IN_UP}
                className="mb-6 md:mb-8 text-[clamp(2.5rem,8vw,6.25rem)] font-black leading-[1.05] tracking-tighter"
              >
                Tudo o que você ama, <br />
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/40 bg-clip-text text-transparent">em um só lugar.</span>
              </motion.h1>
              <motion.p 
                variants={FADE_IN_UP}
                className="mx-auto mb-10 md:mb-12 max-w-2xl text-base md:text-xl text-white/50 leading-relaxed font-medium px-4 md:px-0"
              >
                Canais do mundo todo, esportes ao vivo, os últimos lançamentos do cinema e séries completas. Qualidade 4K estável sem travamentos.
              </motion.p>
              <motion.div variants={FADE_IN_UP} className="flex flex-col items-center justify-center gap-4 sm:flex-row px-4 md:px-0">
                <a href={WHATSAPP_LINK} className="group flex w-full items-center justify-center gap-3 rounded-xl md:rounded-2xl bg-primary px-8 md:px-10 py-4 md:py-5 text-sm md:text-[15px] font-bold tracking-tight shadow-2xl shadow-primary/30 transition-all active:scale-95 sm:w-auto">
                  ASSINAR AGORA
                  <ChevronRight className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                </a>
                <button onClick={() => window.open(WHATSAPP_LINK)} className="flex w-full items-center justify-center gap-3 rounded-xl md:rounded-2xl border border-white/10 bg-white/5 px-8 md:px-10 py-4 md:py-5 text-sm md:text-[15px] font-bold transition-all backdrop-blur-md active:scale-95 sm:w-auto">
                  <Play className="h-4 w-4 md:h-5 md:w-5 fill-current" />
                  TESTE GRÁTIS
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Catalog Section - Touch Optimized */}
        <section id="catalogo" className="py-20 md:py-32 bg-[#050505]">
          <div className="mx-auto max-w-7xl px-5">
            <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-xl">
                <h2 className="mb-4 md:mb-5 text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tighter leading-none">O Maior Catálogo <br /> do Brasil</h2>
                <p className="text-white/40 text-sm md:text-lg font-medium">Atualizações diárias. Filmes que acabaram de sair do cinema e séries premiadas.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
              {[
                "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=600",
                "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600",
                "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600",
                "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=600",
                "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=600"
              ].map((img, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="aspect-[2/3] overflow-hidden rounded-xl md:rounded-2xl border border-white/5 bg-white/5 relative group"
                >
                  <img src={img} alt="Poster de Filme" className="h-full w-full object-cover transition-transform duration-500 md:group-hover:scale-105" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="beneficios" className="py-20 md:py-32 bg-[#080808]">
          <div className="mx-auto max-w-7xl px-5">
            <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => (
                <FeatureCard key={i} {...feature} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Plans Section - Mobile Stacking */}
        <section id="planos" className="py-20 md:py-32 relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-5">
            <div className="mb-12 md:mb-20 text-center">
              <h2 className="mb-4 md:mb-6 text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tighter">Escolha seu Plano</h2>
              <p className="text-white/40 text-sm md:text-lg font-medium">Sem contratos de fidelidade. Cancele quando quiser.</p>
            </div>
            <div className="grid gap-8 lg:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start">
              {plans.map((plan, i) => (
                <PlanCard key={i} plan={plan} index={i} whatsappLink={WHATSAPP_LINK} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 md:py-20 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-5 text-center">
          <div className="flex flex-col items-center gap-6 md:gap-8">
             <div className="flex items-center gap-2 group cursor-pointer">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Tv className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-black tracking-tighter uppercase italic leading-none">IPTV<span className="text-primary">FELIPEPRO</span></span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[10px] md:text-xs font-bold text-white/30 tracking-[0.2em] uppercase">
              <a href="#" className="hover:text-primary transition-colors">Termos de uso</a>
              <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
              <a href="#" className="hover:text-primary transition-colors">Suporte</a>
            </div>
            
            <p className="text-white/10 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">DESENVOLVIDO PARA A EXCELÊNCIA © 2026</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button - Touch Optimized Size */}
      <AnimatePresence>
        <motion.a 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileTap={{ scale: 0.9 }}
          href={WHATSAPP_LINK}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl md:rounded-3xl bg-[#25D366] text-white shadow-2xl active:shadow-[#25D366]/40 transition-shadow"
          aria-label="Falar com suporte no WhatsApp"
        >
          <MessageCircle className="h-8 w-8 md:h-10 md:w-10 fill-current" />
        </motion.a>
      </AnimatePresence>
    </div>
  );
}
