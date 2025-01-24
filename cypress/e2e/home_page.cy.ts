/// <reference types="cypress" />

describe('La Página de Inicio', () => {
  beforeEach(() => {
    cy.login('user2', '1234');
  });

  it('carga correctamente la página de inicio', () => {
    cy.visit('http://localhost:4200/home');

    cy.url().should('include', '/home');
  });
});
