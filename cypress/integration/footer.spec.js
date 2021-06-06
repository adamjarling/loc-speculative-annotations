/// <reference types="Cypress" />

describe('Footer bar', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[aria-label=Close]').click();
  });

  /**
   * Select a new work
   */
  it('renders select a new work button and opens a modal with all works', () => {
    cy.visit('/');
    cy.get('[aria-label=Close]').click();

    // Assume default work here, in order to test changing a work
    cy.url().should('include', '/00650866');

    cy.get('[data-testid=works-list-modal-button]').click();
    cy.get('[data-testid=works-list-wrapper]').within(() => {
      cy.contains('Select another item from the Library of Congress');
      cy.get('[data-testid=work-item]').should('have.length', 40);
      cy.contains('4').next().click();
      cy.contains('Annotate').click();
      cy.url().should('include', '/78694920');
    });
  });

  /**
   * LC Staff Annotations button
   * Note: this only tests one Work, and just verifies the URL link exists
   */
  it('renders the LC Staff Annotations button if a Staff Annotation file exists', () => {
    cy.visit('/');
    cy.contains('LC Staff Annotations').should('not.exist');

    cy.visit('/2008401028');
    cy.contains('LC Staff Annotations')
      .invoke('attr', 'href')
      .should('include', '/2008401028_Salhi.4615efdf.png');
  });

  /**
   * Learn More (Metadata) panel
   * Note: this only tests one Work, to verify the code it's pulling through data
   * and not necessarily validating data
   */
  it.only('renders Learn More button and slide out panel of metadata and values pulled from IIIF manifests', () => {
    // Use this Work as a test case
    cy.visit('/2004633094');
    cy.get('[aria-label=Close]').click();

    cy.get('[data-testid=metadata-button]').click();
    cy.get('[data-testid=metadata-wrapper]').within(() => {
      cy.contains('By').next().children().should('include.text', 'Bula, G. E.');
      cy.contains('Created Published')
        .next()
        .children()
        .should('include.text', 'United States');
      cy.contains('Original Format')
        .next()
        .children()
        .should('include.text', 'map');
      cy.contains('Subjects')
        .next()
        .children()
        .should('include.text', 'temperance');
      cy.contains('Research')
        .next()
        .children()
        .should(
          'include.text',
          'https://guides.loc.gov/alcoholic-beverage-industry/temperance-prohibition'
        );
      cy.contains('Collection');
      cy.contains('General Maps')
        .invoke('attr', 'href')
        .should('include', 'https://www.loc.gov/collections/general-maps');

      cy.contains('See item on loc.gov');
      cy.contains('View image')
        .invoke('attr', 'href')
        .should('include', 'https://www.loc.gov/item/2004633094/');
    });
  });
});
