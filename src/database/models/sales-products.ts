import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

class SalesProducts extends Model {
  declare id: number;
  declare productID: string;
  declare saleID: number;
  declare quantity: number;
  declare productPriceInCents: number;
}

SalesProducts.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  productID: {
    type: DataTypes.STRING,
    allowNull: false
  },
  saleID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: DataTypes.INTEGER,
  productPriceInCents: DataTypes.INTEGER,
}, {
  sequelize,
  timestamps: false,
  updatedAt: false
});

export default SalesProducts;