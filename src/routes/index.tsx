import { createFileRoute } from "@tanstack/react-router";
import {
  Tv,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  ChevronRight,
  Star,
  ShoppingCart,
  Search,
  User,
  Ticket,
  Globe,
  Clock,
  Sparkles,
  Zap,
  Award,
  Headphones,
  Smartphone,
  Monitor,
  Gamepad2,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { memo, useMemo, useState, useEffect } from "react";

interface Review {
  user: string;
  text: string;
  stars: number;
  time: string;
}

interface Plan {
  name: string;
  price: string;
  duration: string;
  popular: boolean;
  features: string[];
}

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "IPTVFELIPEPRO — Streaming Premium 4K com Suporte 24/7" },
      { name: "description", content: "Assine o melhor IPTV do Brasil: +80.000 conteúdos em 4K HDR, esportes ao vivo, filmes e séries. Entrega imediata e suporte VIP." },
      { property: "og:title", content: "IPTVFELIPEPRO — Streaming Premium 4K" },
      { property: "og:description", content: "+80.000 conteúdos em 4K HDR. Entrega imediata, anti-travamentos e suporte 24/7." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const ReviewCard = memo(({ user, text, stars, time }: Review) => (
  <div className="panel p-6 min-w-[300px] md:min-w-[360px] snap-center">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 border border-primary/20 flex items-center justify-center text-primary font-semibold">
        {user.charAt(0)}
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="font-semibold text-sm text-foreground truncate">{user}</h4>
        <div className="flex gap-0.5 mt-1">
          {[...Array(stars)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-primary text-primary" />
          ))}
        </div>
      </div>
      <span className="text-[10px] text-muted-foreground/60 font-medium">{time}</span>
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed">"{text}"</p>
  </div>
));

