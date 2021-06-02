/// <reference types="Cypress" />

describe('Layout components', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders layout components as expected', () => {
    // Eyebrow navigation
    cy.get('[data-testid="eyebrow-row"]');
    cy.get('[data-testid="loc-link"]');
    cy.get('[data-testid=color-mode-switcher]');

    // Primary nav row
    cy.get('[data-testid=layout-header]').within(() => {
      cy.contains('About');
      cy.contains('Teach');
      cy.contains('My Saved Annotations');
    });

    // Adjustment bar
    cy.get('[data-testid=adjustment-bar]').within(() => {
      cy.contains('Clear Canvas');
      cy.get('[data-testid=undo-button]');
      cy.get('[data-testid=redo-button]');
      cy.contains('Save');
      cy.contains('Download');
      cy.contains('Hide Annotations');
    });
  });
});
