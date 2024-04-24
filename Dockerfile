FROM node:18 as build

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM build

RUN npm install -g pm2

COPY --from=build package*.json .

ENV NODE_ENV=production

RUN npm install 

COPY --from=build dist .

CMD ["pm2", "./dist/index.js"]