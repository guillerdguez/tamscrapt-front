describe('template spec', () => {
  it('crear nuevo usuario', () => {
    cy.visit('https://tamscrapt.up.railway.app/register');

    cy.contains('h1', 'Formulario de Users').should('be.visible');

    cy.get('#nombre').type('Juan Pérez').should('have.value', 'Juan Pérez');

    cy.get('#username').type('juan.perez').should('have.value', 'juan.perez');

    cy.get('#password').type('password123').should('have.value', 'password123');

    cy.get('#email')
      .type('juan.perez@example.com')
      .should('have.value', 'juan.perez@example.com');

    cy.contains('button', 'Enviar').click();
    cy.login('user1', '1234');

    cy.visit('https://tamscrapt.up.railway.app/tabla/users');

    cy.contains('juan.perez').should('exist');
  });
});
