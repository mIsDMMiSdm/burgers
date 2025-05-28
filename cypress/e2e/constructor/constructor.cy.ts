import { URL } from '@api';
import { deleteCookie, setCookie } from '../../../src/utils/cookie';

// Настройка тестового окружения
const prepareTestEnvironment = () => {
  setCookie('accessToken', 'Bearer test-token');
  localStorage.setItem('refreshToken', 'test-refresh-token');
  cy.intercept('GET', `${URL}/auth/user`, { fixture: 'user.json' }).as('fetchUser');
  cy.intercept('GET', `${URL}/ingredients`, { fixture: 'ingredients.json' }).as('loadIngredients');
  cy.visit('/');
};

// Очистка после тестов
const resetTestState = () => {
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
};

describe('Тесты конструктора бургеров', () => {
  beforeEach(prepareTestEnvironment);
  afterEach(resetTestState);

  describe('Проверка ингредиентов', () => {
    it('Должен корректно загружать и отображать ингредиенты', () => {
      cy.wait('@fetchUser');
      cy.get('[data-cy="constructor"]').as('constructorSection');
      
      cy.addIngredient('Булки');
      cy.addIngredient('Начинки');

      cy.get('@constructorSection').should('include.text', 'Краторная булка N-200i');
      cy.get('@constructorSection').should('include.text', 'Биокотлета из марсианской Магнолии');
    });
  });

  describe('Работа с модальными окнами', () => {
    it('Должен открывать и закрывать модальное окно с деталями ингредиента', () => {
      cy.wait('@fetchUser');
      cy.get('[data-cy="ingredient-item"]').first().click();
      
      cy.get('[data-cy="modal"]').as('modal')
        .should('be.visible')
        .should('contain', 'Краторная булка N-200i');

      cy.get('[data-cy="modal-close"]').click();
      cy.get('@modal').should('not.exist');
    });
  });

  describe('Оформление заказа', () => {
    it('Должен успешно создавать заказ и отображать номер', () => {
      cy.wait('@fetchUser');
      cy.intercept('POST', `${URL}/orders`, { fixture: 'order.json' }).as('postOrder');
      
      cy.get('[data-cy="constructor"]').as('constructorSection');
      cy.addIngredient('Булки');
      cy.addIngredient('Начинки');
      cy.get('@constructorSection').find('button').click({ force: true });

      cy.get('[data-cy="modal"]').as('orderModal')
        .should('be.visible')
        .should('contain', '66666');

      cy.get('[data-cy="modal-close"]').click();
      cy.get('@orderModal').should('not.exist');
      cy.wait('@postOrder');
    });
  });
});