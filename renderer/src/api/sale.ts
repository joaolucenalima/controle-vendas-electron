export interface Sale {
  id: number;
  createdAt: string;
  products: {
    id: string;
    name: string;
    priceInCents: number;
    quantity: number;
  }[]
}

export interface CreateSale {
  date: Date;
  products: {
    id: string;
    quantity: number;
    priceInCents: number;
  }[];
}