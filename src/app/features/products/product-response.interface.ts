import { IProduct } from './product.interface';

export interface IProductResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface IProductCategory {
  slug: string;
  name: string;
  url: string;
}
