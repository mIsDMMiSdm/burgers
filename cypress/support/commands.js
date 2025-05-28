// Кастомные команды для тестов
Cypress.Commands.add('dragToConstructor', (ingredientIndex = 0) => {
    cy.get('[data-testid="ingredient-item"]')
      .eq(ingredientIndex)
      .drag('[data-testid="constructor-drop"]');
  });
  
  Cypress.Commands.add('login', () => {
    window.localStorage.setItem('accessToken', 'test-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');
  });