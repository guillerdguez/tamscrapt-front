describe('usuario registrado', () => {
  it('crear nuevo usuario', () => {
    cy.visit('/register');

    cy.contains('h1', 'Formulario de Users').should('be.visible');

    cy.get('#nombre').type('Juan Pérez').should('have.value', 'Juan Pérez');

    cy.get('#username').type('juan.perez').should('have.value', 'juan.perez');

    cy.get('#password').type('password123').should('have.value', 'password123');

    cy.get('#email')
      .type('juan.perez@example.com')
      .should('have.value', 'juan.perez@example.com');

    cy.contains('button', 'Enviar').click();
    cy.login('user1', '1234');

    cy.visit('/tabla/users');

    cy.contains('juan.perez').should('exist');
  });

  beforeEach(() => {
    cy.login('juan.perez', 'password123');
  });

  it('guarda y revisa si esta en favoritos', () => {
    cy.visit('/tabla/productos');

    cy.get('.heart i.pi.pi-heart').first().click();

    cy.visit('/tabla/favorito');

    cy.url().should('include', '/tabla/favorito');

    cy.contains('span', 'Brush Pen').should('be.visible');
  });
  it('quita y revisa si no esta favoritos', () => {
    cy.visit('/tabla/productos');

    cy.get('.heart i.pi.pi-heart-fill').first().click();

    cy.visit('/tabla/favorito');

    cy.url().should('include', '/tabla/favorito');

    cy.contains('span', 'Brush Pen').should('not.exist');
  });
  it('guarda y revisa si esta en carrito', () => {
    cy.visit('/tabla/productos');

    cy.get('i.pi.pi-cart-plus').first().click();

    cy.visit('/carrito');

    cy.url().should('include', '/carrito');
    cy.contains('td', 'Brush Pen').should('be.visible');
  });
  it('elimina y revisa si no esta en carrito', () => {
    cy.visit('/carrito');

    cy.get('button.btn-remove').first().click();

    cy.contains('td', 'Brush Pen').should('not.exist');
  });
  it('hace un pedido', () => {
    cy.visit('/tabla/productos');

    cy.get('i.pi.pi-cart-plus').first().click();

    cy.visit('/carrito');

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
    cy.visit('/tabla/pedidosCliente');
    cy.contains('span', 'Juan').should('be.visible');
  });
  it('elimina un pedido', () => {
    cy.visit('/tabla/pedidosCliente');
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
