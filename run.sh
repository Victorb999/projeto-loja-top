#!/bin/bash

# Exibir os comandos conforme forem sendo executados
set -e

# Rodar o Docker Compose com a opção --build
echo "Subindo os containers com Docker Compose..."
docker-compose up --build
