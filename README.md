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

   A aplicação estará disponível por padrão em: [http://localhost:3002](http://localhost:3000)

---

## 🧩 Quais níveis foram implementados

- Essa Branch conta com os requisitos propostos para a fase 2

---

## 🧠 Decisões técnicas

- Para a criação da rota /v1/pairs/search com os filtros de raça e nome do personal foram utilizados o class-validator e class-transformer para validações no dto. Além disso foi usado o validationPipe com o argumento forbidNonWhitelisted = true evitando a passagem de dados que não esperados.

- Para a criação da rota /v1/breeds utilizei o domínio cats pois é entendível que "breeds" faz parte do escopo de cats.

- Para a criação do cache, escolhi realizar uma estratégia local de cache, que permanece sendo utilizada pelo tempo determinado no TTL ou até quando a aplicação for reiniciada. Foi escolhido também criar um serviço de cache genérico, pois assim é possível reutilizar em ambas as chamadas de API públicas, permitindo uma dinamicidade maior para buscar os dados de cache.

---
