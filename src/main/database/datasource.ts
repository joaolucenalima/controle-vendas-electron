import path from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Expense, Product, Sale, SaleItem } from "../database/entities";

const isElectron = !!process.versions.electron;

let databasePath: string;

if (isElectron) {
  const { app } = require("electron");

  databasePath = path.resolve(
    app.getPath("userData", "database"),
    app.isPackaged ? "database.sqlite" : "database.dev.sqlite"
  );
} else {
  databasePath = path.resolve(__dirname, "database.dev.sqlite");
}

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: databasePath,
  synchronize: true,
  logging: true,
  entities: [Sale, Expense, Product, SaleItem],
  subscribers: [],
  migrations: [path.resolve(__dirname, "database", "migrations", "*.{js,ts}")],
});
