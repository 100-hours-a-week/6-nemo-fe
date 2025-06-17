FROM node:22-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.10.0 --activate

COPY . .

RUN pnpm install --frozen-lockfile

EXPOSE 3000

CMD ["pnpm", "start"]
