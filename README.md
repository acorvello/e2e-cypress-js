# e2e-cypress-js

End-to-end test suite built with **Cypress**, validating the login flow of
the [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/), used
here as a target application for test automation practice.

## Stack

- Cypress 13.15.0
- JavaScript

## Project structure

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

## Running locally

Prerequisite: Node.js and a running instance of Juice Shop (locally or in
a container) reachable at the URL set in `CYPRESS_baseUrl`.

```bash
npm install
CYPRESS_baseUrl=http://localhost:3001 npx cypress run
```

## Running via Docker (no local Node.js install required)

This repository is consumed by the
[docker-test-env](https://github.com/acorvello/docker-test-env)
orchestration project, which spins up Juice Shop and runs this suite
inside the official `cypress/included` container image, triggered by a
Jenkins pipeline. See that project's `docker-compose.yml` for the full
setup.

## Covered scenarios

- Home page loads and lists products
- Login form opens correctly
- Error message is shown when logging in with invalid credentials

## Next steps

- Cover the cart and checkout flow
- Add API tests alongside the UI tests
- Integrate with AI-generated test scenario creation
