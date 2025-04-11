# BUILD STEP
FROM public.ecr.aws/docker/library/node:lts-alpine3.17 AS build
WORKDIR /tmp
COPY ["./bff/package.json", "./"]
RUN npm install --legacy-peer-deps
COPY ["./bff", "."]
RUN npm run build
 
# FINAL STEP
FROM public.ecr.aws/docker/library/node:lts-alpine3.17
WORKDIR /usr/src/app
COPY --chown=node:node --from=build ["/tmp/node_modules", "./node_modules"]
COPY --chown=node:node --from=build ["/tmp/dist", "./dist"]
EXPOSE 3002
USER node
CMD ["node", "dist/main.js"]