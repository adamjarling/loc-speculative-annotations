/// <reference types="Cypress" />

describe('Main content section', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders main layout components as expected', () => {
    cy.get('[data-testid=intro-message]');
  });
});
