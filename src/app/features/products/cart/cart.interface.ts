export interface ICartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
}

export interface ICart {
  id: number;
  products: ICartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
  isDeleted?: boolean;
  deletedOn?: string;
}

export interface ICartProductInput {
  id: number;
  quantity: number;
}

export interface ICartRequest {
  userId: number;
  products: ICartProductInput[];
}
