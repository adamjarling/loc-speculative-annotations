describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('https://nervous-gates-006218.netlify.app/2007676133');
    cy.contains('About');
  });
});
