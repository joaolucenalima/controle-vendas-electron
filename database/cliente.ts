import sequelize from "./connection";
import { DataTypes } from "sequelize";

const Client = sequelize.define('client', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: DataTypes.STRING
}, {
  timestamp: false,
})

export async function registerClient(name: string) {
  try {
    await Client.create({
      name,
    })
  }
  catch (error) {
    console.log(error);
  }
}