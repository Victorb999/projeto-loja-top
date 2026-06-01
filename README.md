# Projeto Loja Top 🛒

Sistema de gerenciamento de loja (PDV) desenvolvido com Next.js, focado em simplicidade e eficiência para controle de clientes, produtos e vendas.

## 🚀 Tecnologias Utilizadas

- **Core:** [Next.js 14](https://nextjs.org/) (App Router)
- **UI:** [Shadcn UI](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/)
- **Banco de Dados & ORM:** [Prisma](https://www.prisma.io/) com PostgreSQL
- **Estado Global:** [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **Validação:** [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)
- **Deploy:** [Vercel](https://vercel.com/)

## ✨ Funcionalidades

- **Gerenciamento de Clientes:** Cadastro, edição e listagem de clientes.
- **Gerenciamento de Produtos:** Controle de estoque, preços de custo e venda.
- **Módulo de Venda:** Fluxo completo de venda com seleção de itens e cálculo automático.
- **Relatórios:** Visualização de vendas por período.
- **Dashboard/Caixa:** Controle de movimentações e listagem de vendas realizadas.

## � Rodando com Docker

Se você prefere usar Docker, o projeto já conta com uma configuração pronta:

1. **Inicie os containers:**
   ```bash
   docker-compose up -d
   ```
   *Este comando irá subir o banco de dados PostgreSQL e a aplicação Next.js.*

2. **Acesse a aplicação:**
   Acesse [http://localhost:3000](http://localhost:3000).

3. **Logs (opcional):**
   ```bash
   docker-compose logs -f next-app
   ```

## 🛠️ Instalação Manual (Sem Docker)
   ```bash
   git clone <url-do-repositorio>
   cd projeto-loja-top
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto com a URL do seu banco de dados:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/db_name"
   ```

4. **Prepare o banco de dados:**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Execute em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```

## 📦 Estrutura de Pastas

- `src/app`: Rotas e APIs (Next.js App Router).
- `src/components`: Componentes reutilizáveis e Shadcn UI.
- `src/containers`: Lógica de negócio e componentes de interface específicos de cada módulo.
- `src/lib`: Configurações de bibliotecas (Prisma, etc).
- `prisma`: Schema e migrações do banco de dados.

## 📄 Licença

Este projeto está sob a licença MIT.
