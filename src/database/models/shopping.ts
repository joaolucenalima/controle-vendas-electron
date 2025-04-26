import { DataTypes, Model } from "sequelize";
import sequelize from "../config";
import Materials from "./materials";

class Shopping extends Model {
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
  onDelete: 'NO ACTION',
})

export default Shopping;