import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Activity, Crown, Shield, Target, TrendingUp, User, Clock, X, BarChart3, Flame, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Mestre do Branco — IA · Análise Double Blaze" },
      { name: "description", content: "Inteligência artificial para análise probabilística do Double da Blaze em tempo real." },
    ],
  }),
});

type Slot = { n: number; c: "red" | "black" | "white" };
type Phase = "select" | "analyzing" | "confirmed";
type Platform = { id: string; name: string; tone: string };

const PLATFORMS: Platform[] = [
  { id: "blaze", name: "Blaze", tone: "from-[oklch(0.62_0.26_25)] to-[oklch(0.4_0.22_25)]" },
  { id: "jonbet", name: "Jonbet", tone: "from-[oklch(0.62_0.22_145)] to-[oklch(0.4_0.18_145)]" },
];

function randomSlot(): Slot {
  const r = Math.random();
  if (r < 0.07) return { n: 0, c: "white" };
  if (r < 0.535) return { n: 1 + Math.floor(Math.random() * 7), c: "red" };
  return { n: 8 + Math.floor(Math.random() * 7), c: "black" };
}

function pickNumber(c: Slot["c"]): number {
  if (c === "white") return 0;
  if (c === "red") return 1 + Math.floor(Math.random() * 7);
  return 8 + Math.floor(Math.random() * 7);
}

function slotClass(c: Slot["c"], size: "xs" | "sm" | "md" | "lg" = "sm") {
  const base =
    c === "red"
      ? "bg-gradient-to-br from-[oklch(0.62_0.26_25)] to-[oklch(0.38_0.2_25)] text-white shadow-[0_0_18px_oklch(0.62_0.26_25/0.7)]"
      : c === "black"
        ? "bg-gradient-to-br from-[oklch(0.28_0.02_20)] to-[oklch(0.1_0.01_20)] text-white border border-white/10"
        : "bg-gradient-to-br from-white to-zinc-300 text-black shadow-[0_0_18px_oklch(1_0_0/0.45)]";
  const sz =
    size === "xs"
      ? "h-6 w-6 text-[10px]"
      : size === "sm"
        ? "h-9 w-9 text-sm"
        : size === "md"
          ? "h-14 w-14 text-base"
          : "h-32 w-32 text-5xl";
  return `${base} ${sz} grid place-items-center rounded-full font-extrabold`;
}

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now.toLocaleTimeString("pt-BR", { hour12: false });
}

