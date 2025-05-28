/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      addIngredient(type: string): void;
    }
  }
}

Cypress.Commands.add('addIngredient', (category) => {
  const selector = `[data-cy="${category}"] button`;
  cy.get(selector).first().click();
});