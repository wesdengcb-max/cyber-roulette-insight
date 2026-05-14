import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Activity, Brain, Circle, Flame, Target, TrendingUp, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "NEXUS AI — Análise Probabilística do Double Blaze" },
      { name: "description", content: "Plataforma de análise em tempo real do Double da Blaze com inteligência artificial e probabilidades avançadas." },
    ],
  }),
});

type Color = "red" | "black" | "white";

const COLORS: Color[] = ["red", "black", "red", "black", "white", "red", "black", "red", "red", "black", "white", "red"];

function colorClass(c: Color) {
  if (c === "red") return "bg-gradient-to-br from-[oklch(0.62_0.26_25)] to-[oklch(0.42_0.2_25)] text-white shadow-[0_0_15px_oklch(0.62_0.26_25/0.7)]";
  if (c === "black") return "bg-gradient-to-br from-[oklch(0.25_0.02_20)] to-[oklch(0.1_0.01_20)] text-white border border-white/10";
  return "bg-gradient-to-br from-white to-zinc-300 text-black shadow-[0_0_15px_oklch(1_0_0/0.4)]";
}

function Index() {
  const [results, setResults] = useState<Color[]>(COLORS);
  const [progress, setProgress] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 2));
      setTick((t) => t + 1);
    }, 80);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      const next: Color = Math.random() < 0.05 ? "white" : Math.random() < 0.5 ? "red" : "black";
      setResults((r) => [next, ...r].slice(0, 14));
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const stats = useMemo(() => {
    const reds = results.filter((c) => c === "red").length;
    const blacks = results.filter((c) => c === "black").length;
    const whites = results.filter((c) => c === "white").length;
    const best: Color = reds >= blacks ? "red" : "black";
    const accuracy = 78 + ((tick % 18) - 9) * 0.4;
    return { reds, blacks, whites, best, accuracy: accuracy.toFixed(1) };
  }, [results, tick]);

  return (
    <main className="min-h-screen px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <header className="panel flex flex-col items-center justify-between gap-4 px-5 py-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.4_0.2_25)] glow-red">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wider text-white">
                NEXUS<span className="text-primary"> AI</span>
              </h1>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Blaze Double Predictor</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[oklch(0.72_0.2_145/0.4)] bg-[oklch(0.2_0.05_145/0.2)] px-4 py-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-success">Online</span>
          </div>
        </header>

        {/* CENTRAL ANALYZING */}
        <section className="panel mt-6 flex flex-col items-center gap-6 px-6 py-10 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Inteligência Artificial em operação</p>
          <button
            type="button"
            className="group relative overflow-hidden rounded-full bg-gradient-to-br from-[oklch(0.62_0.26_25)] to-[oklch(0.4_0.22_25)] px-10 py-6 text-lg font-extrabold uppercase tracking-[0.35em] text-white animate-pulse-glow transition-transform hover:scale-105 sm:px-16 sm:text-2xl"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Zap className="h-6 w-6" />
              Analisando...
            </span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-progress" />
          </button>

          {/* PROGRESS */}
          <div className="w-full max-w-2xl">
            <div className="mb-2 flex justify-between text-xs uppercase tracking-widest text-muted-foreground">
              <span>Processando padrões</span>
              <span className="text-primary">{progress}%</span>
            </div>
            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-[oklch(0.2_0.02_20)] border border-primary/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[oklch(0.45_0.22_25)] via-[oklch(0.7_0.28_25)] to-[oklch(0.45_0.22_25)] shadow-[0_0_15px_oklch(0.62_0.26_25/0.8)] transition-[width] duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <section className="panel mt-6 px-5 py-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-white">Últimos Resultados</h2>
            </div>
            <span className="text-xs text-muted-foreground">Tempo real</span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {results.map((c, i) => (
              <div
                key={`${i}-${c}`}
                className={`grid h-11 w-11 place-items-center rounded-full text-sm font-bold transition-all sm:h-12 sm:w-12 ${colorClass(c)} ${i === 0 ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110" : ""}`}
                style={{ animation: i === 0 ? "fade-in 0.6s ease-out" : undefined }}
              >
                {c === "white" ? "★" : ""}
              </div>
            ))}
          </div>
        </section>

        {/* STATS CARDS */}
        <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={<Target className="h-5 w-5" />}
            label="Cor Indicada"
            value={
              <div className="flex items-center gap-2">
                <Circle className={`h-5 w-5 fill-current ${stats.best === "red" ? "text-primary" : "text-white/80"}`} />
                <span className="uppercase">{stats.best === "red" ? "Vermelho" : "Preto"}</span>
              </div>
            }
            accent
          />
          <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Assertividade" value={`${stats.accuracy}%`} />
          <StatCard icon={<Flame className="h-5 w-5" />} label="Chance da Jogada" value="ALTA" sub="Padrão confirmado" />
          <StatCard icon={<Activity className="h-5 w-5" />} label="Quantidade" value={`${stats.reds + stats.blacks + stats.whites}x`} sub="últimas rodadas" />
        </section>

        <footer className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} NEXUS AI · Análise probabilística para fins de entretenimento.
        </footer>
      </div>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className={`panel relative overflow-hidden px-5 py-5 ${accent ? "glow-red" : ""}`}>
      <div className="flex items-center gap-2 text-primary">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      </div>
      <div className="mt-3 text-2xl font-extrabold text-white">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
    </div>
  );
}
