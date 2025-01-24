describe('agregar a favoritos', () => {
  beforeEach(() => {
    cy.login('user2', '1234');
  });
  it('guarda y revisa si esta', () => {
    cy.visit('http://localhost:4200/tabla/productos');

    cy.get('.heart i.pi.pi-heart').first().click();

    cy.visit('/tabla/favorito');

    cy.url().should('include', '/tabla/favorito');

    cy.contains('span', 'Brush Pen').should('be.visible');
  });
  it('quita y revisa si no esta', () => {
    cy.visit('http://localhost:4200/tabla/productos');

    cy.get('.heart i.pi.pi-heart-fill').first().click();

    cy.visit('/tabla/favorito');

    cy.url().should('include', '/tabla/favorito');

    cy.contains('span', 'Brush Pen').should('not.exist');
  });
});

// cy.get('span.nombre.ng-star-inserted')
//   .contains('Brush Pen')
//   .should('be.visible');
