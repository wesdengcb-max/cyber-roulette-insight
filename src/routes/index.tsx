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
      { title: "IPTV PRO - Cinema em Casa com Qualidade 4K" },
      { name: "description", content: "A melhor experiência de entretenimento. Mais de 80.000 conteúdos em 4K, Anti-freeze e suporte 24h." },
    ],
  }),
});

function Index() {
  const WHATSAPP_LINK = "https://wa.me/5500000000000?text=Olá! Quero conhecer os planos de IPTV.";

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Tv className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">IPTV<span className="text-primary">PRO</span></span>
          </div>
          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#beneficios" className="text-white/60 transition-colors hover:text-white">Benefícios</a>
            <a href="#catalogo" className="text-white/60 transition-colors hover:text-white">Catálogo</a>
            <a href="#planos" className="text-white/60 transition-colors hover:text-white">Planos</a>
            <a href={WHATSAPP_LINK} className="rounded-full bg-primary px-6 py-2.5 font-bold transition-all hover:scale-105 hover:bg-primary/90">TESTE GRÁTIS</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          <img 
            src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2069&auto=format&fit=crop" 
            alt="Hero Background" 
            className="h-full w-full object-cover opacity-30"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm font-bold tracking-wider text-primary uppercase mb-6">
              A Revolução do Entretenimento
            </span>
            <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Tudo o que você ama, <br />
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">em um só lugar.</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/60 md:text-xl">
              Canais do mundo todo, esportes ao vivo, os últimos lançamentos do cinema e séries completas. Qualidade 4K estável sem travamentos.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href={WHATSAPP_LINK} className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-bold transition-all hover:scale-105 hover:bg-primary/90 sm:w-auto">
                ASSINAR AGORA
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a href={WHATSAPP_LINK} className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-bold transition-all hover:bg-white/10 sm:w-auto">
                <Play className="h-5 w-5 fill-current" />
                TESTE GRÁTIS
              </a>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg" alt="Disney+" className="h-10" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg" alt="Prime Video" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/HBO_Max_Logo.svg" alt="HBO Max" className="h-6" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="beneficios" className="py-24">
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
                whileHover={{ y: -10 }}
                className="rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm"
              >
                <div className="mb-6 inline-block rounded-2xl bg-primary/10 p-4">
                  {feature.icon}
                </div>
                <h3 className="mb-4 text-2xl font-bold">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planos" className="py-24 bg-gradient-to-b from-transparent to-primary/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black md:text-5xl">Escolha o seu plano</h2>
            <p className="text-white/60">Sem fidelidade. Cancele quando quiser.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { name: "Mensal", price: "35", duration: "Mês", popular: false },
              { name: "Trimestral", price: "85", duration: "3 Meses", popular: true },
              { name: "Anual", price: "280", duration: "Ano", popular: false },
            ].map((plan, i) => (
              <div 
                key={i}
                className={`relative flex flex-col rounded-3xl border p-8 transition-all hover:scale-[1.02] ${
                  plan.popular 
                    ? "border-primary bg-primary/5 shadow-[0_0_40px_rgba(233,69,96,0.1)]" 
                    : "border-white/5 bg-white/5"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-widest">
                    MAIS VENDIDO
                  </span>
                )}
                <h3 className="mb-2 text-xl font-bold text-white/60">{plan.name}</h3>
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-4xl font-black">R$ {plan.price}</span>
                  <span className="text-white/40">/{plan.duration}</span>
                </div>
                <ul className="mb-10 space-y-4">
                  {[
                    "+80.000 Conteúdos",
                    "Canais 4K & Full HD",
                    "Esportes ao Vivo",
                    "Novelas & Documentários",
                    "Anti-travamentos",
                    "Suporte VIP"
                  ].map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-white/80">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a 
                  href={WHATSAPP_LINK}
                  className={`mt-auto block rounded-xl py-4 text-center font-bold transition-all ${
                    plan.popular ? "bg-primary hover:bg-primary/90" : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  QUERO ESTE PLANO
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi Device Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
            <div className="max-w-xl">
              <h2 className="mb-6 text-4xl font-black md:text-5xl">Assista em qualquer dispositivo</h2>
              <p className="mb-8 text-lg text-white/60">Compatível com todos os sistemas. Leve seu entretenimento para onde você for.</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 border border-white/5">
                  <Smartphone className="h-6 w-6 text-primary" />
                  <span className="font-medium">Smartphone</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 border border-white/5">
                  <Tv className="h-6 w-6 text-primary" />
                  <span className="font-medium">Smart TV</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 border border-white/5">
                  <Monitor className="h-6 w-6 text-primary" />
                  <span className="font-medium">Computador</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 border border-white/5">
                  <Gamepad2 className="h-6 w-6 text-primary" />
                  <span className="font-medium">TV Box</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-primary/20 blur-3xl" />
              <img 
                src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop" 
                alt="Multi Device Support" 
                className="relative rounded-3xl border border-white/10 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="rounded-[40px] bg-gradient-to-br from-primary to-primary/40 p-12 shadow-[0_0_80px_rgba(233,69,96,0.3)] md:p-20">
            <h2 className="mb-6 text-4xl font-black md:text-6xl">Pronto para a melhor experiência?</h2>
            <p className="mb-10 text-lg text-white/80 md:text-xl">Junte-se a milhares de clientes satisfeitos e transforme sua TV hoje mesmo.</p>
            <a href={WHATSAPP_LINK} className="inline-flex items-center gap-3 rounded-2xl bg-white px-10 py-5 text-xl font-black text-black transition-all hover:scale-105 active:scale-95">
              COMEÇAR AGORA
              <ChevronRight className="h-6 w-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
                <Tv className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-black tracking-tighter uppercase">IPTV<span className="text-primary">PRO</span></span>
            </div>
            <p className="text-sm text-white/40">© 2026 IPTV PRO - Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href={WHATSAPP_LINK} className="text-white/40 hover:text-primary transition-colors">
                <MessageCircle className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={WHATSAPP_LINK}
        className="fixed bottom-8 right-8 z-[60] flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all hover:scale-110 active:scale-95"
      >
        <MessageCircle className="h-8 w-8 fill-current" />
      </a>
    </div>
  );
}
