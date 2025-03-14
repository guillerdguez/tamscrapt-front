describe('admin ', () => {
  beforeEach(() => {
    cy.login('user1', '1234');
  });

  it('crear nuevo producto', () => {
    cy.visit('https://tamscrapt.up.railway.app/newProducto');
    cy.contains('h1', 'Formulario de Productos').should('be.visible');
    cy.get('#nombre')
      .type('Nuevo Producto de Prueba')
      .should('have.value', 'Nuevo Producto de Prueba');
    cy.get('#precio').clear().type('100').should('have.value', '100');
    cy.get('#imagen')
      .type('https://example.com/imagen.jpg')
      .should('have.value', 'https://example.com/imagen.jpg');
    cy.get('p-checkbox')
      .eq(0)
      .find('.p-checkbox-box[data-pc-section="input"]')
      .click();
    cy.get('#descuento').should('be.visible');
    cy.get('#descuento').clear().type('15').should('have.value', '15');
    cy.get('p-checkbox')
      .eq(1)
      .find('.p-checkbox-box[data-pc-section="input"]')
      .click();
    cy.get('p-checkbox')
      .eq(2)
      .find('.p-checkbox-box[data-pc-section="input"]')
      .click();
    cy.get('#cantidad').clear().type('10').should('have.value', '10');
    cy.contains('button', 'Enviar').click();
    // cy.contains('Nuevo Producto de Prueba', { timeout: 10000 }).should('exist');
    cy.visit('https://tamscrapt.up.railway.app/tabla/productos');
    cy.get('p-paginator .p-paginator-pages button')
      .last()
      .scrollIntoView()
      .should('be.visible')
      .click();
    cy.get('p-paginator .p-paginator-pages button')
      .last()
      .should('have.attr', 'aria-current', 'page');
    cy.contains('Nuevo Producto de Prueba').should('exist');
  });

  it('editar nombre de producto', () => {
    cy.visit('https://tamscrapt.up.railway.app/tabla/productos');
    cy.get('p-paginator .p-paginator-pages button')
      .last()
      .scrollIntoView()
      .should('be.visible')
      .click();
    cy.contains('.nombre', 'Nuevo Producto de Prueba')
      .should('exist')
      .parents('.surface-card')
      .find('button')
      .contains('Editar')
      .click();
    cy.url().should('include', '/detail/Productos');
    cy.get('#producto-nombre-0')
      .clear()
      .type('ROTULADORES DE PUNTA ')
      .should('have.value', 'ROTULADORES DE PUNTA ');
    cy.contains('button', 'Save').click();
    cy.visit('https://tamscrapt.up.railway.app/tabla/productos');
    cy.get('p-paginator .p-paginator-pages button')
      .last()
      .scrollIntoView()
      .should('be.visible')
      .click();
    cy.contains('.nombre', 'ROTULADORES DE PUNTA ').should('exist');
  });

  it('elimina y revisa si no está', () => {
    cy.visit('https://tamscrapt.up.railway.app/tabla/productos');
    cy.get('p-paginator .p-paginator-pages button')
      .last()
      .scrollIntoView()
      .should('be.visible')
      .click();
    cy.contains('.nombre', 'ROTULADORES DE PUNTA ')
      .should('exist')
      .parents('.surface-card')
      .find('button')
      .contains('Eliminar')
      .click();
    cy.contains('.nombre', 'ROTULADORES DE PUNTA ').should('not.exist');
  });

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

  it('editar nombre de usuario', () => {
    cy.visit('https://tamscrapt.up.railway.app/tabla/users');
    cy.get('p-paginator .p-paginator-pages button')
      .last()
      .scrollIntoView()
      .should('be.visible')
      .click();
    cy.contains('.username', 'juan.perez')
      .should('exist')
      .parents('.surface-card')
      .find('button')
      .contains('Editar')
      .click();
    cy.url().should('include', '/detail/Users');
    cy.get('#element-nombre').clear().type('juan.rodriguez');
    cy.contains('button', 'Save').click();
    cy.visit('https://tamscrapt.up.railway.app/tabla/users');
    cy.get('p-paginator .p-paginator-pages button')
      .last()
      .scrollIntoView()
      .should('be.visible')
      .click();
    cy.contains('.username', 'juan.rodriguez').should('exist');
  });

  it('elimina y revisa si no está', () => {
    cy.visit('https://tamscrapt.up.railway.app/tabla/users');
    cy.get('p-paginator .p-paginator-pages button')
      .last()
      .scrollIntoView()
      .should('be.visible')
      .click();
    cy.contains('.username', 'juan.rodriguez')
      .should('exist')
      .parents('.surface-card')
      .find('button')
      .contains('Eliminar')
      .click();
    cy.contains('.username', 'juan.rodriguez').should('not.exist');
  });
});
