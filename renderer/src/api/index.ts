import { CreateProduct, Product } from "./product";

export { };

declare global {
  interface Window {
    api: {
      product: {
        getAll: () => Promise<Product[]>;
        getById: (id: string) => Promise<Product>;
        upsert: ({ id, data }: { id?: string; data: CreateProduct }) => Promise<Product>;
        delete: (id: string) => Promise<boolean>;
      };
    };
  }
}
