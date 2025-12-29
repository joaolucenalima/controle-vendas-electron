import { CreateProduct, Product } from "./product";
import { CreateSale, Sale } from "./sale";

declare global {
  interface Window {
    api: {
      product: {
        getAll: () => Promise<Product[]>;
        getById: (id: string) => Promise<Product>;
        upsert: ({ id, data }: { id?: string; data: CreateProduct }) => Promise<Product>;
        delete: (id: string) => Promise<boolean>;
      };
      sale: {
        getAll: () => Promise<Sale[]>;
        getById: (id: number) => Promise<Sale>;
        create: (data: CreateSale) => Promise<Sale>;
        update: ({ id, data }: { id: number; data: CreateSale }) => Promise<Sale>;
        delete: (id: number) => Promise<boolean>;
      };
    };
  }
}
