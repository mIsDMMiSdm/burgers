export type Order = {
  _id: string;
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: 'created' | 'done' | 'pending';
  updatedAt: string;
}