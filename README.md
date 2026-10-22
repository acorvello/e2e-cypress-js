# ⚡ Stateful E2E UI Automation Ecosystem
### Resilient End-to-End Test Engine Powered by Cypress and JavaScript

This repository houses a modern web automation suite built with **Cypress (JavaScript)**. Tailored to map complex user journeys against the **OWASP Juice Shop** platform, the framework focuses on eliminating flakiness through built-in asynchronous waiting mechanisms and generating structured logs designed for continuous quality telemetry.

This suite complements the other repositories in the global portfolio (Playwright, Selenium, and API tests) and runs in the same integrated Jenkins pipeline.

## 💡 Engineering Highlights
* **Asynchronous State Pooling:** Abolished fragile fixed waits (`cy.wait`) by exploiting Cypress's native retry-ability assertions, ensuring continuous execution under fluctuating network loads.
* **Visual Artifact Governance:** Configured to compile headless execution videos and failure screenshots stored dynamically per build for debugging and data audit pipelines.
* **Environment-Driven Architecture:** Decoupled runtime execution using dynamic base URL configuration parameters, scaling seamlessly from local environments to containerized networks.

## 🛠️ Tech Stack and Dependencies
- **Core Framework:** Cypress 13.15+
- **Language:** JavaScript / Node.js
- **Infrastructure:** Docker containerization ready for headless integration inside Jenkins CI/CD loops.

## 📁 Project Structure
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
## 🔍 Covered Scenarios

**Products**
- Core Verification: Home page loads successfully and aggregates structured product components [0.1.10].

**Login & Authentication**
- Navigation Flow: Login interface renders correctly when triggered via the account dashboard menu [0.1.10].
- Exception Handling Validation: Security barrier triggers error display alerts upon receiving invalid credentials [0.1.10].

## 🚀 Running Locally

**Prerequisite:** Node.js and a running instance of Juice Shop reachable at the URL set in `CYPRESS_baseUrl` [0.1.10].

```bash
npm install
CYPRESS_baseUrl=http://localhost:3001 npx cypress run
```

🐳 Running via Docker (CI/CD Orchestration)

This repository is actively consumed by the docker-test-env orchestration project. The pipeline spins up Juice Shop and runs this testing suite inside the official cypress/included container image, triggered and tracked seamlessly by a unified Jenkins pipeline. See that project's docker-compose.yml for the full setup.

📈 Roadmap & Next Steps

• Expand functional E2E validation into multi-step cart, basket management, and checkout flows.
• Embed backend component testing layers to run REST API tests alongside the UI automation.
• Integrate with AI-generated test scenario creation frameworks (LangGraph Agentic Suites).

⚖️ License

This repository is licensed under the MIT License. Feel free to clone, study, modify, and distribute the code for educational or portfolio purposes.
---
<sub>Keywords: Cypress, JavaScript, Node.js, E2E Testing, Asynchronous Waiting, UI Automation, Headless Runner, Jenkins, DevOps, Docker, AI Testing Integration, State Management.
