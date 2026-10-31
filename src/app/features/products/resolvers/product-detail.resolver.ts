import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IProduct } from '../product.interface';
import { ProductApiService } from '../product-api.service';

export const productDetailResolver: ResolveFn<IProduct> = (route) => {
  const productApi = inject(ProductApiService);
  const id = Number(route.paramMap.get('id'));

  return productApi.getProduct(id);
};
