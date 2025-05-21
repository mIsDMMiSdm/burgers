import { createAsyncThunk } from '@reduxjs/toolkit';

import { IngredientsPromise } from '../../types/IngredientsPromise';
import { getIngredients } from '../api/ingredientsApi';

type IngredientsError = {
  data: unknown,
  ok: boolean,
  status: number,
  statusText: string,
  success: boolean,
  url: string
}

export const fetchIngredients = createAsyncThunk<
  IngredientsPromise,
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  void,
  {
    rejectValue: IngredientsError
  }
>(
  'ingredients/fetchIngredients',
  (_, thunkAPI) =>
    getIngredients()
      .catch(e => {
        const { rejectWithValue } = thunkAPI;
        const hasErrorData = (e as unknown as IngredientsError);
        return rejectWithValue(hasErrorData);
      })
);
