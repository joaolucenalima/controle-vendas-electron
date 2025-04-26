import { DataTypes, Model } from "sequelize";
import sequelize from "../config";

class Products extends Model {
  declare id: string;
  declare name: string;
  declare priceInCents: number
}

Products.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: DataTypes.STRING,
  priceInCents: DataTypes.DOUBLE
}, {
  sequelize,
  timestamps: false
});

export default Products;