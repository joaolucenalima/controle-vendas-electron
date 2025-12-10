# Controle de Vendas Electron

Aplicação desktop para controle de vendas e gastos, utilizando:

- **Electron** (main + preload)
- **Vite** para o frontend (renderer)
- **TypeScript**
- **SQLite + TypeORM**

---

## 📌 Estrutura Geral (Resumo)

- Código do **processo principal** do Electron: `src/main`
- Banco de dados, entidades e migrações: `src/main/database`
- Frontend (Vite + React): `renderer/`
- Código compilado do main: `dist/`
- Build final do frontend: `out/`

---

## 🚀 Instalação

Clone o repositório e instale as dependências:

```bash
npm install # Também executa a instalação no diretório renderer/
```

## Executando em desenvolvimento

1. Compile o processo principal

```bash
# Modo normal
npm run build:main

# Modo watch
npx tsc --watch
```

2. Rode o frontend

```bash
cd renderer
npm run dev
```

3. Inicie o electron

```bash
npm start
```

## Build para Produção

1. Crie o build completo

```bash
# Esse comando já build o front e o main
npm run build
```

2. Gerar instalador da aplicação

```bash
npm run package
```

3. Criar instalador para a arquitetura desejada

```bash
# 32 bits
npm run make:32

# 64 bits
npm run make:64
```

## Migrations TypeORM

Para criar uma migration:

```bash
npm run migrate:create NomeDaMigration
```

Para aplicar as migrations:

```bash
npm run migrate:up
```

Reverter migration:

```bash
npm run migrate:down
```