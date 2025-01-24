describe('template spec', () => {
  it('crear nuevo usuario', () => {
    // Navegar al formulario de creación de usuarios
    cy.visit('http://localhost:4200/register');

    // Verificar que el título del formulario sea visible
    cy.contains('h1', 'Formulario de Users').should('be.visible');

    // Llenar los campos obligatorios
    // cy.get('#imagen') // Campo de URL de imagen
    //   .type('https://example.com/imagen.jpg')
    //   .should('have.value', 'https://example.com/imagen.jpg');

    cy.get('#nombre') // Campo del nombre del usuario
      .type('Juan Pérez')
      .should('have.value', 'Juan Pérez');

    cy.get('#username') // Campo del username
      .type('juan.perez')
      .should('have.value', 'juan.perez');

    cy.get('#password') // Campo del password
      .type('password123')
      .should('have.value', 'password123');

    cy.get('#email') // Campo del email
      .type('juan.perez@example.com')
      .should('have.value', 'juan.perez@example.com');

    cy.contains('button', 'Enviar').click();
    cy.login('user1', '1234');

    cy.visit('http://localhost:4200/tabla/users');

    // Verificar que el nuevo usuario esté en la lista
    cy.contains('juan.perez').should('exist');
  });
});
