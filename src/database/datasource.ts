import { ipcRenderer } from "electron";
import path from "path";
import { DataSource } from "typeorm";
import { Sales } from "./entities";

const database_path = path.resolve(
	ipcRenderer.sendSync("get-data-path"),
	"database",
	"database.sqlite"
);

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: database_path,
	synchronize: false,
	logging: true,
	entities: [Sales],
	subscribers: [],
	migrations: [],
});
