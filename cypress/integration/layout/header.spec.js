/// <reference types="Cypress" />

describe('Header section', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders header components as expected', () => {
    // Eyebrow navigation
    cy.get('[data-testid="eyebrow-row"]');
    cy.get('[data-testid="loc-link"]');

    // Primary nav row
    cy.get('[data-testid=logo]');
    cy.contains('About');
    cy.contains('Teach');

    // On the home screen button should be disabled
    cy.get('[data-testid=app-link]').should('be.disabled');

    // Adjustment bar
    cy.get('[data-testid=adjustment-bar]');

    // Clear all button
    cy.get('[data-testid=clear-all-link]').click();
    cy.contains('Clear Canvas');
    cy.contains('Cancel').click();

    // TODO: why is this not working?
    cy.get('[data-testid=foo]').should('not.exist');

    cy.get('[data-testid=share-link]');
    cy.get('[data-testid=save-link]');
    cy.get('[data-testid=download-link]');
  });
});