const ProductCard = memo(({ plan, index, whatsappLink }: { plan: Plan; index: number; whatsappLink: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className={`group relative panel overflow-hidden transition-all duration-500 hover:-translate-y-1 ${
      plan.popular ? "ring-1 ring-primary/40 glow-primary" : "hover:border-primary/20"
    }`}
  >
    {plan.popular && (
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
    )}
    <div className="p-8 md:p-10">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{plan.duration}</span>
            {plan.popular && (
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20">
                Mais escolhido
              </span>
            )}
          </div>
          <h3 className="font-display text-4xl md:text-5xl text-foreground leading-none">{plan.name}</h3>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <Tv className="w-5 h-5 text-primary" />
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-8">
        <span className="text-xs text-muted-foreground/70">R$</span>
        <span className="font-display text-6xl text-gradient-gold leading-none">{plan.price}</span>
        <span className="text-xs text-muted-foreground/50 line-through ml-1">R${(parseFloat(plan.price) * 1.2).toFixed(2)}</span>
      </div>

      <ul className="space-y-3 mb-8 pb-8 border-b border-border">
        {plan.features.map((feature: string, i: number) => (
          <li key={i} className="flex items-center gap-3 text-sm text-foreground/80">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] ${
          plan.popular
            ? "bg-primary text-primary-foreground hover:brightness-110"
            : "bg-foreground/5 text-foreground border border-border hover:bg-foreground/10 hover:border-primary/30"
        }`}
      >
        Assinar agora
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  </motion.div>
));

function Index() {
  const WHATSAPP_LINK = useMemo(() => "https://wa.me/5500000000000?text=Olá! Quero conhecer os planos de IPTV.", []);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const reviews: Review[] = [
    { user: "Vinícius Alexandre", text: "Quando entrei na loja já fui presenteado com um cupom. Suporte solucionou meu problema rápido! 10/10!", stars: 5, time: "Agora" },
    { user: "Gustavo Lima", text: "Atendimento atencioso, produto com qualidade gigante e preço incrível. Recomendo demais.", stars: 5, time: "Há 3 min" },
    { user: "Robert Soares", text: "Conheci pelo Instagram. Suporte é excelente e rapidez, te resolve no instante.", stars: 5, time: "Há 14 min" },
    { user: "Pedro Ramos", text: "Preço acessível e atendimento rápido. Veio tudo certinho. Super recomendo!", stars: 5, time: "Há 8 min" },
  ];

  const plans: Plan[] = [
    { name: "Mensal", price: "35.00", duration: "30 Dias", popular: false, features: ["+80.000 Conteúdos", "Canais 4K & Full HD", "Esportes ao Vivo", "Anti-travamentos", "Suporte VIP"] },
    { name: "Trimestral", price: "85.00", duration: "90 Dias", popular: true, features: ["+80.000 Conteúdos", "Canais 4K & Full HD", "Esportes ao Vivo", "Anti-travamentos", "Suporte VIP"] },
    { name: "Anual", price: "280.00", duration: "365 Dias", popular: false, features: ["+80.000 Conteúdos", "Canais 4K & Full HD", "Esportes ao Vivo", "Anti-travamentos", "Suporte VIP"] },
  ];

  const features = [
    { icon: Zap, title: "Ativação em minutos", desc: "Receba seus dados de acesso imediatamente após a compra." },
    { icon: ShieldCheck, title: "Servidores premium", desc: "Infraestrutura estável com tecnologia anti-travamento." },
    { icon: Award, title: "Qualidade 4K HDR", desc: "Cores vivas, imagem cristalina e áudio de cinema." },
    { icon: Headphones, title: "Suporte 24/7", desc: "Time humano pronto para te ajudar a qualquer hora." },
  ];

  const devices = [
    { icon: Smartphone, label: "Smartphones" },
    { icon: Monitor, label: "Smart TVs" },
    { icon: Tv, label: "TV Box" },
    { icon: Gamepad2, label: "Consoles" },
  ];

  return (
    <div className="min-h-screen text-foreground selection:bg-primary/30 selection:text-foreground antialiased overflow-x-hidden">
      {/* Header */}
      <header className={`fixed top-0 z-[100] w-full transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-xl py-3 border-b border-border" : "bg-transparent py-5"}`}>
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:flex lg:justify-between">
          <div className="flex items-center gap-10 min-w-0">
            <a href="#" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
                <Tv className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-base tracking-tight text-foreground">
                iptv<span className="text-primary">felipepro</span>
              </span>
            </a>
            <nav className="hidden lg:flex items-center gap-8 text-sm text-muted-foreground">
              {["Planos", "Recursos", "Depoimentos", "Suporte"].map((item) => (
                <a key={item} href="#" className="hover:text-foreground transition-colors">{item}</a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button aria-label="Buscar" className="hidden md:flex w-10 h-10 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <button aria-label="Conta" className="w-10 h-10 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors">
              <User className="w-4 h-4" />
            </button>
            <button aria-label="Carrinho" className="w-10 h-10 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors relative">
              <ShoppingCart className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
            </button>
            <a href="#planos" className="hidden sm:inline-flex ml-2 items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 active:scale-95 transition">
              Assinar
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative min-h-[92vh] flex items-center pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <motion.img
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.25 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              src="https://images.unsplash.com/photo-1593784991095-a205039470b6?q=80&w=2070&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="Ambiente cinematográfico com TV de alta definição"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
          </div>

          <div className="relative z-20 mx-auto max-w-7xl px-5 md:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 panel px-3.5 py-1.5 mb-8">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium tracking-wide text-foreground/80">Bem-vindo à IPTVFELIPEPRO</span>
              </div>

              <h1 className="font-display text-[clamp(2.75rem,7vw,5.75rem)] leading-[1.02] text-foreground mb-6">
                Uma nova era de <em className="text-gradient-gold not-italic">entretenimento</em> em casa.
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                Mais de 80 mil conteúdos em qualidade 4K HDR, esportes ao vivo e o melhor do streaming, com entrega imediata e suporte humano 24/7.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-14">
                <a
                  href="#planos"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.98] transition"
                >
                  Ver planos
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-foreground/5 border border-border text-foreground font-semibold text-sm hover:bg-foreground/10 transition"
                >
                  Falar com o suporte
                </a>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-xl">
                {[
                  { icon: Globe, label: "Acesso", value: "Global" },
                  { icon: Clock, label: "Entrega", value: "Imediata" },
                  { icon: ShieldCheck, label: "Suporte", value: "24/7 VIP" },
                ].map((s) => (
                  <div key={s.label} className="panel px-4 py-3.5">
                    <s.icon className="w-4 h-4 text-primary mb-2" />
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground/70">{s.label}</div>
                    <div className="text-sm font-semibold text-foreground">{s.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trust / Reviews strip */}
        <section className="py-16 border-y border-border">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary mb-2">Depoimentos</div>
                <h2 className="font-display text-3xl md:text-4xl text-foreground">Aprovado por milhares de clientes</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
                </div>
                <span className="text-sm text-muted-foreground"><span className="text-foreground font-semibold">4.9/5</span> · +12.000 avaliações</span>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto snap-x no-scrollbar pb-2 -mx-5 px-5 md:mx-0 md:px-0">
              {reviews.map((review, i) => <ReviewCard key={i} {...review} />)}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="max-w-2xl mb-16">
              <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary mb-3">Por que escolher</div>
              <h2 className="font-display text-4xl md:text-6xl text-foreground leading-[1.05]">
                Feito para quem exige o <em className="text-gradient-gold not-italic">melhor</em>.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="panel p-7 hover:border-primary/20 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-base text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Plans */}
        <section id="planos" className="py-24 md:py-32 relative">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 text-primary text-[10px] font-semibold uppercase tracking-[0.25em] mb-3">
                  <Ticket className="w-3 h-3" />
                  Ofertas por tempo limitado
                </div>
                <h2 className="font-display text-4xl md:text-6xl text-foreground leading-[1.05]">
                  Escolha o seu <em className="text-gradient-gold not-italic">plano</em>.
                </h2>
              </div>
              <p className="text-muted-foreground text-base md:text-lg max-w-sm">
                Preços transparentes, sem fidelidade e com cancelamento a qualquer momento.
              </p>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan, i) => (
                <ProductCard key={i} plan={plan} index={i} whatsappLink={WHATSAPP_LINK} />
              ))}
            </div>
          </div>
        </section>

        {/* Devices */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="panel p-8 md:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary mb-3">Compatibilidade</div>
                  <h3 className="font-display text-3xl md:text-5xl text-foreground leading-[1.08] mb-4">
                    Assista onde e como quiser.
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    Funciona em qualquer dispositivo moderno — smartphones, smart TVs, TV boxes, notebooks e consoles.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {devices.map((d) => (
                    <div key={d.label} className="flex flex-col items-start gap-3 p-5 rounded-2xl bg-foreground/[0.02] border border-border">
                      <d.icon className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold text-foreground">{d.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="relative rounded-[32px] overflow-hidden panel p-10 md:p-20">
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                <div className="max-w-xl">
                  <h2 className="font-display text-4xl md:text-6xl text-foreground leading-[1.05] mb-4">
                    Pronto para elevar sua <em className="text-gradient-gold not-italic">experiência</em>?
                  </h2>
                  <p className="text-muted-foreground text-base md:text-lg">
                    Junte-se a milhares de clientes e tenha acesso ao melhor conteúdo do mundo agora mesmo.
                  </p>
                </div>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-sm shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.98] transition"
                >
                  Começar agora
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border pt-20 pb-10">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <Tv className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-semibold text-base tracking-tight">
                  iptv<span className="text-primary">felipepro</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A loja de entretenimento digital com entrega imediata e suporte especializado.
              </p>
            </div>

            {[
              { title: "Produtos", items: ["Planos", "Categorias", "Ofertas"] },
              { title: "Suporte", items: ["FAQ", "Central de ajuda", "WhatsApp"] },
              { title: "Legal", items: ["Termos de uso", "Privacidade", "Cookies"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-foreground/80 mb-5">{col.title}</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {col.items.map((it) => (
                    <li key={it}><a href="#" className="hover:text-foreground transition-colors">{it}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">© 2026 IPTVFELIPEPRO. Todos os direitos reservados.</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              Servidores online · Suporte ativo
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp bubble */}
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[110] flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/30"
      >
        <MessageCircle className="h-6 w-6 md:h-7 md:w-7 fill-current" />
      </motion.a>
    </div>
  );
}
