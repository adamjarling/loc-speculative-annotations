/// <reference types="Cypress" />

describe('Toolbar components', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[aria-label=Close]').click();
  });

  /**
   * Quick question stamp
   */
  it('renders Quick question control and modal', () => {
    cy.get('[data-testid=quick-question-button]').click();
    cy.get('[data-testid=quick-question-body]').within(() => {
      cy.get('[data-testid=stamp18]').click();
    });
    cy.get('[data-testid=quick-question-footer]').within(() => {
      cy.contains('Cancel');
      cy.contains('Select').click();
    });
  });

  /**
   * Pointer tool
   */
  it('renders the pointer tool control', () => {
    cy.get('[data-testid=pointer-control]');
  });

  /**
   * Text tool
   */
  it('renders the text tool control and options panel', () => {
    // Color options don't show until Text tool clicked upon
    cy.get('[data-testid=color-options-wrapper]')
      .as('color-wrapper')
      .should('not.exist');
    cy.get('[data-testid=type-text-control]').click();
    cy.get('@color-wrapper');

    cy.get('[data-testid=font-picker-options]').within(() => {
      cy.get('#reenieBeanie');
      cy.get('#courierPrime');
      cy.get('#openSans');
    });
  });

  /**
   * Draw tool
   */
  it.only('renders the draw control and options panel', () => {
    cy.get('[data-testid=color-options-wrapper]')
      .as('color-wrapper')
      .should('not.exist');
    cy.get('[data-testid=width-picker-wrapper]')
      .as('width-picker-wrapper')
      .should('not.exist');
    cy.get('[data-testid=draw-control]').click();

    // Verify all the colors pull through.  Only really need to test this once.
    cy.get('[data-testid=color-options-wrapper]').within(() => {
      cy.get('[data-testid=green]');
      cy.get('[data-testid=yellow]');
      cy.get('[data-testid=teal]');
      cy.get('[data-testid=pink]');
      cy.get('[data-testid=blue]');
      cy.get('[data-testid=pastelGreen]');
      cy.get('[data-testid=pastelBlue]');
      cy.get('[data-testid=pastelPurple]');
    });
    cy.get('@width-picker-wrapper');
  });

  /**
   * Marker tool
   */
  it('renders the highlighter control and options panel', () => {
    cy.get('[data-testid=color-options-wrapper]')
      .as('color-wrapper')
      .should('not.exist');
    cy.get('[data-testid=width-picker-wrapper]')
      .as('width-picker-wrapper')
      .should('not.exist');
    cy.get('[data-testid=highlighter-control]').click();
    cy.get('@color-wrapper');
    cy.get('@width-picker-wrapper');
  });

  /**
   * Shape tool
   */

  /**
   * Stamp tool
   */
});
