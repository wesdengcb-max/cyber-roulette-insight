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
  X,
  ShoppingCart,
  Search,
  User,
  Heart,
  Ticket,
  Flame,
  Globe,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { memo, useMemo, useState, useEffect } from "react";

/**
 * JAPASTORE INSPIRED ARCHITECTURE (STORE-FRONT STYLE)
 * 1. Store Header: Persistent shopping cart and user access.
 * 2. Visual Trust: Verified customer reviews with Trustpilot style.
 * 3. Product Grid: Store-like layout for plans (packages).
 * 4. High-Impact Hero: Visual identity focused on the "JapaStore" premium store aesthetic.
 */

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "IPTVFELIPEPRO - A Maior Loja de Streaming do Brasil" },
      { name: "description", content: "Eleve sua experiência de entretenimento ao próximo nível. Mais de 80.000 conteúdos em 4K." },
    ],
  }),
});

// Memoized Sub-components
const ReviewCard = memo(({ user, text, stars, time }: any) => (
  <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 min-w-[300px] md:min-w-[350px] snap-center">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
        {user.charAt(0)}
      </div>
      <div>
        <h4 className="font-bold text-sm text-white">{user}</h4>
        <div className="flex gap-0.5 mt-1">
          {[...Array(stars)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-primary text-primary" />
          ))}
        </div>
      </div>
      <span className="ml-auto text-[10px] text-white/20 font-medium uppercase tracking-wider">{time}</span>
    </div>
    <p className="text-sm text-white/50 leading-relaxed italic">"{text}"</p>
  </div>
));

const ProductCard = memo(({ plan, index, whatsappLink }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group relative bg-[#111] border border-white/5 rounded-3xl overflow-hidden transition-all duration-300 hover:border-primary/30"
  >
    <div className="aspect-[16/10] bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center relative overflow-hidden">
      <Tv className="w-16 h-16 text-primary/40 group-hover:scale-110 transition-transform duration-500" />
      {plan.popular && (
        <div className="absolute top-4 right-4 bg-primary text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase">
          Mais Vendido
        </div>
      )}
      <div className="absolute bottom-4 left-4 flex gap-2">
         <span className="bg-black/50 backdrop-blur-md text-[10px] font-bold px-2 py-1 rounded-md border border-white/5 uppercase">4K HDR</span>
      </div>
    </div>
    
    <div className="p-6 md:p-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-black uppercase tracking-tight text-white mb-1">{plan.name}</h3>
          <p className="text-xs text-white/30 font-medium uppercase tracking-widest">{plan.duration} de Acesso</p>
        </div>
        <div className="text-right">
          <span className="block text-2xl font-black text-primary">R${plan.price}</span>
          <span className="text-[10px] text-white/20 line-through">R${(parseFloat(plan.price) * 1.2).toFixed(2)}</span>
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.slice(0, 4).map((feature: string, i: number) => (
          <li key={i} className="flex items-center gap-3 text-xs font-bold text-white/40 group-hover:text-white/60 transition-colors">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            {feature}
          </li>
        ))}
      </ul>

      <a 
        href={whatsappLink}
        className="flex items-center justify-center gap-2 w-full bg-white text-black py-4 rounded-xl font-black text-sm transition-all hover:bg-primary hover:text-white active:scale-95"
      >
        COMPRE JÁ
        <ChevronRight className="w-4 h-4" />
      </a>
    </div>
  </motion.div>
));

