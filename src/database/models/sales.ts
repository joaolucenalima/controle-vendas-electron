import { DataTypes, Model } from "sequelize";
import sequelize from "../config";
import Products from "./products";
import SalesProducts from "./sales-products";

class Sales extends Model {
  declare id: number;
  declare quantity: number;
  declare amountInCents: number;
  declare createdAt: string;
}

Sales.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  quantity: DataTypes.INTEGER,
  amountInCents: DataTypes.DOUBLE,
}, {
  sequelize,
  timestamps: true,
  updatedAt: false
});

Sales.belongsToMany(Products, {
  through: SalesProducts
})

export default Sales;