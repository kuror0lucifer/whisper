import { Price } from './price.type';

export interface Game {
  nsuid: string;
  objectID: string;
  sku: string;
  productImage: string;
  title: string;
  price: Price;
  availability: string;
  description: string;
  url: string;
}
