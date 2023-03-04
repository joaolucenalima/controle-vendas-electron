import sequelize from "./connection";
import { DataTypes, Model } from "sequelize";

class Materials extends Model { }

Materials.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: DataTypes.STRING,
  quantity: DataTypes.INTEGER,
  price: DataTypes.FLOAT,
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