ARG NODE_VERSION=23

FROM node:${NODE_VERSION}-slim as base

WORKDIR /src

# Build
FROM base as build

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# Run
FROM base
ARG PORT=80

EXPOSE $PORT
ENV PORT=$PORT
ENV NODE_ENV=production

COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]
