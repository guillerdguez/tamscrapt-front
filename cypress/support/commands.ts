/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
// In cypress/support/commands.js

// Declaración de tipos personalizados para TypeScript
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Inicia sesión con el usuario y contraseña proporcionados.
       * @param username Nombre de usuario
       * @param password Contraseña
       */
      login(username: string, password: string): Chainable<void>;
    }
  }
}

export {};

// Comando personalizado para el login
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login');

  cy.get('input[name=username]').type(username);
  cy.get('input[name=password]').type(`${password}{enter}`);

  //revisar
  //   cy.visit('http://localhost:4200/detail/Users/2');
  //   cy.url().should('include', '/detail/Users/2');
  //   cy.get('h1').should('contain', 'USER TWO');
});
