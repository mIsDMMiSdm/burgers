describe('Stellar Burgers Constructor Tests', () => {
    before(() => {
      // Мокаем API endpoints с правильным базовым URL
      const API_URL = Cypress.env('BURGER_API_URL');
      
      cy.intercept('GET', `${API_URL}/ingredients`, { 
        fixture: 'ingredients.json' 
      }).as('getIngredients');
      
      cy.intercept('POST', `${API_URL}/orders`, { 
        fixture: 'order.json' 
      }).as('createOrder');
      
      cy.intercept('GET', `${API_URL}/auth/user`, { 
        fixture: 'user.json' 
      }).as('getUser');
  
      // Очищаем localStorage и устанавливаем тестовые токены
      cy.window().then((win) => {
        win.localStorage.clear();
        win.localStorage.setItem('accessToken', 'test-token');
        win.localStorage.setItem('refreshToken', 'test-refresh-token');
      });
    });
  
    beforeEach(() => {
      // Проверяем доступность приложения
      cy.visit('/');
      // Ждем загрузки ингредиентов
      cy.wait('@getIngredients', { timeout: 10000 });
    });
  
    it('should load application successfully', () => {
      cy.contains('Соберите бургер').should('be.visible');
    });
  
    it('should display ingredients list', () => {
      cy.get('[data-testid="ingredient-item"]').should('have.length.at.least', 3);
      cy.contains('Краторная булка N-200i').should('exist');
    });
  
    // ... остальные тесты остаются без изменений ...
  });