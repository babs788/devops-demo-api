FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:20-alpine
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "src/index.js"]
