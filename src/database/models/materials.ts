import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";

class Materials extends Model {
  declare id: string;
  declare name: string;
  declare priceInCents: number
}

Materials.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  priceInCents: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false,
});

export default Materials;