/// <reference types="cypress" />

// Можно добавить кастомные команды
declare namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
    }
  }