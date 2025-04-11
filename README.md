# Teste prático para desenvolvedores Backend (Node/NestJS) - BFF Básico

## 🚀 Como rodar o projeto

1. **Instale as dependências:**

   ```bash
   npm install
   ```

2. **Execute a aplicação em modo desenvolvimento:**

   ```bash
   npm run start:dev
   ```

   A aplicação estará disponível por padrão em: [http://localhost:3002](http://localhost:3002)

---

## 🚀 Como rodar com Docker

1. **Crie a imagem Docker:**

   ```bash
   docker build -t mottuBff .
   ```

2. **Execute o container:**

   ```bash
   docker run -d -p 3002:3002 --name nome-do-container mottuBff
   ```

## 🧩 Quais níveis foram implementados

- Essa Branch conta com os requisitos propostos para a fase 3

- Implementação do Dockerfile para execução da aplicação.

---

## 🧠 Decisões técnicas

- Utilização de query params para realizar a paginação da rota v1/pairs

- Para salvar os dados dos favoritos utilizei uma estratégia local de salvamento na memória.

- Para a criação do Middleware global de tratamento de erros foi criado um filtro de exceção personalizado, pra interceptar e formatar os erros antes de serem enviados como resposta HTTP.

- Para a criação do Dockerfile, utilizei o npm install --legacy-peer-deps para correção de um conflito de versão no nest/swagger.

---
