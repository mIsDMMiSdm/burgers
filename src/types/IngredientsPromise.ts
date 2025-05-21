import { Ingredient } from './Ingredient';

export type IngredientsPromise = {
  data: Ingredient[],
  success: boolean
}