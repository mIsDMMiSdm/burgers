import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Ingredient } from '../../types/Ingredient';

type IngredientsCounter = Record<string, number>

export type CartState = {
  cart: {
    bun: Ingredient | null;
    ingredients: Ingredient[];
  },
  ingredientsCounter: IngredientsCounter
}

const initialState: CartState = {
  cart: {
    bun: null,
    ingredients: [],
  },
  ingredientsCounter: {},
};

const cartSlice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    addIngredient(
      state,
      action: PayloadAction<{ ingredient: Ingredient }>
    ) {
      const ingredientId = action.payload.ingredient._id;
      const counter = state.ingredientsCounter[ingredientId];
      const isIngredientInCart = Object.keys(state.ingredientsCounter).includes(ingredientId);

      (state.cart.bun !== null
        && action.payload.ingredient.type === 'bun'
        && state.cart.bun !== action.payload.ingredient) && (state.ingredientsCounter[state.cart.bun._id] = 0);

      isIngredientInCart
        ? state.ingredientsCounter[action.payload.ingredient._id] = counter + 1
        : state.ingredientsCounter[action.payload.ingredient._id] = 1;

      action.payload.ingredient.type === 'bun'
        ? state.cart.bun = action.payload.ingredient
        : state.cart.ingredients.push(action.payload.ingredient);
    },
    cleanCart(state) {
      state.cart = {
        bun: null,
        ingredients: []
      };
      state.ingredientsCounter = {};
    },
    moveIngredients(
      state,
      action: PayloadAction<{ atIndex: number, index: number, ingredient: Ingredient }>
    ) {
      state.cart.ingredients.splice(action.payload.index, 1);
      state.cart.ingredients.splice(action.payload.atIndex, 0, action.payload.ingredient);
    },
    removeIngredient(
      state,
      action: PayloadAction<{ _id: string, index: number }>
    ) {
      const ingredientId = action.payload._id;
      const counter = state.ingredientsCounter[ingredientId];
      state.ingredientsCounter[action.payload._id] = counter - 1;
      state.cart.ingredients.splice(action.payload.index, 1);
    }
  }
});

export const {
  addIngredient,
  cleanCart,
  moveIngredients,
  removeIngredient
} = cartSlice.actions;
export default cartSlice.reducer;