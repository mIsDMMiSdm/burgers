export type Ingredient = {
  __v: number | string;
  _id: string;
  _uid?: string;
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  quantity?: number;
  type: 'bun' | 'main' | 'sauce';
}