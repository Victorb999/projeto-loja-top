# 📘 Contexto do Projeto & Guia de Desenvolvimento

Este documento serve como referência para IAs (como o Antigravity, Cursor, etc.) entenderem a arquitetura, as regras de negócio e as convenções deste projeto.

## 🏗️ Resumo Arquitetural

- **Paradigma:** Monolito Next.js (Frontend e API no mesmo repositório).
- **Framework:** Next.js 14 (App Router).
- **ORM:** Prisma (Postgres).
- **UI:** Shadcn UI + Tailwind CSS.
- **Gerenciamento de Estado:** Zustand (armazenado em `src/store`).
- **Validação:** Zod + React Hook Form.

## 🗃️ Modelo de Dados (Prisma)

Localizado em: `prisma/schema.prisma`

- **Customer:** Dados detalhados do cliente (Endereço, CPF/CNPJ, Contatos).
- **Product:** Informações do produto, incluindo `priceSpend` (custo) e `price` (venda).
- **Sale:** Registro principal da venda. Relaciona-se com um `Customer`.
- **Item:** Item da venda. Faz o link entre `Sale` e `Product`, armazenando `quantity`, `unitaryPrice` e `totalPrice` no momento da venda.

## 📂 Convenções de Pastas

- `src/app/api`: Endpoints REST. Padrão de retorno: JSON.
- `src/app/(rotas)`: Páginas da aplicação. Geralmente usam componentes de `src/containers`.
- `src/containers`: Componentes "inteligentes" que gerenciam estado de uma funcionalidade específica (ex: `SalesList`, `CustomerSelectContainer`).
- `src/components/ui`: Componentes puros da Shadcn UI.
- `src/components`: Outros componentes reutilizáveis compartilhados.
- `src/lib/prisma.ts`: Instância singleton do Prisma Client.

## 🛠️ Regras de Negócio Importantes

1. **Fluxo de Venda:**
   - As vendas são criadas vinculando itens e, opcionalmente, um cliente.
   - O preço unitário do item é capturado do preço atual do produto no momento da inserção.
2. **Cálculos:**
   - `totalPrice` na tabela `Sale` deve ser a soma dos `totalPrice` na tabela `Item`.
   - `totalPrice` no `Item` é `quantity * unitaryPrice`.
3. **Gerenciamento de Estado (Zustand):**
   - Usado para gerenciar o carrinho de compras ou filtros globais de pesquisa. Ver `src/store`.

## 💡 Instruções para Codificação

- **Componentes:** Prefira "Server Components" por padrão. Use `"use client"` apenas quando houver necessidade de interatividade ou hooks.
- **UI:** Sempre use shadcn (`src/components/ui`) em vez de estilizar do zero com Tailwind sempre que possível.
- **Forms:** Siga o padrão Shadcn + React Hook Form + Zod para validações de input.
- **API:** Use `NextResponse` para retornos de API. Sempre envolva operações de banco em `try/catch`.

## 🚀 Como Adicionar Nova Funcionalidade

1. Definir o modelo no `schema.prisma` (se necessário).
2. Rodar `npx prisma generate` e `npx prisma migrate dev`.
3. Criar a rota da API em `src/app/api/`.
4. Criar o container em `src/containers/`.
5. Criar a página em `src/app/`.
