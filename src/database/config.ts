import { ipcRenderer } from "electron"
import { Sequelize } from "sequelize"
import path from "path"

const database_dir = path.resolve(ipcRenderer.sendSync('get-data-path'), "database")
const database_path = path.resolve(database_dir, "database.sqlite")

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: database_path,
  logging: false,
});

(async () => {
  await sequelize.sync()
})()

export default sequelize