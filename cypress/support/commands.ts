
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      login(username: string, password: string): Chainable<void>;
      navigateTo(path: string): Chainable<Window>;
      register(user: {
        nombre: string;
        username: string;
        password: string;
        email: string;
      }): Chainable<any>;
      assertRedirect(path: string): Chainable<Window>;
    }
  }
}

export {};
Cypress.Commands.add(
  'register',
  (user: {
    nombre: string;
    username: string;
    password: string;
    email: string;
  }) => {
    cy.navigateTo('/register');
    cy.get('#nombre').type(user.nombre);
    cy.get('#username').type(user.username);
    cy.get('#password').type(user.password);
    cy.get('#email').type(user.email);
    cy.contains('button', 'Enviar').click();
  }
);
Cypress.Commands.add('navigateTo', (path: string) => {
  cy.visit(path);
});

Cypress.Commands.add('assertRedirect', (path: string) => {
  cy.url().should('include', path);
});
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login');

  cy.get('input[name=username]').type(username);
  cy.get('input[name=password]').type(`${password}{enter}`);
  cy.url().should('not.include', '/login');

  // cy.reload();
  //revisar
  //   cy.visit('https://tamscrapt.up.railway.app/detail/Users/2');
  //   cy.url().should('include', '/detail/Users/2');
  //   cy.get('h1').should('contain', 'USER TWO');
});
