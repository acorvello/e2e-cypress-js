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
    // .trigger('click') dispara o evento direto no elemento, sem
    // depender de clique por coordenada na tela — um overlay residual
    // desta versão do Juice Shop pode interceptar o clique "físico"
    // mesmo com {force: true}, já que force só pula a checagem de
    // visibilidade do Cypress, não a sobreposição real no navegador.
    cy.get("#navbarAccount").trigger("click");
    cy.get("#navbarLoginButton").trigger("click");
    cy.get("#email").should("exist");
    cy.get("#password").should("exist");
  });

  it("deve exibir erro ao tentar login com credenciais inválidas", () => {
    cy.get("#navbarAccount").trigger("click");
    cy.get("#navbarLoginButton").trigger("click");
    cy.get("#email").type("usuario_invalido@teste.com", { force: true });
    cy.get("#password").type("senhaErrada123", { force: true });
    cy.get("#loginButton").trigger("click");
    cy.get(".error").should("exist");
  });
});
