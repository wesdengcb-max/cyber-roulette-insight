import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Activity, Crown, Shield, Target, TrendingUp, User, Clock, Mic } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Mestre do Branco — Inteligência Artificial Double Blaze" },
      { name: "description", content: "Painel de inteligência artificial para análise probabilística do Double da Blaze em tempo real." },
    ],
  }),
});

type Slot = { n: number; c: "red" | "black" | "white" };

function randomSlot(): Slot {
  const r = Math.random();
  if (r < 0.07) return { n: 0, c: "white" };
  if (r < 0.535) return { n: 1 + Math.floor(Math.random() * 7), c: "red" };
  return { n: 8 + Math.floor(Math.random() * 7), c: "black" };
}

const INITIAL: Slot[] = Array.from({ length: 12 }, () => randomSlot());

function slotClass(c: Slot["c"]) {
  if (c === "red") return "bg-gradient-to-br from-[oklch(0.62_0.26_25)] to-[oklch(0.38_0.2_25)] text-white shadow-[0_0_18px_oklch(0.62_0.26_25/0.7)]";
  if (c === "black") return "bg-gradient-to-br from-[oklch(0.28_0.02_20)] to-[oklch(0.1_0.01_20)] text-white border border-white/10";
  return "bg-gradient-to-br from-white to-zinc-300 text-black shadow-[0_0_18px_oklch(1_0_0/0.45)]";
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
  const [results, setResults] = useState<Slot[]>(INITIAL);
  const [progress, setProgress] = useState(0);
  const [tick, setTick] = useState(0);
  const time = useClock();

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 2));
      setTick((t) => t + 1);
    }, 80);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setResults((r) => [randomSlot(), ...r].slice(0, 12));
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const stats = useMemo(() => {
    const reds = results.filter((s) => s.c === "red").length;
    const blacks = results.filter((s) => s.c === "black").length;
    const whites = results.filter((s) => s.c === "white").length;
    const total = results.length;
    const best: Slot["c"] = reds >= blacks ? "red" : "black";
    const acc = (Math.max(reds, blacks) / total) * 100 + ((tick % 10) - 5) * 0.1;
    return {
      reds,
      blacks,
      whites,
      total,
      best,
      accuracy: acc.toFixed(1),
      pRed: ((reds / total) * 100).toFixed(1),
      pBlack: ((blacks / total) * 100).toFixed(1),
      pWhite: ((whites / total) * 100).toFixed(1),
    };
  }, [results, tick]);

  const showcase = results.slice(0, 3);

  return (
    <main className="min-h-screen px-3 py-4 md:px-6 md:py-6">
      <div className="mx-auto max-w-6xl space-y-4">
        {/* TOP BAR */}
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
          <div className="flex items-center gap-2 text-xs">
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

        {/* MAIN ROW: STRATEGY | ANALYZING | STATUS */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_2fr_1fr]">
          <div className="panel flex items-center gap-3 px-4 py-4">
            <div className="grid h-9 w-9 place-items-center rounded-md border border-primary/40 bg-card text-primary">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Estratégia</p>
              <p className="text-sm font-extrabold uppercase tracking-wider text-white">Não Utilizar Gale</p>
            </div>
          </div>

          <button
            type="button"
            className="panel group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[oklch(0.62_0.26_25)] to-[oklch(0.38_0.22_25)] px-6 py-5 text-center animate-pulse-glow transition-transform hover:scale-[1.02]"
          >
            <span className="relative z-10 flex items-center justify-center gap-3 text-xl font-extrabold uppercase tracking-[0.35em] text-white sm:text-2xl">
              <Mic className="h-5 w-5" />
              Analisando...
            </span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:animate-progress" />
          </button>

          <div className="panel flex items-center gap-3 px-4 py-4">
            <div className="grid h-9 w-9 place-items-center rounded-md border border-primary/40 bg-card text-primary">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Status</p>
              <p className="text-sm font-extrabold uppercase tracking-wider text-primary">Analisando</p>
            </div>
          </div>
        </section>

        {/* RESULT SHOWCASE + PROGRESS */}
        <section className="panel px-5 py-6">
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            {showcase.map((s, i) => (
              <div
                key={`${i}-${s.n}-${s.c}`}
                className={`grid place-items-center rounded-full text-2xl font-extrabold transition-all sm:text-3xl ${slotClass(s.c)} ${i === 0 ? "h-20 w-20 ring-2 ring-primary ring-offset-4 ring-offset-background sm:h-24 sm:w-24" : "h-14 w-14 opacity-80 sm:h-16 sm:w-16"}`}
                style={{ animation: i === 0 ? "fade-in 0.6s ease-out" : undefined }}
              >
                {s.n}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-[oklch(0.2_0.02_20)] border border-primary/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[oklch(0.45_0.22_25)] via-[oklch(0.7_0.28_25)] to-[oklch(0.45_0.22_25)] shadow-[0_0_15px_oklch(0.62_0.26_25/0.8)] transition-[width] duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span className="text-primary">◆</span> Verificando entrada ideal... <span className="text-primary">{progress}%</span>
            </p>
          </div>
        </section>

        {/* BOTTOM STATS */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* COR MAIS INDICADA */}
          <div className="panel px-5 py-5">
            <div className="flex items-center gap-2 text-primary">
              <Target className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground">Cor Mais Indicada</span>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className={`grid h-14 w-14 place-items-center rounded-full text-lg font-extrabold ${slotClass(stats.best)}`}>
                {stats.best === "red" ? "R" : "P"}
              </div>
              <div>
                <div className="text-3xl font-extrabold text-white">{stats.accuracy}%</div>
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  {stats.best === "red" ? "Vermelho" : "Preto"}
                </div>
              </div>
            </div>
          </div>

          {/* CHANCES DA JOGADA */}
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
                  <div className={`grid h-7 w-7 place-items-center rounded-full text-[11px] font-extrabold ${slotClass(row.c)}`}>
                    {row.c === "white" ? "0" : row.c === "red" ? "R" : "P"}
                  </div>
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

          {/* QUANTIDADE DE VEZES */}
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
          © {new Date().getFullYear()} Mestre do Branco · Análise probabilística para fins de entretenimento
        </footer>
      </div>
    </main>
  );
}

function Mini({ label, value, c }: { label: string; value: number; c: Slot["c"] }) {
  return (
    <div className="rounded-lg border border-primary/20 bg-card/50 px-2 py-3">
      <div className={`mx-auto grid h-9 w-9 place-items-center rounded-full text-sm font-extrabold ${slotClass(c)}`}>
        {value}
      </div>
      <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}
