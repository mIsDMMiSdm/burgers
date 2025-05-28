declare namespace Cypress {
  interface Chainable {
    /**
     * Adds ingredient to burger constructor
     * @param type - Ingredient category ('Булки', 'Начинки', etc.)
     */
    addIngredient(type: string): Chainable<void>;
  }
}