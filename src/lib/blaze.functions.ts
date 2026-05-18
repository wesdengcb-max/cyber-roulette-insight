import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type BlazeSlot = {
  id: string;
  n: number;
  c: "red" | "black" | "white";
  createdAt: string;
};

export type RoulettePlatform = "blaze" | "jonbet";

type Raw = {
  id: string;
  color: 0 | 1 | 2;
  roll: number;
  created_at: string;
};

const ENDPOINTS: Record<RoulettePlatform, { primary: string; label: string }> = {
  blaze: {
    primary: "https://blaze.bet.br/api/singleplayer-originals/originals/roulette_games/recent/1",
    label: "Blaze",
  },
  jonbet: {
    primary: "https://jonbet.bet.br/api/singleplayer-originals/originals/roulette_games/recent/1",
    label: "Jonbet",
  },
};

function buildEndpoints(platform: RoulettePlatform) {
  const { primary, label } = ENDPOINTS[platform];
  const cacheBust = `_=${Date.now()}`;
  const url = `${primary}?${cacheBust}`;

  return [
    { url, source: `${label} direto` },
    {
      url: `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
      source: `${label} via proxy`,
    },
  ];
}

export const fetchBlazeRecent = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) =>
    z.object({ platform: z.enum(["blaze", "jonbet"]).default("blaze") }).parse(input ?? {}),
  )
  .handler(
    async ({
      data,
    }): Promise<{ data: BlazeSlot[]; error: string | null; source: string | null; platform: RoulettePlatform }> => {
      const platform = data.platform;
      let lastError = "Nenhum endpoint disponível";

      for (const endpoint of buildEndpoints(platform)) {
        try {
          console.log(`[${platform}] Buscando histórico real:`, endpoint.source);
          const res = await fetch(endpoint.url, {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
              Accept: "application/json, text/plain, */*",
            },
            cache: "no-store",
          });

          console.log(`[${platform}] Status:`, res.status, endpoint.source);
          if (!res.ok) {
            lastError = `${endpoint.source} -> HTTP ${res.status}`;
            continue;
          }

          const raw = (await res.json()) as Raw[];
          if (!Array.isArray(raw) || raw.length === 0) {
            lastError = `${endpoint.source} -> vazio`;
            continue;
          }

          const slots: BlazeSlot[] = raw
            .filter(
              (r) =>
                typeof r.id === "string" && typeof r.roll === "number" && [0, 1, 2].includes(r.color),
            )
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(0, 22)
            .map((r) => ({
              id: r.id,
              n: r.roll,
              c: r.color === 0 ? "white" : r.color === 1 ? "red" : "black",
              createdAt: r.created_at,
            }));

          return { data: slots, error: null, source: endpoint.source, platform };
        } catch (e) {
          lastError = `${endpoint.source} -> ${(e as Error).message}`;
          console.error(`[${platform}] Erro de fetch:`, lastError);
        }
      }

      console.error(`[${platform}] fetchBlazeRecent falhou:`, lastError);
      return { data: [], error: lastError, source: null, platform };
    },
  );
