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
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "IPTVFELIPEPRO - Cinema em Casa com Qualidade 4K" },
      { name: "description", content: "A melhor experiência de entretenimento. Mais de 80.000 conteúdos em 4K, Anti-freeze e suporte 24h." },
    ],
  }),
});

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

function Index() {
  const WHATSAPP_LINK = "https://wa.me/5500000000000?text=Olá! Quero conhecer os planos de IPTV.";

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-primary selection:text-white antialiased overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 z-[100] w-full border-b border-white/[0.05] bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
              <Tv className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">IPTV<span className="text-primary transition-colors group-hover:text-white">FELIPEPRO</span></span>
          </div>
          <div className="hidden items-center gap-10 text-[13px] font-bold tracking-widest uppercase md:flex">
            <a href="#beneficios" className="text-white/50 transition-colors hover:text-white">Benefícios</a>
            <a href="#catalogo" className="text-white/50 transition-colors hover:text-white">Catálogo</a>
            <a href="#planos" className="text-white/50 transition-colors hover:text-white">Planos</a>
            <a href={WHATSAPP_LINK} className="rounded-full bg-primary px-8 py-3 text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:shadow-primary/40 active:scale-95">
              TESTE GRÁTIS
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-32 pb-20 md:min-h-screen">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-transparent z-10" />
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1593784991095-a205039470b6?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero Background" 
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative z-20 mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.span 
              variants={fadeInUp}
              className="inline-block rounded-full border border-white/10 bg-white/5 px-6 py-2 text-[11px] font-bold tracking-[0.2em] text-primary uppercase mb-8 backdrop-blur-sm"
            >
              A Revolução do Entretenimento
            </motion.span>
            <motion.h1 
              variants={fadeInUp}
              className="mb-8 text-6xl font-black leading-[1.1] tracking-tighter md:text-8xl lg:text-[100px]"
            >
              Tudo o que você ama, <br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/40 bg-clip-text text-transparent">em um só lugar.</span>
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="mx-auto mb-12 max-w-2xl text-lg text-white/50 leading-relaxed md:text-xl font-medium"
            >
              Canais do mundo todo, esportes ao vivo, os últimos lançamentos do cinema e séries completas. Qualidade 4K estável sem travamentos.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col items-center justify-center gap-5 sm:flex-row"
            >
              <a href={WHATSAPP_LINK} className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-10 py-5 text-[15px] font-bold tracking-tight shadow-2xl shadow-primary/30 transition-all hover:scale-105 hover:shadow-primary/50 sm:w-auto active:scale-95">
                ASSINAR AGORA
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a href={WHATSAPP_LINK} className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-10 py-5 text-[15px] font-bold transition-all hover:bg-white/10 backdrop-blur-md sm:w-auto active:scale-95">
                <Play className="h-5 w-5 fill-current" />
                TESTE GRÁTIS
              </a>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="mt-20 flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-30 grayscale transition-all hover:opacity-60 hover:grayscale-0"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-5 md:h-7" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg" alt="Disney+" className="h-8 md:h-12" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg" alt="Prime Video" className="h-5 md:h-7" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/HBO_Max_Logo.svg" alt="HBO Max" className="h-5 md:h-7" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Catalog Preview */}
      <section id="catalogo" className="py-32 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-xl">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-5 text-4xl font-black md:text-6xl uppercase tracking-tighter leading-none"
              >
                O maior catálogo <br /> do Brasil
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-white/40 text-lg font-medium"
              >
                Novidades adicionadas diariamente. Filmes que acabaram de sair do cinema e as séries mais premiadas.
              </motion.p>
            </div>
            <motion.a 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              href={WHATSAPP_LINK} 
              className="group text-primary font-bold text-lg flex items-center gap-2 hover:text-white transition-colors"
            >
              Ver catálogo completo <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
            </motion.a>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {[
              "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2050&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=1935&auto=format&fit=crop"
            ].map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/5 shadow-2xl transition-all duration-500 hover:border-primary/50"
              >
                <img src={img} alt="Poster" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="beneficios" className="py-32 bg-[#080808]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Zap className="h-8 w-8 text-primary" />,
                title: "Anti-Freeze 4.0",
                desc: "Tecnologia de ponta para garantir estabilidade absoluta, mesmo em conexões oscilantes."
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-primary" />,
                title: "Segurança Total",
                desc: "Servidores criptografados e suporte dedicado 24h por dia para sua tranquilidade."
              },
              {
                icon: <Star className="h-8 w-8 text-primary" />,
                title: "Qualidade Ultra HD",
                desc: "Aproveite conteúdos em Full HD e 4K HDR para uma experiência de cinema real."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -12 }}
                className="group rounded-[32px] border border-white/5 bg-white/[0.02] p-10 backdrop-blur-md transition-all duration-500 hover:bg-white/[0.05] hover:border-primary/20"
              >
                <div className="mb-8 inline-block rounded-2xl bg-primary/10 p-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  {feature.icon}
                </div>
                <h3 className="mb-5 text-2xl font-black tracking-tight">{feature.title}</h3>
                <p className="text-white/40 leading-relaxed text-[17px] font-medium transition-colors group-hover:text-white/60">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planos" className="py-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-20" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-20 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 text-4xl font-black md:text-6xl tracking-tighter"
            >
              Escolha o seu plano
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/40 text-lg font-medium"
            >
              Sem fidelidade. Cancele quando quiser.
            </motion.p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {[
              { name: "Mensal", price: "35", duration: "Mês", popular: false },
              { name: "Trimestral", price: "85", duration: "3 Meses", popular: true },
              { name: "Anual", price: "280", duration: "Ano", popular: false },
            ].map((plan, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
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
                  {[
                    "+80.000 Conteúdos",
                    "Canais 4K & Full HD",
                    "Esportes ao Vivo",
                    "Novelas & Documentários",
                    "Anti-travamentos",
                    "Suporte VIP"
                  ].map((item, j) => (
                    <li key={j} className="flex items-center gap-4 text-[15px] font-medium text-white/60 group-hover:text-white transition-colors">
                      <div className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <a 
                  href={WHATSAPP_LINK}
                  className={`mt-auto block rounded-2xl py-5 text-center text-[15px] font-black transition-all shadow-xl active:scale-[0.98] ${
                    plan.popular 
                      ? "bg-primary text-white shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/40" 
                      : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  QUERO ESTE PLANO
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi Device Section */}
      <section className="py-32 bg-[#080808]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-20 md:flex-row">
            <div className="max-w-xl">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8 text-4xl font-black md:text-6xl tracking-tighter leading-none"
              >
                Assista em qualquer <br /> dispositivo
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mb-12 text-lg text-white/40 font-medium leading-relaxed"
              >
                Compatível com todos os sistemas. Leve seu entretenimento para onde você for.
              </motion.p>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { icon: <Smartphone />, label: "Smartphone" },
                  { icon: <Tv />, label: "Smart TV" },
                  { icon: <Monitor />, label: "Computador" },
                  { icon: <Gamepad2 />, label: "TV Box" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-4 rounded-2xl bg-white/[0.03] p-5 border border-white/5 transition-colors hover:border-primary/20"
                  >
                    <div className="text-primary">{item.icon}</div>
                    <span className="font-bold text-[15px]">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-10 rounded-full bg-primary/10 blur-[120px] opacity-50" />
              <img 
                src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop" 
                alt="Multi Device Support" 
                className="relative rounded-[40px] border border-white/10 shadow-2xl grayscale-[20%] transition-all duration-700 hover:grayscale-0"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[60px] bg-gradient-to-br from-primary via-primary to-[#ff6b81] p-16 shadow-[0_60px_100px_-20px_rgba(233,69,96,0.4)] md:p-32 overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 blur-[100px] translate-y-1/2 -translate-x-1/2 rounded-full" />
            
            <h2 className="relative z-10 mb-8 text-4xl font-black md:text-7xl tracking-tighter leading-[0.9]">
              Pronto para a melhor <br /> experiência?
            </h2>
            <p className="relative z-10 mb-12 text-lg text-white/90 md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
              Junte-se a milhares de clientes satisfeitos e transforme sua TV hoje mesmo.
            </p>
            <a href={WHATSAPP_LINK} className="relative z-10 inline-flex items-center gap-4 rounded-2xl bg-white px-12 py-6 text-[18px] font-black text-black transition-all hover:scale-105 active:scale-95 shadow-2xl">
              COMEÇAR AGORA
              <ChevronRight className="h-6 w-6" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-20 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Tv className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">IPTV<span className="text-primary">FELIPEPRO</span></span>
            </div>
            
            <div className="flex gap-12 text-sm font-bold text-white/40 tracking-widest uppercase">
              <a href="#beneficios" className="hover:text-primary transition-colors">Termos</a>
              <a href="#catalogo" className="hover:text-primary transition-colors">Privacidade</a>
              <a href="#planos" className="hover:text-primary transition-colors">Cookies</a>
            </div>

            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="flex gap-5">
                <a href={WHATSAPP_LINK} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-white transition-all hover:bg-primary hover:border-primary">
                  <MessageCircle className="h-6 w-6" />
                </a>
              </div>
              <p className="text-[13px] font-bold text-white/20 tracking-wide">© 2026 IPTVFELIPEPRO. DESIGN BY PREMIUM ELITE.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        href={WHATSAPP_LINK}
        className="fixed bottom-10 right-10 z-[100] flex h-20 w-20 items-center justify-center rounded-[24px] bg-[#25D366] text-white shadow-[0_20px_50px_rgba(37,211,102,0.4)] transition-all hover:scale-110 active:scale-95 hover:shadow-[0_30px_60px_rgba(37,211,102,0.6)]"
      >
        <MessageCircle className="h-10 w-10 fill-current" />
      </motion.a>
    </div>
  );
}
