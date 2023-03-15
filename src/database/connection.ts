import { ipcRenderer } from "electron"
import path from "path"
import { Sequelize } from "sequelize"

const database_dir = ipcRenderer.sendSync('get-data-path')
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