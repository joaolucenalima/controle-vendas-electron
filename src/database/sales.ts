import sequelize from "./connection";
import { DataTypes, Model } from "sequelize";

interface salesProps {
  productID: string,
  quantity: number,
  amount: number
}

interface productProps {
  name: string,
  price: number
}

class Products extends Model {
  declare id: string;
  declare name: string;
  declare price: number
}

Products.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: DataTypes.STRING,
  price: DataTypes.FLOAT
}, {
  sequelize,
  timestamps: false
});

export async function registerProduct(props: productProps) {
  try {
    await Products.create({
      name: props.name,
      price: props.price
    })
    return ("Produto cadastrado com sucesso!")
  }
  catch (error) {
    console.log(error);
  }
}

export async function listProducts() {
  try {
    return await Products.findAll({
      attributes: ['name', 'id']
    })
  }
  catch (error) {
    console.log(error);
  }
}

class Sales extends Model {
  declare id: number;
  declare productID: string;
  declare quantity: number;
  declare amount: number
}

Sales.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  productID: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'id'
    }
  },
  quantity: DataTypes.INTEGER,
  amount: DataTypes.INTEGER
}, {
  sequelize,
});

export async function listSales() {
  try {
    const sales = await Sales.findAll()
    return sales;
  }
  catch (error) {
    console.log(error);
  }
}

export async function registerSale(props: salesProps) {
  try {
    await Sales.create({
      productID: props.productID,
      quantity: props.quantity,
    })
    return ("Venda adicionada com sucesso!")
  }
  catch (error) {
    console.log(error);
  }
}

export async function countSales() {
  try {
    return await Sales.count()
  } catch (error) {
    console.log(error)
  }
}