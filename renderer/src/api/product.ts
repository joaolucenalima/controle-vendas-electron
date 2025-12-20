export interface Product {
  id: string;
  name: string;
  priceInCents: number;
  imgUrl?: string;
}

export interface CreateProduct {
  name: string;
  priceInCents: number;
  imgUrl?: string;
}