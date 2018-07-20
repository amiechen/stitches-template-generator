FROM node:8-alpine

WORKDIR /app
ADD package-lock.json /app/package-lock.json
ADD package.json /app/package.json
COPY ./node_modules /app/node_modules

ENV NODE_PATH=/app/node_modules
ENV PATH=$PATH:/app/node_modules/.bin
RUN npm install

COPY . /app

EXPOSE 3000

ENTRYPOINT ["npm"]
CMD ["start"]
