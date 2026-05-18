import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Activity, Shield, Target, TrendingUp, User, Clock, X, BarChart3, Flame, CheckCircle2 } from "lucide-react";
import { fetchBlazeRecent, type BlazeSlot } from "@/lib/blaze.functions";

// Simulando assets que não existem localmente mas estão no repo original
const blazeLogo = "https://raw.githubusercontent.com/wesdengcb-max/freitasmestredablaze/main/src/assets/blaze-card.png";
const jonbetLogo = "https://raw.githubusercontent.com/wesdengcb-max/freitasmestredablaze/main/src/assets/jonbet-card.png";
const brancoIcon = "https://raw.githubusercontent.com/wesdengcb-max/freitasmestredablaze/main/src/assets/branco-icon.png";
const freitasBanner = "https://raw.githubusercontent.com/wesdengcb-max/freitasmestredablaze/main/src/assets/freitas-banner.png";
const crownIcon = "https://raw.githubusercontent.com/wesdengcb-max/freitasmestredablaze/main/src/assets/crown-icon.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Freitas Do Branco — IA · Análise Double Blaze" },
      { name: "description", content: "Inteligência artificial para análise probabilística do Double da Blaze em tempo real." },
    ],
  }),
});

type Slot = { n: number; c: "red" | "black" | "white" };
type Phase = "select" | "analyzing" | "confirmed";
type Platform = { id: string; name: string; tone: string; logo: string };

const PLATFORMS: Platform[] = [
  { id: "blaze", name: "Blaze", tone: "from-[oklch(0.62_0.26_25)] to-[oklch(0.4_0.22_25)]", logo: blazeLogo },
  { id: "jonbet", name: "Jonbet", tone: "from-[oklch(0.62_0.22_145)] to-[oklch(0.4_0.18_145)]", logo: jonbetLogo },
];

function slotClass(c: Slot["c"], size: "xs" | "sm" | "md" | "lg" = "sm") {
  const base =
    c === "red"
      ? "bg-[#e94560] text-white"
      : c === "black"
      ? "bg-[#1a1d29] text-white"
      : "bg-white text-[#e94560]";
  const sz =
    size === "xs"
      ? "h-6 w-6 text-[10px]"
      : size === "sm"
      ? "h-9 w-9 text-sm"
      : size === "md"
      ? "h-14 w-14 text-base"
      : "h-24 w-24 text-3xl";
  return `${base} ${sz} grid place-items-center rounded-full font-extrabold shrink-0 select-none`;
}

