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
    // Às vezes o overlay (backdrop) do banner não se desfaz sozinho e
    // fica bloqueando cliques no resto da página. Clica nele para
    // fechá-lo e espera sumir antes de continuar.
    cy.get("body").then(($body) => {
      if ($body.find(".cdk-overlay-backdrop").length > 0) {
        cy.get(".cdk-overlay-backdrop").click({ force: true, multiple: true });
      }
    });
    cy.get(".cdk-overlay-backdrop").should("not.exist");
  });

  it("deve carregar a página inicial com produtos listados", () => {
    cy.get("app-mat-search-bar", { timeout: 10000 }).should("be.visible");
    cy.get(".product").should("have.length.greaterThan", 0);
  });

  it("deve abrir o formulário de login", () => {
    cy.get("#navbarAccount").click();
    // O menu do Angular Material leva um instante para concluir a
    // animação de abertura; sem essa espera, o overlay de fundo
    // intercepta o clique mesmo com o botão já visível.
    cy.wait(500);
    cy.get("#navbarLoginButton").should("be.visible").click();
    cy.get("#email").should("be.visible");
    cy.get("#password").should("be.visible");
  });

  it("deve exibir erro ao tentar login com credenciais inválidas", () => {
    cy.get("#navbarAccount").click();
    cy.wait(500);
    cy.get("#navbarLoginButton").should("be.visible").click();
    cy.get("#email").type("usuario_invalido@teste.com");
    cy.get("#password").type("senhaErrada123");
    cy.get("#loginButton").click();
    cy.get(".error").should("be.visible");
  });
});
