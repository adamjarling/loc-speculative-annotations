/// <reference types="Cypress" />

describe('Adjustment bar components', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[aria-label=Close]').click();
  });

  /**
   * Clear canvas
   */
  it('renders Clear Canvas warning modal', () => {
    cy.get('[data-testid=clear-canvas-button]').click();
    cy.get('[data-testid=clear-canvas-body]').within(() => {
      cy.contains('Clear Canvas');
      cy.contains(
        'Are you sure? This will remove all current annotations from the canvas'
      );
      cy.contains('Cancel');
      cy.get('[data-testid=clear-button]').click();
    });
  });

  /**
   * Save annotations
   */
  it('renders Save modal', () => {
    let textInput = 'yabba dabba doo';

    cy.get('[data-testid=save-link]').click();
    cy.get('[data-testid=save-annotation-modal]').within(() => {
      cy.contains('My Annotations');
      cy.get('input#user-canvas-name').as('input');
      cy.contains('Cancel');
      cy.get('[data-testid=save-button]')
        .as('save-button')
        .should('be.disabled');

      // Enter a saved value
      cy.get('@input').type(textInput);
      cy.get('@save-button').click();
    });

    // Verify value was actually saved and shows up My Annotations list
    cy.contains('My Saved Annotations').click();
    cy.get('[data-testid=my-saved-annotations-list]').within(() => {
      cy.contains(textInput);
      cy.contains('Edit');
      cy.contains('Delete');
    });
    cy.get('[data-testid=my-annotations]').within(() => {
      cy.get('[aria-label=Close]').click();
    });
  });

  /**
   * Downalod png file
   */
  it('renders Download modal', () => {
    cy.get('[data-testid=download-link]').click();
    cy.get('[data-testid=download-image-content]').within(() => {
      cy.get('img');
      cy.contains('Download');
      cy.contains('Cancel').click();
    });
  });

  /**
   * Hide / Show Annotations toggle
   */
  it.only('toggles Hide / Show Annotations', () => {
    cy.get('[data-testid=toolbar]').as('toolbar');
    cy.get('label.chakra-switch').as('toggle');

    cy.get('[data-testid=adjustment-bar]').within(() => {
      cy.contains('Hide Annotations');
      cy.get('@toggle').click();
    });
    cy.get('@toolbar').should('not.exist');

    // Test toggling view state
    cy.get('@toggle').click();
    cy.get('@toolbar');
  });
});
