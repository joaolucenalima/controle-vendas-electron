import { Model, DataTypes, Sequelize } from "sequelize";

export class Products extends Model {
  declare id: string;
  declare name: string;
  declare priceInCents: number
}

export function InitProducts(sequelize: Sequelize) {
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
}