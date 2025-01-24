describe('visita todos los productos', () => {
  beforeEach(() => {
    cy.login('user2', '1234');
  });
  it('should visit the products page', () => {
    cy.visit('http://localhost:4200/tabla/productos');
    // cy.get('button[aria-label="2"]')
    //   .scrollIntoView()
    //   .should('be.visible')
    //   .click();
    cy.get('p-paginator .p-paginator-pages button').each(($btn) => {
      // Hacer clic en cada botón
      cy.wrap($btn).scrollIntoView().should('be.visible').click();

      // Verificar que el botón actual está activo
      cy.wrap($btn).should('have.attr', 'aria-current', 'page');
    });
  });
});
