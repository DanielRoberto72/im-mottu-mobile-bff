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

- Essa Branch conta com os requisitos propostos para a fase 1

---

## 🧠 Decisões técnicas

- Criação de um módulo `external/` centralizado para integrações com APIs externas visando facilitar o uso nos demais módulos.
- Organização modular por domínios respeitando o principio de responsabilidade única.
- Criação de uma pasta `utils/` contendo arquivos genéricos e reutilizáveis.
- Tratamento de erro simples, utilizando bloco try-catch para captura de exceções e utilização de exceções padrão do NestJS

---
