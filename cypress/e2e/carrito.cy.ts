describe('carrito', () => {
  beforeEach(() => {
    cy.login('user2', '1234');
  });
  it('guarda y revisa si esta', () => {
    cy.visit('http://localhost:4200/tabla/productos');

    cy.get('i.pi.pi-cart-plus').first().click();

    cy.visit('http://localhost:4200/carrito');

    cy.url().should('include', '/carrito');
    cy.contains('td', 'Brush Pen').should('be.visible');
  });
  it('elimina y revisa si no esta', () => {
    cy.visit('http://localhost:4200/carrito');

    cy.get('button.btn-remove').first().click();

    cy.contains('td', 'Brush Pen').should('not.exist');
  });
});
