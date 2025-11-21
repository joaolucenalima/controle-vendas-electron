import { app } from "electron";
import path from "path";
import { DataSource } from "typeorm";
import { Sale, Expense, Product, SaleItem } from "./entities";

const database_path = path.resolve(
	app.getPath("userData"),
	"database",
	"database.sqlite"
);

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: database_path,
	synchronize: false,
	logging: true,
	entities: [Sale, Expense, Product, SaleItem],
	subscribers: [],
	migrations: [path.join(__dirname, "database", "/migrations/*.{js,ts}")],
});
