import { DataTypes, Model, Sequelize } from "sequelize";
import { Products } from "./Products";

export class Sales extends Model {
  declare id: number;
  declare productID: string;
  declare quantity: number;
  declare amountInCents: number;
  declare createdAt: string;
  declare Product: {
    id: string,
    name: string,
    priceInCents: number
  };
}

export function InitSales(sequelize: Sequelize) {
  Sales.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    productID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: DataTypes.INTEGER,
    amountInCents: DataTypes.DOUBLE,
  }, {
    sequelize,
    timestamps: true,
    updatedAt: false
  });

  Sales.belongsTo(Products, {
    foreignKey: 'productID',
  })
}