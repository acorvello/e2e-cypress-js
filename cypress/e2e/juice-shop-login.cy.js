function closeWelcomeBannerIfPresent() {
  // Em vez de checar o DOM uma única vez (cy.get().then()), usamos
  // .should() com uma função de asserção customizada: o Cypress
  // reavalia essa função sozinho, com retry automático, até ela parar
  // de lançar erro ou até o timeout estourar. É o jeito idiomático do
  // Cypress de "garantir o resultado" sem misturar Promises nativas
  // com a fila de comandos (algo que o próprio Cypress desaconselha).
  cy.get("body", { timeout: 8000 }).should(($body) => {
    const banner = $body.find('button[aria-label="Close Welcome Banner"]');
    if (banner.length > 0) {
      banner.trigger("click");
    }
    // Assertiva real: ao final, ou o banner nunca existiu, ou já foi
    // clicado e removido do DOM. Cypress repete essa função até isso
    // ser verdade.
    expect($body.find('button[aria-label="Close Welcome Banner"]')).to.have.length(0);
  });
}

describe("Juice Shop - Fluxo de Login", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("app-mat-search-bar", { timeout: 10000 }).should("exist");
    closeWelcomeBannerIfPresent();
  });

  it("deve carregar a página inicial com produtos listados", () => {
    cy.get("app-mat-search-bar", { timeout: 10000 }).should("be.visible");
    cy.get(".product").should("have.length.greaterThan", 0);
  });

  it("deve abrir o formulário de login", () => {
    // trigger('click', {force: true}) dispara o evento direto no
    // elemento, ignorando a checagem de cobertura do Cypress — um
    // overlay residual desta versão do Juice Shop pode ficar sobre a
    // tela mesmo depois do menu abrir.
    cy.get("#navbarAccount").trigger("click", { force: true });
    cy.get("#navbarLoginButton").trigger("click", { force: true });
    cy.get("#email").should("exist");
    cy.get("#password").should("exist");
  });

  it("deve exibir erro ao tentar login com credenciais inválidas", () => {
    cy.get("#navbarAccount").trigger("click", { force: true });
    cy.get("#navbarLoginButton").trigger("click", { force: true });
    // Uma vez na página /login, não há mais overlay cobrindo a tela —
    // o backdrop era só um problema transitório da abertura do menu.
    // Aqui usamos type()/click() reais (sem force/trigger), já que um
    // clique sintético pode não ser tratado como "confiável" pelo
    // navegador para acionar a submissão padrão do formulário.
    cy.get("#email", { timeout: 10000 })
      .should("be.visible")
      .type("usuario_invalido@teste.com", { force: true });
    cy.get("#password")
      .should("exist")
      .type("senhaErrada123", { force: true });
    cy.get("#email").should("have.value", "usuario_invalido@teste.com");
    cy.get("#password").should("have.value", "senhaErrada123");
    cy.get("#loginButton").click();
    cy.get(".error", { timeout: 10000 }).should("exist");
  });
});
