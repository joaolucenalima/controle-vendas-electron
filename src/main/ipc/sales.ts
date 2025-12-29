import { ipcMain } from "electron";
import { In } from "typeorm";
import { IPC_CHANNELS } from "../../shared/ipc";
import { AppDataSource } from "../database/datasource";
import { Product, Sale, SaleItem } from "../database/entities";

interface UpdateSalePayload {
  id?: number;
  data: {
    date: Date;
    products: {
      id: string;
      quantity: number;
      priceInCents: number;
    }[];
  };
}

interface CreateSalePayload {
  date: Date;
  products: {
    id: string;
    quantity: number;
  }[];
}

export function registerSalesHandlers() {
  ipcMain.handle(IPC_CHANNELS.GET_ALL_SALES, async () => {
    const repo = AppDataSource.getRepository(Sale);
    return await repo.find();
  });

  ipcMain.handle(IPC_CHANNELS.GET_SALE_BY_ID, async (_event, id: number) => {
    const repo = AppDataSource.getRepository(Sale);
    return await repo.findOneBy({ id });
  });

  ipcMain.handle(IPC_CHANNELS.CREATE_SALE, async (_event, data: CreateSalePayload) => {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const saleRepo = queryRunner.manager.getRepository(Sale);
      const productRepo = queryRunner.manager.getRepository(Product);
      const saleItemRepo = queryRunner.manager.getRepository(SaleItem);

      let amountInCents = 0;

      const productIds = data.products.map((p) => p.id);

      const products = await productRepo.find({
        where: { id: In(productIds) },
        lock: { mode: "pessimistic_read" },
      });

      if (products.length !== productIds.length) {
        throw new Error("Produtos inválidos selecionados. Reinicie a aplicação e tente novamente.");
      }

      const sale = saleRepo.create({
        date: data.date,
      });

      await saleRepo.save(sale);

      const saleItems: SaleItem[] = [];

      for (const item of data.products) {
        const product = products.find((p) => p.id === item.id)!;

        amountInCents += product.priceInCents * item.quantity;

        const saleItem = saleItemRepo.create({
          saleId: sale,
          productId: product,
          quantity: item.quantity,
          productSalePrice: product.priceInCents,
        });

        saleItems.push(saleItem);
      }

      await saleItemRepo.save(saleItems);

      sale.amountInCents = amountInCents;
      await saleRepo.save(sale);

      await queryRunner.commitTransaction();
      return sale;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  });

  ipcMain.handle(IPC_CHANNELS.UPDATE_SALE, async (_event, { id, data }: UpdateSalePayload) => {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const saleRepo = queryRunner.manager.getRepository(Sale);
      const saleItemRepo = queryRunner.manager.getRepository(SaleItem);
      const productRepo = queryRunner.manager.getRepository(Product);

      const sale = await saleRepo.findOne({
        where: { id },
        relations: ["salesItems", "salesItems.productId"],
        lock: { mode: "pessimistic_write" },
      });

      if (!sale) throw new Error("Venda não encontrada");

      const incomingProductIds = data.products.map((p) => p.id);

      const removedItems = sale.salesItems.filter(
        (item) => !incomingProductIds.includes(item.productId.id)
      );

      if (removedItems.length) {
        await saleItemRepo.remove(removedItems);
      }

      let amountInCents = 0;

      for (const item of data.products) {
        const existingItem = sale.salesItems.find((si) => si.productId.id === item.id);

        amountInCents += item.priceInCents * item.quantity;

        if (existingItem) {
          existingItem.quantity = item.quantity;
          existingItem.productSalePrice = item.priceInCents;

          await saleItemRepo.save(existingItem);
        } else {
          const product = await productRepo.findOneByOrFail({
            id: item.id,
          });

          await saleItemRepo.save(
            saleItemRepo.create({
              saleId: sale,
              productId: product,
              quantity: item.quantity,
              productSalePrice: item.priceInCents,
            })
          );
        }
      }

      sale.date = data.date;
      sale.amountInCents = amountInCents;

      await saleRepo.save(sale);

      await queryRunner.commitTransaction();
      return sale;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  });

  ipcMain.handle(IPC_CHANNELS.DELETE_SALE, async (_event, id: number) => {
    const repo = AppDataSource.getRepository(Sale);
    const result = await repo.delete(id);
    return result.affected && result.affected > 0;
  });
}
