/// <reference types="cypress" />

const { generateUser } = require('../support/generateUser');

describe('Sign In page', () => {
  beforeEach(() => {
    cy.visit('https://react-redux.realworld.io').should('exist');
  });

  it('should provide an ability to log in', () => {
    Cypress.on('uncaught:exception', (err) => {
      // log the error so it is handled and returning false prevents Cypress from
      // failing the test
      /* eslint-disable no-console */
      console.error('Uncaught exception in test:', err);
      /* eslint-enable no-console */
      return false;
    });
    const { email, password } = generateUser();
    cy.get('a.nav-link').should('contain.text', 'Sign in').should('exist');
    cy.contains('a', 'Sign in').should('exist').click();
    cy.get('h1').should('contain.text', 'Sign In').should('exist');
    const expectedUrl = 'https://react-redux.realworld.io/#/login?';
    cy.url().should('contain', expectedUrl);

    cy.url().then((url) => {
      expect(url.slice(0, -9)).to.eq(expectedUrl);
    });

    // cy.get('input[placeholder="Username"]').should("exist").type(userName);
    cy.get('input[placeholder="Email"]').should('exist').type(email);
    cy.get('input[placeholder="Password"]').should('exist').type(password);
    cy.contains('button.btn.btn-lg.btn-primary.pull-xs-right', 'Sign in')
      .should('exist')
      .click();
  });
});