function Index() {
  const [phase, setPhase] = useState<Phase>("select");
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [history, setHistory] = useState<Slot[]>(() => Array.from({ length: 22 }, randomSlot));
  const [countdown, setCountdown] = useState(57);
  const [progress, setProgress] = useState(0);
  const [prediction, setPrediction] = useState<Slot | null>(null);
  const [confirmedIn, setConfirmedIn] = useState(8);
  const time = useClock();
  const tickRef = useRef(0);

  // Analyzing countdown
  useEffect(() => {
    if (phase !== "analyzing") return;
    setProgress(0);
    setCountdown(45 + Math.floor(Math.random() * 20));
    const id = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          // trigger confirmed
          const c2: Slot["c"] = Math.random() < 0.06 ? "white" : Math.random() < 0.5 ? "red" : "black";
          setPrediction({ c: c2, n: pickNumber(c2) });
          setConfirmedIn(8);
          setPhase("confirmed");
          return 0;
        }
        return c - 1;
      });
      setProgress((p) => (p >= 100 ? 0 : p + 2));
      tickRef.current += 1;
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  // Smooth progress while analyzing
  useEffect(() => {
    if (phase !== "analyzing") return;
    const id = setInterval(() => setProgress((p) => Math.min(100, p + 1)), 600);
    return () => clearInterval(id);
  }, [phase]);

  // Confirmed countdown -> resolve & go back to analyzing
  useEffect(() => {
    if (phase !== "confirmed") return;
    const id = setInterval(() => {
      setConfirmedIn((c) => {
        if (c <= 1) {
          setHistory((h) => (prediction ? [prediction, ...h].slice(0, 22) : h));
          setPhase("analyzing");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase, prediction]);

  const stats = useMemo(() => {
    const reds = history.filter((s) => s.c === "red").length;
    const blacks = history.filter((s) => s.c === "black").length;
    const whites = history.filter((s) => s.c === "white").length;
    const total = history.length || 1;
    const best: Slot["c"] = reds >= blacks ? "red" : "black";
    const acc = (Math.max(reds, blacks) / total) * 100;
    const indicated = pickNumber(best);
    return {
      reds, blacks, whites, total, best, indicated,
      accuracy: acc.toFixed(1),
      pRed: ((reds / total) * 100).toFixed(1),
      pBlack: ((blacks / total) * 100).toFixed(1),
      pWhite: ((whites / total) * 100).toFixed(1),
    };
  }, [history]);

  const showcase = history.slice(0, 7);
  const mm = String(Math.floor(countdown / 60)).padStart(2, "0");
  const ss = String(countdown % 60).padStart(2, "0");

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

  return (
    <main className="min-h-screen px-3 py-4 md:px-6 md:py-6">
      <div className="mx-auto max-w-6xl space-y-4">
        <TopBar time={time} platform={platform} onExit={() => setPhase("select")} />

        {/* TOP ROW */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_2fr_1fr]">
          <Pill icon={<Shield className="h-4 w-4" />} label="Estratégia" value="Não Utilizar Gale" />

          <button
            type="button"
            className="panel group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[oklch(0.62_0.26_25)] to-[oklch(0.38_0.22_25)] px-6 py-5 text-center animate-pulse-glow"
          >
            <span className="relative z-10 flex items-center justify-center gap-3 text-lg font-extrabold uppercase tracking-[0.32em] text-white sm:text-2xl">
              <Flame className="h-5 w-5" />
              Analisando
              <span className="font-mono tracking-widest">{mm}:{ss}</span>
            </span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:animate-progress" />
          </button>

          <Pill icon={<Activity className="h-4 w-4" />} label="Status" value="Analisando" valueClass="text-primary" />
        </section>

        {/* SHOWCASE STRIP */}
        <section className="panel px-5 py-6">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {showcase.map((s, i) => (
              <div
                key={`sc-${i}-${s.n}`}
                className={`${slotClass(s.c, i === 3 ? "lg" : i === 2 || i === 4 ? "md" : "sm")} ${i === 3 ? "ring-2 ring-primary ring-offset-4 ring-offset-background" : "opacity-90"}`}
                style={{ animation: i === 3 ? "fade-in 0.6s ease-out" : undefined }}
              >
                {s.n}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-[oklch(0.2_0.02_20)] border border-primary/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[oklch(0.45_0.22_25)] via-[oklch(0.7_0.28_25)] to-[oklch(0.45_0.22_25)] shadow-[0_0_15px_oklch(0.62_0.26_25/0.8)] transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span className="text-primary">◆</span> Verificando entrada ideal... <span className="text-primary">{progress}%</span>
            </p>
          </div>
        </section>

        {/* HISTORY STRIP */}
        <section className="panel px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary">
              <BarChart3 className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground">Casas Anteriores</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Últimas {history.length}</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {history.map((s, i) => (
              <div key={`h-${i}-${s.n}`} className={slotClass(s.c, "xs")}>{s.n}</div>
            ))}
          </div>
        </section>

        {/* BOTTOM CARDS */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="panel px-5 py-5">
            <div className="flex items-center gap-2 text-primary">
              <Target className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground">Cor Mais Indicada</span>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className={slotClass(stats.best, "md")}>{stats.indicated}</div>
              <div>
                <div className="text-3xl font-extrabold text-white">{stats.accuracy}%</div>
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  {stats.best === "red" ? "Vermelho" : "Preto"}
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
                { label: "Vermelho", val: stats.pRed, c: "red" as const },
                { label: "Preto", val: stats.pBlack, c: "black" as const },
                { label: "Branco", val: stats.pWhite, c: "white" as const },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3">
                  <div className={slotClass(row.c, "xs")}>{row.c === "white" ? 0 : ""}</div>
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
              <Mini label="Vermelho" value={stats.reds} c="red" />
              <Mini label="Preto" value={stats.blacks} c="black" />
              <Mini label="Branco" value={stats.whites} c="white" />
            </div>
          </div>
        </section>

        <footer className="pt-2 text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          © {new Date().getFullYear()} Mestre do Branco · Plataforma: {platform?.name ?? "—"} · Apenas entretenimento
        </footer>
      </div>

      {phase === "confirmed" && prediction && (
        <ConfirmedModal slot={prediction} secondsLeft={confirmedIn} onClose={() => {
          setHistory((h) => [prediction, ...h].slice(0, 22));
          setPhase("analyzing");
        }} />
      )}
    </main>
  );
}

function TopBar({ time, platform, onExit }: { time: string; platform: Platform | null; onExit: () => void }) {
  return (
    <header className="panel flex flex-wrap items-center justify-between gap-3 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-primary to-[oklch(0.4_0.2_25)] glow-red">
          <Crown className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-base font-extrabold tracking-[0.18em] text-white sm:text-lg">
            MESTRE DO <span className="text-primary">BRANCO</span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">Inteligência Artificial</p>
        </div>
      </div>
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
        <div className="hidden items-center gap-1.5 rounded-full border border-primary/30 bg-card/60 px-3 py-1.5 text-muted-foreground sm:flex">
          <User className="h-3.5 w-3.5 text-primary" />
          <span className="font-bold uppercase tracking-widest">Admin</span>
        </div>
      </div>
    </header>
  );
}

function Pill({ icon, label, value, valueClass }: { icon: React.ReactNode; label: string; value: string; valueClass?: string }) {
  return (
    <div className="panel flex items-center gap-3 px-4 py-4">
      <div className="grid h-9 w-9 place-items-center rounded-md border border-primary/40 bg-card text-primary">{icon}</div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
        <p className={`text-sm font-extrabold uppercase tracking-wider text-white ${valueClass ?? ""}`}>{value}</p>
      </div>
    </div>
  );
}

function Mini({ label, value, c }: { label: string; value: number; c: Slot["c"] }) {
  return (
    <div className="rounded-lg border border-primary/20 bg-card/50 px-2 py-3">
      <div className={`mx-auto ${slotClass(c, "sm")}`}>{value}</div>
      <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

function PlatformSelect({ time, onSelect }: { time: string; onSelect: (p: Platform) => void }) {
  return (
    <main className="min-h-screen px-3 py-4 md:px-6 md:py-6">
      <div className="mx-auto max-w-4xl space-y-8">
        <TopBar time={time} platform={null} onExit={() => {}} />
        <div className="panel px-6 py-12 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Bem-vindo</p>
          <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-4xl">Escolha qual plataforma a IA</h2>
          <p className="mt-2 text-sm text-muted-foreground">Selecione abaixo onde você vai operar agora</p>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelect(p)}
                className={`panel group relative overflow-hidden rounded-2xl bg-gradient-to-br ${p.tone} px-6 py-10 transition-transform hover:scale-[1.03]`}
              >
                <div className="relative z-10 flex flex-col items-center gap-3 text-white">
                  <Flame className="h-10 w-10 drop-shadow" />
                  <span className="text-2xl font-extrabold uppercase tracking-[0.25em]">{p.name}</span>
                </div>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-progress" />
              </button>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted-foreground">Você pode trocar de plataforma a qualquer momento.</p>
        </div>
      </div>
    </main>
  );
}

function ConfirmedModal({ slot, secondsLeft, onClose }: { slot: Slot; secondsLeft: number; onClose: () => void }) {
  const label = slot.c === "red" ? "NO VERMELHO" : slot.c === "black" ? "NO PRETO" : "NO BRANCO";
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 backdrop-blur-sm animate-fade-in px-4">
      <div className="panel relative w-full max-w-md px-6 py-10 text-center" style={{ animation: "fade-in 0.3s ease-out" }}>
        <button onClick={onClose} className="absolute right-3 top-3 text-muted-foreground hover:text-white">
          <X className="h-4 w-4" />
        </button>
        <div className="mx-auto flex items-center justify-center gap-2 text-success">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-[11px] font-bold uppercase tracking-[0.4em]">Entrada Confirmada</span>
        </div>
        <div className="mt-6 grid place-items-center">
          <div className="relative">
            <div className={`${slotClass(slot.c, "lg")} animate-pulse-glow`}>{slot.n}</div>
            <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-primary/40" />
          </div>
        </div>
        <h3 className="mt-6 text-3xl font-extrabold tracking-[0.2em] text-white">{label}</h3>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-primary">Proteger no branco</p>
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          Iniciando em <span className="text-primary">{String(secondsLeft).padStart(2, "0")}s</span>
        </p>
      </div>
    </div>
  );
}
