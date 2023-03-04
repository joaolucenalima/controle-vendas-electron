import sequelize from "./connection";
import { DataTypes, Model } from "sequelize";

class Client extends Model { }

Client.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: DataTypes.STRING
}, {
  sequelize,
  timestamps: false
});

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

export async function listClient() {
  try {
    return await Client.findAll()
  }
  catch (error) {
    console.log(error);
    return null
  }
}