FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY package.json ./
COPY server.js ./
COPY public ./public
COPY README.md ./

EXPOSE 3000

USER node

CMD ["npm", "start"]
