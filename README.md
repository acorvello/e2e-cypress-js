# e2e-cypress-js

Suite de testes E2E em **Cypress** validando o fluxo de login do
[OWASP Juice Shop](https://owasp.org/www-project-juice-shop/), usada como
alvo de prática de automação de testes.

## Stack

- Cypress 13.15.0
- JavaScript

## Estrutura

```
e2e-cypress-js/
├── cypress.config.js
├── package.json
└── cypress/
    ├── e2e/
    │   └── juice-shop-login.cy.js
    └── support/
        └── e2e.js
```

## Como rodar localmente

Pré-requisito: Node.js e uma instância do Juice Shop rodando (local ou
via container) na URL definida em `CYPRESS_baseUrl`.

```bash
npm install
CYPRESS_baseUrl=http://localhost:3001 npx cypress run
```

## Como rodar via Docker (sem instalar Node)

Este repositório é consumido pelo ambiente de orquestração
[docker-test-env](#), que sobe o Juice Shop e executa esta suíte dentro do
container oficial `cypress/included`, orquestrado também por um pipeline
Jenkins. Veja o `docker-compose.yml` desse projeto para o setup completo.

## Casos cobertos

- Carregamento da página inicial e listagem de produtos
- Abertura do formulário de login
- Exibição de erro ao tentar logar com credenciais inválidas

## Próximos passos

- Cobrir fluxo de carrinho e checkout
- Adicionar testes de API além dos testes de UI
- Integrar com geração de cenários via IA generativa
