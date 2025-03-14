describe('visita todos los productos', () => {
  beforeEach(() => {
    cy.login('user2', '1234');
  });
  it('should visit the products page', () => {
    cy.visit('https://tamscrapt.up.railway.app/tabla/productos');

    cy.get('p-paginator .p-paginator-pages button').each(($btn) => {
      cy.wrap($btn).scrollIntoView().should('be.visible').click();

      cy.wrap($btn).should('have.attr', 'aria-current', 'page');
    });
  });
});
