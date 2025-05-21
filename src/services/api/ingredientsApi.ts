import { IngredientsPromise } from '../../types/IngredientsPromise';
import { request } from '../helpers/request';

export const getIngredients = () => request('ingredients') as Promise<IngredientsPromise>;
