export interface Product {
  id: number;
  name: string;
  priceInCents: number;
  imgUrl?: string;
}

export interface CreateProduct {
  name: string;
  priceInCents: number;
  imgUrl?: string;
}