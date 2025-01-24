// cypress/e2e/login.cy.ts
describe('The Login Page', () => {
  it('sets auth cookie when logging in via form submission', () => {
    const username = 'user2';
    const password = '1234';

    cy.visit('/login');

    cy.get('input[name=username]').type(username);
    cy.get('input[name=password]').type(`${password}{enter}`);

    cy.visit('http://localhost:4200/detail/Users/2');

    cy.url().should('include', '/detail/Users/2');
    // cy.getCookie('your-session-cookie').should('exist');
    cy.get('h1').should('contain', 'USER TWO');
  });
});
