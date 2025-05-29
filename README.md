# 🚀 Brev.ly - Seu Encurtador de URLs

Este projeto é um encurtador de URLs simples e eficiente, dividido em duas partes principais: o Server (backend) e a Web (frontend). Siga as instruções abaixo para configurar e rodar a aplicação.

## ⚙️ Configuração Inicial
Antes de iniciar qualquer serviço, certifique-se de configurar seu arquivo de variáveis de ambiente.

Crie um arquivo .env na raiz da pasta server.

Configure as variáveis de ambiente necessárias para o servidor disponíveis no .env.example, especialmente as relacionadas ao banco de dados.

## 💻 Server (Backend)
Você pode rodá-lo de duas formas: diretamente ou via Docker.

### ➡️ Rodando o Server Localmente
Navegue até a pasta do servidor:

```bash
cd server
```

Instale as dependências:
```bash
pnpm install
```

Inicie o Banco de Dados (PostgreSQL com Docker Compose):
```bash
docker-compose up -d
```

Este comando irá iniciar um contêiner Docker com o banco de dados PostgreSQL. Certifique-se de que o Docker esteja em execução na sua máquina.
Execute as Migrações do Banco de Dados:
```bash
pnpm db:migrate
```

Inicie o Servidor:

```bash
pnpm dev
```

O servidor estará rodando, geralmente na porta 3333.

#### ➡️ Rodando o Server via Dockerfile
Se preferir rodar o backend encapsulado em um contêiner Docker:

Construa a imagem Docker:
```bash
docker build -t brev-ly-server .
```

Isso criará uma imagem Docker chamada brev-ly-server.
Execute o contêiner Docker:
```bash
docker run -p 3333:3333 --env-file .env brev-ly-server
```

Este comando iniciará o servidor dentro de um contêiner Docker, mapeando a porta 3333 do contêiner para a porta 3333 da sua máquina local e carregando as variáveis de ambiente do seu arquivo .env.

## 🌐 Web (Frontend)
Com o servidor em execução (seja localmente ou via Docker), você pode iniciar a aplicação web.

configure o arquivo .env na raiz da pasta web com a URL do servidor.

Navegue até a pasta da web:
```bash
cd web
```

Instale as dependências:

```bash
pnpm install
```

Inicie a Aplicação Web:

```bash 
pnpm dev
```

A aplicação web será iniciada e estará acessível no seu navegador (geralmente em http://localhost:5432 ou similar).