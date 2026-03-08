# Jitterbit Challenge

API REST desenvolvida para o desafio técnico da Jitterbit.

O projeto implementa o gerenciamento de pedidos com:

- criação, consulta, atualização parcial e exclusão de pedidos
- rota de login para geração de token JWT
- persistência em PostgreSQL com Prisma ORM
- dockerização do banco de dados
- validação com Zod
- autenticação JWT
- documentação com Swagger

## Tecnologias e bibliotecas

### Runtime e linguagem

- Node.js
- TypeScript
- Express

### Banco e ORM

- PostgreSQL
- Prisma

### Validação, autenticação e documentação

- Zod
- JOSE (`jose`) para JWT
- Swagger UI Express
- YAML

### Utilitários

- dotenv
- http-status-codes
- tsx

## Estrutura do projeto

```text
.
├── docs/
│   └── openapi.yaml
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   │   └── swagger.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── order.controller.ts
│   ├── lib/
│   │   └── prisma.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── repositories/
│   │   └── order.repository.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   └── order.routes.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── order.service.ts
│   ├── types/
│   │   └── order.type.ts
│   ├── utils/
│   │   ├── ErrorMessage.ts
│   │   └── formatData.ts
│   └── validators/
│       ├── auth.validator.ts
│       └── order.validator.ts
├── docker-compose.yml
├── package.json
└── README.md
```

## Requisitos

- Node.js 20+
- npm
- Docker e Docker Compose

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto. Você pode usar o `.env.example` como base.

Exemplo:

```env
PORT=3000

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=jitterbit_challenge
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/jitterbit_challenge?schema=public"

AUTH_USERNAME=admin
AUTH_PASSWORD=123
JWT_SECRET=secret123
JWT_EXPIRES_IN=1h
```

## Como rodar o projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Subir o banco com Docker

```bash
npm run db:up
```

### 3. Aplicar as migrations

```bash
npx prisma migrate dev --name init
```

### 4. Gerar o client do Prisma

```bash
npx prisma generate
```

### 5. Iniciar a API em modo desenvolvimento

```bash
npm run dev
```

API disponível em:

```text
http://localhost:3000
```

## Banco de dados

O projeto utiliza PostgreSQL e segue a estrutura pedida no desafio.

### Tabela `Order`

- `orderId`
- `value`
- `creationDate`

### Tabela `Items`

- `orderId`
- `productId`
- `quantity`
- `price`

## Swagger

Documentação interativa disponível em:

```text
http://localhost:3000/docs
```

## Rotas da API

### Públicas

| Método | Rota          | Descrição                          |
| ------ | ------------- | ---------------------------------- |
| `GET`  | `/`           | Verifica se a API está no ar       |
| `GET`  | `/health`     | Verifica conectividade com o banco |
| `POST` | `/auth/login` | Gera um token JWT                  |
| `POST` | `/order`      | Cria um novo pedido                |
| `GET`  | `/order/list` | Lista todos os pedidos             |

### Protegidas por JWT

| Método   | Rota         | Descrição                       |
| -------- | ------------ | ------------------------------- |
| `GET`    | `/order/:id` | Busca pedido por ID             |
| `PATCH`  | `/order/:id` | Atualiza parcialmente um pedido |
| `DELETE` | `/order/:id` | Remove um pedido                |
