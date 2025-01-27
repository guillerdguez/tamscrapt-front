describe('eliminar producto', () => {
  beforeEach(() => {
    cy.login('user1', '1234');
  });

  it('crear nuevo producto', () => {
    // Navegar al formulario de creación de productos
    cy.visit('http://localhost:4200/newProducto');

    // Verificar que el título del formulario sea visible
    cy.contains('h1', 'Formulario de Productos').should('be.visible');

    // Llenar los campos obligatorios
    cy.get('#nombre') // Campo del nombre del producto
      .type('Nuevo Producto de Prueba')
      .should('have.value', 'Nuevo Producto de Prueba');

    cy.get('#precio') // Campo del precio
      .clear() // Limpiar el valor inicial
      .type('100') // Introducir un precio válido
      .should('have.value', '100');

    cy.get('#imagen') // Campo de URL de imagen
      .type('https://example.com/imagen.jpg')
      .should('have.value', 'https://example.com/imagen.jpg');
    // Oferta
    cy.get('p-checkbox')
      .eq(0)
      .find('.p-checkbox-box[data-pc-section="input"]')
      .click();

    // Rellenar el campo de descuento
    cy.get('#descuento').should('be.visible');

    cy.get('#descuento').clear().type('15').should('have.value', '15');
    //lettering
    cy.get('p-checkbox')
      .eq(1)
      .find('.p-checkbox-box[data-pc-section="input"]')
      .click();
    //scrapbookin
    cy.get('p-checkbox')
      .eq(2)
      .find('.p-checkbox-box[data-pc-section="input"]')
      .click();

    // Llenar la cantidad
    cy.get('#cantidad').clear().type('10').should('have.value', '10');

    // Enviar el formulario
    cy.contains('button', 'Enviar').click();
    cy.visit('http://localhost:4200/tabla/productos');
    cy.get('p-paginator .p-paginator-pages button')
      .last() // Selecciona el último botón del paginador
      .scrollIntoView()
      .should('be.visible')
      .click();

    // Verificar que la última página esté activa
    cy.get('p-paginator .p-paginator-pages button')
      .last()
      .should('have.attr', 'aria-current', 'page');
    cy.contains('Nuevo Producto de Prueba').should('exist');
  });

  // it('editar nombre de producto', () => {
  //   cy.visit('http://localhost:4200/detail/Productos/2');
  //   //revisar
  //   cy.get('#producto-nombre-0').clear().type('ROTULADORES DE PUNTA ');

  //   cy.contains('h1', 'ROTULADORES DE PUNTA ').should('be.visible');

  //   cy.get('#producto-nombre-0').clear().type('Rotuladores de colores');

  //   cy.contains('button', 'Save').click();

  //   cy.visit('http://localhost:4200/detail/Productos/2');
  //   cy.get('#producto-nombre-0').should('have.value', 'Rotuladores de colores');

  //   cy.contains('h1', 'ROTULADORES DE COLORES').should('be.visible');
  // });
  it('editar nombre de producto', () => {
    // Navegar a la tabla de productos
    cy.visit('http://localhost:4200/tabla/productos');

    // Ir a la última página del paginador
    cy.get('p-paginator .p-paginator-pages button')
      .last() // Selecciona el último botón del paginador
      .scrollIntoView()
      .should('be.visible')
      .click();

    // Localizar el producto deseado por su nombre
    cy.contains('.nombre', 'Nuevo Producto de Prueba')
      .should('exist') // Verifica que el producto existe
      .parents('.surface-card') // Encuentra el contenedor principal del producto
      .find('button') // Busca todos los botones
      .contains('Editar') // Filtra por el botón "Editar"
      .click();

    // Verificar que estamos en la pantalla de edición
    cy.url().should('include', '/detail/Productos');
    cy.get('#producto-nombre-0') // Campo de edición del nombre
      .clear()
      .type('ROTULADORES DE PUNTA ') // Cambiar el nombre
      .should('have.value', 'ROTULADORES DE PUNTA ');

    // Guardar los cambios
    cy.contains('button', 'Save').click();

    // Verificar que el cambio se haya realizado
    cy.visit('http://localhost:4200/tabla/productos');
    cy.get('p-paginator .p-paginator-pages button')
      .last()
      .scrollIntoView()
      .should('be.visible')
      .click();

    cy.contains('.nombre', 'ROTULADORES DE PUNTA ').should('exist');
  });

  it('elimina y revisa si no está', () => {
    // Navegar a la tabla de productos
    cy.visit('http://localhost:4200/tabla/productos');

    // Ir a la última página del paginador
    cy.get('p-paginator .p-paginator-pages button')
      .last()
      .scrollIntoView()
      .should('be.visible')
      .click();

    // Localizar el producto deseado por su nombre
    cy.contains('.nombre', 'ROTULADORES DE PUNTA ')
      .should('exist') // Verifica que el producto existe
      .parents('.surface-card') // Encuentra el contenedor principal del producto
      .find('button') // Busca todos los botones
      .contains('Eliminar') // Filtra por el botón "Eliminar"
      .click();

    // Esperar que el producto ya no exista
    cy.contains('.nombre', 'ROTULADORES DE PUNTA ').should('not.exist');
  });
  //hacer lo mismo para cliente
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

  it('editar nombre de usuario', () => {
    // Navegar a la tabla de productos
    cy.visit('http://localhost:4200/tabla/users');

    // Ir a la última página del paginador
    cy.get('p-paginator .p-paginator-pages button')
      .last() // Selecciona el último botón del paginador
      .scrollIntoView()
      .should('be.visible')
      .click();

    // Localizar el producto deseado por su nombre
    cy.contains('.username', 'juan.perez')
      .should('exist') // Verifica que el producto existe
      .parents('.surface-card') // Encuentra el contenedor principal del producto
      .find('button') // Busca todos los botones
      .contains('Editar') // Filtra por el botón "Editar"
      .click();

    // Verificar que estamos en la pantalla de edición
    cy.url().should('include', '/detail/Users');
    cy.get('#element-nombre').clear().type('juan.rodriguez');
    // .should('have.value', 'juan.rodriguez');

    // Guardar los cambios
    cy.contains('button', 'Save').click();

    // Verificar que el cambio se haya realizado
    cy.visit('http://localhost:4200/tabla/users');
    cy.get('p-paginator .p-paginator-pages button')
      .last()
      .scrollIntoView()
      .should('be.visible')
      .click();

    cy.contains('.username', 'juan.rodriguez').should('exist');
  });

  it('elimina y revisa si no está', () => {
    // Navegar a la tabla de productos
    cy.visit('http://localhost:4200/tabla/users');

    // Ir a la última página del paginador
    cy.get('p-paginator .p-paginator-pages button')
      .last()
      .scrollIntoView()
      .should('be.visible')
      .click();

    // Localizar el producto deseado por su nombre
    cy.contains('.username', 'juan.rodriguez')
      .should('exist') // Verifica que el producto existe
      .parents('.surface-card') // Encuentra el contenedor principal del producto
      .find('button') // Busca todos los botones
      .contains('Eliminar') // Filtra por el botón "Eliminar"
      .click();

    // Esperar que el producto ya no exista
    cy.contains('.username', 'juan.rodriguez').should('not.exist');
  });
});
