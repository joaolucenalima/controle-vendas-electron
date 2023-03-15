import sequelize from "./connection";
import { DataTypes, Model } from "sequelize";

type setMaterialsProps = {
  description: string,
  amount: number,
  createdAt: string
}

class Materials extends Model {
  declare id: number;
  declare description: string;
  declare amountInCents: number;
  declare createdAt: string
}

Materials.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  description: DataTypes.STRING,
  amountInCents: DataTypes.INTEGER,
  createdAt: DataTypes.STRING
}, {
  sequelize,
  timestamps: false,
});

export async function getMaterials() {
  try {
    return await Materials.findAll({
      order: [
        ['id', 'DESC'],
      ]
    })
  }
  catch (error) {
    console.log(error);
  }
}

export async function setMaterials(data: setMaterialsProps) {
  try {
    data.amount *= 100
    await Materials.create({
      description: data.description,
      amountInCents: data.amount,
      createdAt: data.createdAt
    })
    return "Compra registrada com sucesso!"
  } catch (error) {
    console.log(error)
    return "Erro ao registrar compra no banco de dados"
  }
}

export async function countBuys() {
  try {
    return await Materials.count()
  } catch (error) {
    console.log(error)
    return 0
  }
}

export async function sumMaterialsAmount() {
  try {
    return await Materials.sum('amountInCents')
  } catch (error) {
    console.log(error)
    return 0
  }
}