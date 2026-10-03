describe("Juice Shop - Fluxo de Login", () => {
  beforeEach(() => {
    cy.visit("/");
    // O Juice Shop pode exibir um banner de boas-vindas por cima da tela.
    // Fecha-o apenas se ele existir, sem falhar o teste caso não apareça.
    cy.get("body").then(($body) => {
      const banner = $body.find('button[aria-label="Close Welcome Banner"]');
      if (banner.length > 0) {
        cy.wrap(banner).click({ force: true });
      }
    });
  });

  it("deve carregar a página inicial com produtos listados", () => {
    cy.get("app-mat-search-bar", { timeout: 10000 }).should("be.visible");
    cy.get(".product").should("have.length.greaterThan", 0);
  });

  it("deve abrir o formulário de login", () => {
    // trigger('click', {force: true}) dispara o evento direto no
    // elemento, ignorando a checagem de cobertura do Cypress — um
    // overlay residual desta versão do Juice Shop fica sobre a tela
    // mesmo depois do menu abrir.
    cy.get("#navbarAccount").trigger("click", { force: true });
    cy.get("#navbarLoginButton").trigger("click", { force: true });
    cy.get("#email").should("exist");
    cy.get("#password").should("exist");
  });

  it("deve exibir erro ao tentar login com credenciais inválidas", () => {
    cy.get("#navbarAccount").trigger("click", { force: true });
    cy.get("#navbarLoginButton").trigger("click", { force: true });
    // Seta o valor direto e dispara o evento input, em vez de simular
    // digitação tecla a tecla — mais robusto quando um overlay residual
    // está sobre a tela, igual à abordagem usada na suíte Playwright.
    cy.get("#email")
      .invoke("val", "usuario_invalido@teste.com")
      .trigger("input", { force: true });
    cy.get("#password")
      .invoke("val", "senhaErrada123")
      .trigger("input", { force: true });
    cy.get("#loginButton").trigger("click", { force: true });
    cy.get(".error", { timeout: 10000 }).should("exist");
  });
});
