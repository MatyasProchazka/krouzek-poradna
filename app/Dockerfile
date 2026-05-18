# ============================================================================
# Dockerfile – návod, jak z aplikace sestavit "image" (balíček se vším potřebným)
# ----------------------------------------------------------------------------
# Docker zabalí aplikaci i s Node.js a knihovnami do kontejneru, který běží
# všude stejně: na tvém počítači, na serveru i v cloudu. Konec "u mě to funguje".
#
# Multi-stage build: v první fázi aplikaci sestavíme (potřebujeme všechny
# nástroje), do druhé fáze zkopírujeme jen výsledek. Výsledný image je malý.
#
# Sestavení:  docker build -t poradna .
# Spuštění:   docker run -p 3000:3000 -e JWT_SECRET=tajne -v poradna-data:/data poradna
# ============================================================================

# ---- 1. fáze: build -------------------------------------------------------
FROM node:22-bookworm-slim AS build
WORKDIR /app

# Nejdřív jen package.json a lockfile. Docker si kroky ukládá do cache:
# dokud se nezmění závislosti, npm ci se při dalším buildu přeskočí.
COPY package.json package-lock.json ./
RUN npm ci

# Teprve teď zbytek kódu (mění se často)
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- 2. fáze: běh ---------------------------------------------------------
FROM node:22-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    DB_PATH=/data/poradna.db

# Aplikace nepoběží pod uživatelem root. Kdyby ji někdo napadl, má
# v kontejneru co nejméně práv (princip nejmenších oprávnění).
RUN useradd --system --uid 1001 nextjs && mkdir /data && chown nextjs /data

COPY --from=build --chown=nextjs /app/.next/standalone ./
COPY --from=build --chown=nextjs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs /app/public ./public

USER nextjs
EXPOSE 3000

# Složka /data přežije restart i aktualizaci kontejneru (je tam databáze)
VOLUME ["/data"]

# Docker si sám kontroluje, jestli aplikace odpovídá (viz api/health)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD node -e "fetch('http://localhost:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
