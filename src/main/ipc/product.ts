import { ipcMain } from "electron";
import { IPC_CHANNELS } from "../../shared/ipc";
import { AppDataSource } from "../database/datasource";
import { Product } from "../database/entities";

export function registerProductHandlers() {
  ipcMain.handle(IPC_CHANNELS.GET_ALL_PRODUCTS, async () => {
    const repo = AppDataSource.getRepository(Product);
    return repo.find();
  });

  ipcMain.handle(IPC_CHANNELS.GET_PRODUCT_BY_ID, async (_event, id: number) => {
    const repo = AppDataSource.getRepository(Product);
    return repo.findOneBy({ id });
  });

  ipcMain.handle(
    IPC_CHANNELS.UPSERT_PRODUCT,
    async (_event, { id, data }: { id?: number; data: Partial<Product> }) => {
      const repo = AppDataSource.getRepository(Product);

      if (id) {
        const existing = await repo.findOneBy({ id });
        if (!existing) throw new Error("Product not found");
        const merged = repo.merge(existing, data);
        return repo.save(merged);
      }

      const created = repo.create(data);
      return repo.save(created);
    }
  );

  ipcMain.handle(IPC_CHANNELS.DELETE_PRODUCT, async (_event, id: string) => {
    const repo = AppDataSource.getRepository(Product);
    const result = await repo.delete(id);
    return result.affected && result.affected > 0;
  });
}
