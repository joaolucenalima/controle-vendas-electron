import { DataTypes, Model, Sequelize } from "sequelize";
import { Materials } from "./Materials";

export class Shopping extends Model {
  declare id: number;
  declare materialID: string;
  declare quantity: number;
  declare amountInCents: number;
  declare createdAt: string;
  declare Material: {
    id: string;
    name: string,
    price: number
  }
}

export function InitShopping(sequelize: Sequelize) {
  Shopping.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    materialID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    amountInCents: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
  }, {
    sequelize,
    timestamps: true,
    updatedAt: false,
  });

  Shopping.belongsTo(Materials, {
    foreignKey: 'materialID',
  })
}