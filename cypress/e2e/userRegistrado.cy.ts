//pongo tambien como se registra,accede,edita algo,etc?

describe('usuario regustrado', () => {
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

  beforeEach(() => {
    cy.login('juan.perez', 'password123');
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
  //pedido
  it('hace un pedido', () => {
    cy.visit('http://localhost:4200/tabla/productos');

    cy.get('i.pi.pi-cart-plus').first().click();

    cy.visit('http://localhost:4200/carrito');

    cy.url().should('include', '/carrito');
    cy.contains('td', 'Brush Pen').should('be.visible');
    cy.get('button.btn-checkout').first().click();
    cy.get('input[name="nombreComprador"]')
      .type('Juan')
      .should('have.value', 'Juan');

    cy.get('input[name="address"]').type('AAAAA').should('have.value', 'AAAAA');

    cy.contains('button', 'Next').click();

    cy.get('input[type="radio"][value="creditCard"]').click();
    cy.contains('button', 'Next').click();
    cy.contains('button', 'Confirmar Pedido').click();
    cy.visit('http://localhost:4200/tabla/pedidosCliente');
    cy.contains('span', 'Juan').should('be.visible');
  });
  it('elimina un pedido', () => {
    cy.visit('http://localhost:4200/tabla/pedidosCliente');
    cy.contains('span', 'Juan').should('be.visible');
    cy.contains('span', 'Juan')
      .should('exist')
      .parents('.surface-card')
      .find('button')
      .contains('Eliminar')
      .click();

    cy.contains('span', 'Juan').should('not.exist');
  });
});
