# Instruções

## server

```bash
  cd server
  pnpm install

  docker-compose up -d
  pnpm db:migrate
  pnpm dev
```

rodando a partir do dockerfile

```bash
  cd server
  docker build -t brev-ly .
  docker run -p 3333:3333 --env-file .env brev-ly-server
```

## web
com o server rodando execute: 

```bash
  cd web
  pnpm install
  pnpm dev
```
