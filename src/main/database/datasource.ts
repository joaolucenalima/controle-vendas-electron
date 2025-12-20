import { app } from "electron";
import path from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Expense, Product, Sale, SaleItem } from "../database/entities";

const IS_DEV = !app.isPackaged;

let databasePath: string;

if (IS_DEV) {
  databasePath = path.resolve(__dirname, "database.dev.sqlite");
} else {
  databasePath = path.resolve(
    app.getPath("userData"),
    "database",
    "database.sqlite"
  );
}

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: databasePath,
  synchronize: true,
  logging: true,
  entities: [Sale, Expense, Product, SaleItem],
  subscribers: [],
  migrations: [path.resolve(__dirname, "main", "database", "migrations", "*.{js,ts}")],
});
