import { ipcRenderer } from "electron"
import path from "path"
import { Sequelize } from "sequelize"

import { InitMaterials } from "./models/Materials"
import { InitProducts } from "./models/Products"
import { InitSales } from "./models/Sales"
import { InitShopping } from "./models/Shopping"

const database_dir = path.resolve(ipcRenderer.sendSync('get-data-path'), "database")
const database_path = path.resolve(database_dir, "database.sqlite")

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: database_path,
  logging: false,
});

InitProducts(sequelize);
InitMaterials(sequelize);
InitSales(sequelize);
InitShopping(sequelize);

(async () => {
  await sequelize.sync()
})()