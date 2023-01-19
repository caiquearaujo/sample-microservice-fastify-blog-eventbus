# Blog Sample Application

This is a simple/sample micro service built with Fastify to handle Event Bus for a Blog application.

> This repository is only for study purposes. Must not be used in production.

## Docker

This application depends on another containers. You must use the `docker-compose` or similar to deploy it. If you want to keep it as an individual container you must share at least the network. The following commands will work in the development env:

1. Build docker image locale `docker build -t eventbus-ms -f ./Dockerfile.dev .`;
2. Run image in background, mapping the application port and specifying a shared network: `docker run -d -p 3000:3000 --volume $(pwd):/usr/app eventbus-ms`;
3. After running, you may see it's running with `docker ps` command.

> When usign docker, you may set env variables inline command with `-e` argument or define it on `docker-compose.yml`. To avoid use to many `-e` arguments on development or test env, you may without `docker-compose` or similar, you may use the `.env.development` or `.env.test` files and setting only `ENVIRONMENT` variable on server env.