FROM node:18 as build

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM build

RUN npm install -g pm2

COPY --from=build package*.json .

RUN npm install --omit=dev 

COPY --from=build dist .

RUN ls

CMD ["pm2", "index.js"]

RUN echo "app is running"