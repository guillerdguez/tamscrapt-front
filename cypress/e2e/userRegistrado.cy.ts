//pongo tambien como se registra,accede,edita algo,etc?

describe('template spec', () => {
  beforeEach(() => {
    cy.login('user2', '1234');
  });
  //favorito
  it('guarda y revisa si esta en favoritos', () => {
    cy.visit('http://localhost:4200/tabla/productos');

    cy.get('.heart i.pi.pi-heart').first().click();

    cy.visit('/tabla/favorito');

    cy.url().should('include', '/tabla/favorito');

    cy.contains('span', 'Brush Pen').should('be.visible');
  });
  it('quita y revisa si no esta favoritos', () => {
    cy.visit('http://localhost:4200/tabla/productos');

    cy.get('.heart i.pi.pi-heart-fill').first().click();

    cy.visit('/tabla/favorito');

    cy.url().should('include', '/tabla/favorito');

    cy.contains('span', 'Brush Pen').should('not.exist');
  });
  //carrito
  it('guarda y revisa si esta en carrito', () => {
    cy.visit('http://localhost:4200/tabla/productos');

    cy.get('i.pi.pi-cart-plus').first().click();

    cy.visit('http://localhost:4200/carrito');

    cy.url().should('include', '/carrito');
    cy.contains('td', 'Brush Pen').should('be.visible');
  });
  it('elimina y revisa si no esta en carrito', () => {
    cy.visit('http://localhost:4200/carrito');

    cy.get('button.btn-remove').first().click();

    cy.contains('td', 'Brush Pen').should('not.exist');
  });
});
