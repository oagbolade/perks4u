# Docker Image for Building services in this directory
FROM node:18.15.0

ARG GITHUB_TOKEN
ARG GITHUB_OWNER

ENV PORT 80
EXPOSE 80

RUN echo "//npm.pkg.github.com/:_authToken=$GITHUB_TOKEN" >> $HOME/.npmrc
RUN echo "@${GITHUB_OWNER}:registry=https://npm.pkg.github.com/${GITHUB_OWNER}" >> $HOME/.npmrc

RUN npm install -g pm2@latest

WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json

## Install and delete credentials
RUN npm ci && rm $HOME/.npmrc && npm cache clean --force

COPY . .

RUN npm test && npm run build

CMD ["pm2", "start", "-s", "dist/index.js", "--name", "app", "--no-daemon"]
