import sequelize from "./connection";
import { DataTypes, Model } from "sequelize";

class Materials extends Model {
  declare id: number;
  declare description: string;
  declare amountInCents: number;
}

Materials.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  description: DataTypes.STRING,
  amountInCents: DataTypes.INTEGER,
}, {
  sequelize,
});

export async function listMaterials() {
  try {
    return await Materials.findAll()
  }
  catch (error) {
    console.log(error);
  }
}