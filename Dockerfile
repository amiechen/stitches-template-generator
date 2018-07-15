FROM node:8-alpine

WORKDIR /app
ADD package-lock.json /package-lock.json
ADD package.json /package.json
COPY ./node_modules /node_modules

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN npm install

COPY . /app
WORKDIR /app

EXPOSE 3000

ENTRYPOINT ["npm"]
CMD ["start"]
