import { createSlice } from '@reduxjs/toolkit';

import { Ingredient } from '../../types/Ingredient';
import { fetchIngredients } from '../asyncThunk/ingredientsThunk';

export type IngredientsState = {
  ingredients: Ingredient[],
  ingredientsFetchFailed: boolean;
  ingredientsFetchRequest: boolean;
}

const initialState: IngredientsState = {
  ingredients: [],
  ingredientsFetchFailed: false,
  ingredientsFetchRequest: false,
};

const ingredientsSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.ingredientsFetchRequest = true;
        state.ingredientsFetchFailed = false;
      })
      .addCase(fetchIngredients.fulfilled,
        (
          state,
          action
        ) => {
          const { data } = action.payload;
          state.ingredients = data;
          state.ingredientsFetchRequest = false;
        })
      .addCase(fetchIngredients.rejected, (state) => {
        state.ingredientsFetchRequest = false;
        state.ingredientsFetchFailed = true;
      });
  },
  initialState,
  name: 'ingredients',
  reducers: {}
});

export default ingredientsSlice.reducer;