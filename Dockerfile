# 1. Use uma imagem base do Node.js
FROM node:18-alpine

# 2. Instale o pnpm globalmente
RUN npm install -g pnpm

# 3. Crie o diretório de trabalho dentro do contêiner
WORKDIR /app

# 4. Copie os arquivos de configuração do projeto para o contêiner
COPY package.json pnpm-lock.yaml ./

# 5. Instale as dependências do projeto usando pnpm
RUN pnpm install --frozen-lockfile

# 6. Copie todos os arquivos do projeto para o diretório de trabalho
COPY . .

# 9. Defina a variável de ambiente diretamente no Dockerfile