function SlotChip({
  slot,
  size = "sm",
  label,
  className = "",
}: {
  slot: Slot | null;
  size?: "xs" | "sm" | "md" | "lg";
  label?: React.ReactNode;
  className?: string;
}) {
  const c: Slot["c"] = slot?.c ?? "black";
  const ringSize =
    size === "xs" ? "h-4 w-4" : size === "sm" ? "h-6 w-6" : size === "md" ? "h-10 w-10" : "h-16 w-16";
  const ringBorder = size === "xs" ? "border" : "border-2";
  const ringColor = c === "white" ? "border-[#e94560]/70" : "border-white/85";
  const crownSize =
    size === "xs"
      ? "h-2.5 -top-1.5"
      : size === "sm"
      ? "h-3.5 -top-2"
      : size === "md"
      ? "h-5 -top-3"
      : "h-8 -top-5";
  const showCrown = c === "white";

  if (c === "white" && label === undefined) {
    return (
      <div className={`relative ${slotClass("white", size)} ${className}`}>
        {showCrown && (
          <img
            src={crownIcon}
            alt=""
            aria-hidden
            className={`pointer-events-none absolute left-1/2 -translate-x-1/2 ${crownSize} w-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] select-none`}
          />
        )}
        <img
          src={brancoIcon}
          alt=""
          aria-hidden
          className="h-[78%] w-[78%] object-contain select-none rounded-full"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div className={`relative ${slotClass(c, size)} ${className}`}>
      {showCrown && (
        <img
          src={crownIcon}
          alt=""
          aria-hidden
          className={`pointer-events-none absolute left-1/2 -translate-x-1/2 ${crownSize} w-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] select-none`}
        />
      )}
      <div
        className={`${ringSize} ${ringBorder} ${ringColor} rounded-full grid place-items-center leading-none`}
      >
        <span>{label !== undefined ? label : slot?.n ?? ""}</span>
      </div>
    </div>
  );
}

function deriveSignal(history: Slot[]): Slot {
  const counts = history.reduce(
    (acc, slot) => {
      acc[slot.c] += 1;
      acc.numbers.set(slot.n, (acc.numbers.get(slot.n) ?? 0) + 1);
      return acc;
    },
    { red: 0, black: 0, white: 0, numbers: new Map<number, number>() },
  );

  const c: Slot["c"] = counts.red >= counts.black ? "red" : "black";
  const n = history
    .filter((slot) => slot.c === c)
    .sort((a, b) => (counts.numbers.get(b.n) ?? 0) - (counts.numbers.get(a.n) ?? 0))[0]?.n ?? (c === "red" ? 1 : 8);

  return { c, n };
}

function useClock() {
  const [now, setNow] = useState<string>("");

  useEffect(() => {
    const tick = () => setNow(new Date().toLocaleTimeString("pt-BR", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return now;
}

function Index() {
  const [phase, setPhase] = useState<Phase>("select");
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [history, setHistory] = useState<Slot[]>([]);
  const [flashId, setFlashId] = useState<string | null>(null);
  const lastIdRef = useRef<string | null>(null);
  const [prediction, setPrediction] = useState<Slot | null>(null);
  const [confirmedIn, setConfirmedIn] = useState(8);
  const time = useClock();
  const historyRef = useRef<Slot[]>([]);

  const platformId = (platform?.id === "jonbet" ? "jonbet" : "blaze") as "blaze" | "jonbet";
  const fetchRecent = useServerFn(fetchBlazeRecent);
  const { data: live } = useQuery({
    queryKey: ["roulette-recent", platformId],
    queryFn: async () => {
      const response = await fetchRecent({ data: { platform: platformId } });
      return response;
    },
    enabled: phase !== "select",
    refetchInterval: 3000,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    const items = live?.data;
    if (!items || items.length === 0) return;

    const mapped: Slot[] = items.map((s: BlazeSlot) => ({ n: s.n, c: s.c }));
    historyRef.current = mapped;
    setHistory(mapped);

    const newest = items[0];
    if (newest.id !== lastIdRef.current) {
      lastIdRef.current = newest.id;
      setFlashId(newest.id);
      setTimeout(() => setFlashId(null), 900);
    }
  }, [live]);

  useEffect(() => {
    if (phase !== "confirmed") return;

    const id = setInterval(() => {
      setConfirmedIn((c) => {
        if (c <= 1) {
          setPhase("analyzing");
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [phase]);

  const stats = useMemo(() => {
    const reds = history.filter((s) => s.c === "red").length;
    const blacks = history.filter((s) => s.c === "black").length;
    const whites = history.filter((s) => s.c === "white").length;
    const total = history.length || 1;
    const best: Slot["c"] = reds >= blacks ? "red" : "black";
    const acc = (Math.max(reds, blacks) / total) * 100;
    const indicated = deriveSignal(history).n;
    return {
      reds, blacks, whites, total, best, indicated,
      accuracy: acc.toFixed(1),
      pRed: ((reds / total) * 100).toFixed(1),
      pBlack: ((blacks / total) * 100).toFixed(1),
      pWhite: ((whites / total) * 100).toFixed(1),
    };
  }, [history]);

  const showcase: (Slot | null)[] = [
    history[6] ?? null,
    history[5] ?? null,
    history[4] ?? null,
    history[3] ?? null,
    history[2] ?? null,
    history[1] ?? null,
    history[0] ?? null,
  ];

  if (phase === "select") {
    return (
      <PlatformSelect
        time={time}
        onSelect={(p) => {
          setPlatform(p);
          setPhase("analyzing");
        }}
      />
    );
  }

  const themeClass = platform?.id === "jonbet" ? "theme-jonbet" : "";

  return (
    <main className={`min-h-screen px-3 py-4 md:px-6 md:py-6 ${themeClass}`}>
      <div className="mx-auto max-w-6xl space-y-4">
        <TopBar time={time} platform={platform} onExit={() => setPhase("select")} onHome={() => setPhase("select")} />

        <section className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_2fr_1fr]">
          <Pill icon={<Shield className="h-4 w-4" />} label="Estratégia" value="Não Utilizar Gale" />

          <button
            type="button"
            onClick={() => {
              setPrediction(deriveSignal(historyRef.current));
              setConfirmedIn(8);
              setPhase("confirmed");
            }}
            className="panel group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[oklch(0.62_0.26_25)] to-[oklch(0.38_0.22_25)] px-6 py-5 text-center animate-pulse-glow transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center justify-center gap-3 text-lg font-extrabold uppercase tracking-[0.32em] text-white sm:text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              <Flame className="h-5 w-5 fill-white" />
              Analisar
            </span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:animate-progress" />
          </button>

          <Pill icon={<Activity className="h-4 w-4" />} label="Status" value="Analisando" valueClass="text-primary" />
        </section>

        <section className="panel px-5 py-6">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {showcase.map((s, i) => (
              <SlotChip
                key={`sc-${i}-${s?.n ?? "empty"}`}
                slot={s}
                size={i === 6 ? "lg" : i === 5 ? "md" : "sm"}
                className={`${i === 6 ? "ring-2 ring-primary ring-offset-4 ring-offset-background" : "opacity-90"} ${flashId && i === 6 ? "ring-4 ring-primary scale-110 transition-transform" : ""}`}
              />
            ))}
          </div>

          <div className="mt-6">
            <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span className="text-primary">◆</span> Clique em <span className="text-primary font-bold">ANALISAR</span> para receber o sinal
            </p>
          </div>
        </section>

        <section className="panel px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary">
              <BarChart3 className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground">Casas Anteriores</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Últimas {history.length}</span>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-1.5">
            {[...history].reverse().map((s, i) => (
              <SlotChip key={`h-${i}-${s.n}`} slot={s} size="xs" />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="panel px-5 py-5">
            <div className="flex items-center gap-2 text-primary">
              <Target className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground">Cor Mais Indicada</span>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <SlotChip slot={{ c: stats.best, n: stats.indicated }} size="md" />
              <div>
                <div className="text-3xl font-extrabold text-white">{stats.accuracy}%</div>
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  {platform?.id === "jonbet" && stats.best === "red" ? "Verde" : stats.best === "red" ? "Vermelho" : "Preto"}
                </div>
              </div>
            </div>
          </div>

          <div className="panel px-5 py-5">
            <div className="flex items-center gap-2 text-primary">
              <TrendingUp className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground">Chances da Jogada</span>
            </div>
            <div className="mt-4 space-y-2.5">
              {[
                { label: platform?.id === "jonbet" ? "Verde" : "Vermelho", val: stats.pRed, c: "red" as const },
                { label: "Preto", val: stats.pBlack, c: "black" as const },
                { label: "Branco", val: stats.pWhite, c: "white" as const },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3">
                  <SlotChip slot={{ c: row.c, n: 0 }} size="xs" label="" />
                  <div className="flex-1">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[oklch(0.2_0.02_20)]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-[oklch(0.7_0.28_25)] transition-all"
                        style={{ width: `${row.val}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-14 text-right text-sm font-bold text-white">{row.val}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel px-5 py-5">
            <div className="flex items-center gap-2 text-primary">
              <Activity className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground">Quantidade de Vezes</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <Mini label={platform?.id === "jonbet" ? "Verde" : "Vermelho"} value={stats.reds} c="red" />
              <Mini label="Preto" value={stats.blacks} c="black" />
              <Mini label="Branco" value={stats.whites} c="white" />
            </div>
          </div>
        </section>

        <section className="panel overflow-hidden p-0">
          <img
            src={freitasBanner}
            alt="Freitas White Branco — Não se esqueça do gerenciamento"
            className="w-full h-auto block"
            loading="lazy"
          />
        </section>

        <footer className="pt-2 text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          © {new Date().getFullYear()} Freitas Do Branco · Plataforma: {platform?.name ?? "—"} · Apenas entretenimento
        </footer>
      </div>

      {phase === "confirmed" && prediction && (
        <ConfirmedModal
          slot={prediction}
          secondsLeft={confirmedIn}
          platformId={platform?.id}
          onClose={() => {
            setPhase("analyzing");
          }}
        />
      )}
    </main>
  );
}

function TopBar({ time, platform, onExit, onHome }: { time: string; platform: Platform | null; onExit: () => void; onHome?: () => void }) {
  return (
    <header className="panel flex flex-wrap items-center justify-between gap-3 px-4 py-3">
      <button onClick={onHome} className="flex items-center gap-3 transition-transform active:scale-95 text-left">
        <div className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.4_0.2_25)] glow-red overflow-visible">
          <img src={brancoIcon} alt="Freitas do Branco" className="h-7 w-7 object-contain rounded-full" />
          <img src={crownIcon} alt="" aria-hidden className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 h-4 w-auto drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]" />
        </div>
        <div>
          <h1 className="text-base font-extrabold tracking-[0.18em] text-white sm:text-lg">
            FREITAS DO <span className="text-primary">BRANCO</span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">Inteligência Artificial</p>
        </div>
      </button>
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {platform && (
          <button onClick={onExit} className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-card/60 px-3 py-1.5 text-muted-foreground hover:text-white transition-colors">
            <span className="font-bold uppercase tracking-widest text-primary">{platform.name}</span>
            <X className="h-3 w-3" />
          </button>
        )}
        <div className="flex items-center gap-1.5 rounded-full border border-[oklch(0.72_0.2_145/0.4)] bg-[oklch(0.2_0.05_145/0.2)] px-3 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="font-bold uppercase tracking-widest text-success">Online</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-card/60 px-3 py-1.5 text-muted-foreground">
          <Clock className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono">{time}</span>
        </div>
      </div>
    </header>
  );
}

function Pill({ icon, label, value, valueClass }: { icon: React.ReactNode; label: string; value: string; valueClass?: string }) {
  return (
    <div className="panel flex items-center gap-3 px-4 py-4">
      <div className="grid h-9 w-9 place-items-center rounded-md border border-primary/40 bg-card text-primary">{icon}</div>
      <div className="text-left">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
        <p className={`text-sm font-extrabold uppercase tracking-wider text-white ${valueClass ?? ""}`}>{value}</p>
      </div>
    </div>
  );
}

function Mini({ label, value, c }: { label: string; value: number; c: Slot["c"] }) {
  return (
    <div className="rounded-lg border border-primary/20 bg-card/50 px-2 py-3 transition-colors hover:bg-card/70">
      <div className="mx-auto flex justify-center">
        <SlotChip slot={{ c, n: value }} size="sm" label={value} />
      </div>
      <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function PlatformSelect({ time, onSelect }: { time: string; onSelect: (p: Platform) => void }) {
  return (
    <main className="min-h-screen px-3 py-4 md:px-6 md:py-6">
      <div className="mx-auto max-w-4xl space-y-8">
        <TopBar time={time} platform={null} onExit={() => {}} onHome={() => {}} />
        <div className="panel px-6 py-12 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Bem-vindo</p>
          <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-4xl">Escolha sua plataforma</h2>
          <p className="mt-2 text-sm text-muted-foreground">Onde você vai operar agora?</p>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelect(p)}
                className={`panel group relative overflow-hidden rounded-2xl bg-gradient-to-br ${p.tone} px-6 py-10 transition-transform hover:scale-[1.03] active:scale-[0.98]`}
              >
                <div className="relative z-10 flex flex-col items-center gap-4 text-white">
                  <div className="h-16 w-16 overflow-hidden rounded-xl border border-white/20 shadow-lg">
                    <img src={p.logo} alt={p.name} className="h-full w-full object-cover" />
                  </div>
                  <span className="text-2xl font-extrabold uppercase tracking-[0.25em]">{p.name}</span>
                </div>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-progress" />
              </button>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted-foreground">Análise probabilística em tempo real via IA</p>
        </div>
      </div>
    </main>
  );
}

function ConfirmedModal({ slot, secondsLeft, onClose, platformId }: { slot: Slot; secondsLeft: number; onClose: () => void; platformId?: string }) {
  const isJonbet = platformId === "jonbet";
  const label = slot.c === "red" ? (isJonbet ? "NO VERDE" : "NO VERMELHO") : slot.c === "black" ? "NO PRETO" : "NO BRANCO";
  
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 backdrop-blur-sm animate-fade-in px-4">
      <div className="panel relative w-full max-w-md px-6 py-10 text-center" style={{ animation: "fade-in 0.3s ease-out" }}>
        <button onClick={onClose} className="absolute right-3 top-3 text-muted-foreground hover:text-white transition-colors">
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 flex flex-col items-center">
          <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-success/20 text-success">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-success">Entrada Confirmada</p>
          <h2 className="mt-2 text-3xl font-black text-white">JOGAR {label}</h2>
        </div>

        <div className="mb-8 flex flex-col items-center justify-center gap-6">
          <div className="relative">
            <SlotChip slot={slot} size="lg" className="glow-red-strong scale-110" />
            <div className="absolute -right-4 -top-4 grid h-10 w-10 place-items-center rounded-full bg-primary font-mono text-lg font-bold text-white shadow-lg ring-2 ring-background">
              {secondsLeft}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <SlotChip slot={{ c: "white", n: 0 }} size="sm" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Proteger no Branco</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-xl bg-gradient-to-r from-primary to-[oklch(0.4_0.22_25)] py-4 font-black uppercase tracking-[0.2em] text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Fechar Sinal
        </button>

        <p className="mt-4 text-[10px] uppercase tracking-widest text-muted-foreground">
          Aguarde o resultado para uma nova análise
        </p>
      </div>
    </div>
  );
}