function Index() {
  const WHATSAPP_LINK = useMemo(() => "https://wa.me/5500000000000?text=Olá! Quero conhecer os planos de IPTV.", []);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const reviews = [
    { user: "Vinícius Alexandre", text: "Quando entrei na loja já fui presenteado com um cupom. Suporte solucionou meu problema rápido! 10/10!", stars: 5, time: "Agora" },
    { user: "Gustavo Lima", text: "Atendimento atencioso, produto com qualidade gigante e preço incrível. Recomendo demais.", stars: 5, time: "Há 3 min" },
    { user: "Robert Soares", text: "Conheci pelo Instagram. Suporte é excelente e rapidez, te resolve no instante.", stars: 5, time: "Há 14 min" },
    { user: "Pedro Ramos", text: "Preço acessível e atendimento rápido. Veio tudo certinho. Super recomendo!", stars: 5, time: "Há 8 min" }
  ];

  const plans = [
    { name: "Plano Mensal", price: "35.00", duration: "30 Dias", popular: false, features: ["+80.000 Conteúdos", "Canais 4K & Full HD", "Esportes ao Vivo", "Anti-travamentos", "Suporte VIP"] },
    { name: "Plano Trimestral", price: "85.00", duration: "90 Dias", popular: true, features: ["+80.000 Conteúdos", "Canais 4K & Full HD", "Esportes ao Vivo", "Anti-travamentos", "Suporte VIP"] },
    { name: "Plano Anual", price: "280.00", duration: "365 Dias", popular: false, features: ["+80.000 Conteúdos", "Canais 4K & Full HD", "Esportes ao Vivo", "Anti-travamentos", "Suporte VIP"] }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-primary selection:text-white antialiased overflow-x-hidden">
      
      {/* JapaStore Style Header */}
      <header className={`fixed top-0 z-[100] w-full transition-all duration-500 ${scrolled ? "bg-black/90 backdrop-blur-2xl py-3 border-b border-white/5" : "bg-transparent py-6"}`}>
        <div className="mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:rotate-12">
                <Tv className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase leading-none">IPTV<span className="text-primary">FELIPEPRO</span></span>
            </div>
            
            <nav className="hidden lg:flex items-center gap-8 text-[12px] font-bold tracking-widest uppercase text-white/50">
              {["Categorias", "Comunidade", "Suporte"].map(item => (
                <a key={item} href="#" className="hover:text-primary transition-colors">{item}</a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <div className="hidden md:flex items-center bg-white/5 border border-white/5 rounded-full px-4 py-2 text-white/30 hover:bg-white/10 transition-colors cursor-pointer group">
              <Search className="w-4 h-4 group-hover:text-white transition-colors" />
              <span className="ml-3 text-xs font-bold uppercase tracking-widest">Buscar plano...</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 hover:bg-primary hover:border-primary transition-all active:scale-90">
                <User className="w-5 h-5" />
              </button>
              <button className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 relative group hover:bg-primary hover:border-primary transition-all active:scale-90">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#050505]">0</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* JapaStore Style Hero */}
        <section className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-[#050505] z-10" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent z-10" />
             <motion.img 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 1.5 }}
              src="https://images.unsplash.com/photo-1593784991095-a205039470b6?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-full object-cover"
              alt="TV de alta definição exibindo conteúdo cinematográfico"
              loading="eager"
              decoding="sync"
             />
          </div>

          <div className="relative z-20 mx-auto max-w-7xl px-5 text-center">
             <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
             >
                <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8">
                  <Flame className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Bem-vindo(a) À IPTVFELIPEPRO!</span>
                </div>
                <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-[0.95] tracking-tighter mb-8 max-w-5xl mx-auto">
                  Eleve seu entretenimento <br /> ao <span className="text-primary">Próximo Nível!</span>
                </h1>
                <p className="text-white/40 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
                  Aqui você encontra tudo para elevar sua experiência de apps e streamings. Qualidade real 4K HDR.
                </p>
                
                <div className="flex flex-wrap justify-center gap-6 mb-16">
                  <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl px-6 py-4">
                    <Globe className="w-5 h-5 text-primary" />
                    <div className="text-left">
                      <span className="block text-[10px] font-black text-white/30 uppercase tracking-widest">Acesso</span>
                      <span className="text-sm font-bold text-white">Global</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl px-6 py-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <div className="text-left">
                      <span className="block text-[10px] font-black text-white/30 uppercase tracking-widest">Entrega</span>
                      <span className="text-sm font-bold text-white">Imediata</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl px-6 py-4">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <div className="text-left">
                      <span className="block text-[10px] font-black text-white/30 uppercase tracking-widest">Suporte</span>
                      <span className="text-sm font-bold text-white">24/7 VIP</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                   <a href="#planos" className="w-full sm:w-auto bg-primary text-white px-10 py-5 rounded-2xl font-black text-sm tracking-widest uppercase shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
                      Ver Planos em Oferta
                   </a>
                   <a 
                      href={WHATSAPP_LINK} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-sm tracking-widest uppercase hover:bg-white/10 active:scale-95 transition-all"
                    >
                      Falar no Suporte
                   </a>
                </div>
             </motion.div>
          </div>
        </section>

        {/* Reviews Section - JapaStore Store Style */}
        <section className="py-10 border-y border-white/5 bg-white/[0.01]">
          <div className="mx-auto max-w-7xl px-5">
             <div className="flex items-center gap-4 mb-10 overflow-x-auto snap-x no-scrollbar pb-5">
               {reviews.map((review, i) => (
                 <ReviewCard key={i} {...review} />
               ))}
             </div>
          </div>
        </section>

        {/* Products Grid - JapaStore Category Style */}
        <section id="planos" className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                  <Ticket className="w-3 h-3" />
                  Ofertas por tempo limitado
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">Pacotes em <br /><span className="text-primary">Destaque</span></h2>
              </div>
              <p className="text-white/40 text-base md:text-lg font-medium max-w-sm text-center md:text-right">
                Os com maior promoção agora por tempo limitado. Escolha o seu e comece agora.
              </p>
            </div>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan, i) => (
                <ProductCard key={i} plan={plan} index={i} whatsappLink={WHATSAPP_LINK} />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Banner - Promo Style */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-5">
            <div className="relative rounded-[40px] bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-10 md:p-20 overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="max-w-xl text-center lg:text-left">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-tight mb-6">Pronto para elevar sua <br /> <span className="text-primary">Experiência?</span></h2>
                  <p className="text-white/50 text-lg font-medium leading-relaxed">Junte-se a milhares de clientes e tenha acesso ao melhor conteúdo do mundo agora mesmo.</p>
                </div>
                <a href={WHATSAPP_LINK} className="flex-shrink-0 bg-white text-black px-12 py-6 rounded-2xl font-black text-base tracking-widest uppercase hover:bg-primary hover:text-white transition-all shadow-2xl active:scale-95">
                  COMEÇAR AGORA
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* JapaStore Style Footer */}
      <footer className="border-t border-white/5 py-16 md:py-24 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Tv className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-black tracking-tighter uppercase italic leading-none">IPTV<span className="text-primary">FELIPEPRO</span></span>
              </div>
              <p className="text-xs text-white/30 font-medium leading-relaxed">
                A maior e mais confiável loja de entretenimento digital. Entrega imediata e suporte especializado.
              </p>
            </div>
            
            {["Produtos", "Suporte", "Legal"].map((title, i) => (
              <div key={i}>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6">{title}</h4>
                <ul className="space-y-4 text-xs font-bold text-white/40 uppercase tracking-widest">
                  <li><a href="#" className="hover:text-primary transition-colors">Categorias</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Termos de Uso</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Comunidade</a></li>
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex gap-4">
                <div className="w-8 h-5 bg-white/5 rounded border border-white/5" />
                <div className="w-8 h-5 bg-white/5 rounded border border-white/5" />
                <div className="w-8 h-5 bg-white/5 rounded border border-white/5" />
             </div>
             <p className="text-[10px] font-black text-white/10 tracking-[0.4em] uppercase">© 2026 IPTVFELIPEPRO. INSPIRED BY PREMIUM STORES.</p>
          </div>
        </div>
      </footer>

      {/* Store Support Bubble */}
      <motion.a 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        href={WHATSAPP_LINK}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[110] flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/20 transition-all hover:scale-110 active:shadow-none"
      >
        <MessageCircle className="h-7 w-7 md:h-8 md:w-8 fill-current" />
      </motion.a>
    </div>
  );
}
