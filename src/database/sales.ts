import sequelize from "./connection";
import { DataTypes, Model } from "sequelize";

interface salesProps {
  product: string,
  quantity: number,
  amount: number
}

interface productProps {
  product: string,
  price: number
}

class Products extends Model { }

Products.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
}, {
  sequelize,
});

export async function registerProduct(props: productProps) {
  try {
    await Products.create({
      name: props.product,
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
    return await Products.findAll()
  }
  catch (error) {
    console.log(error);
  }
}

class Sales extends Model { }

Sales.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  product: Products.name,
  quantity: DataTypes.INTEGER,
  amount: DataTypes.INTEGER
}, {
  sequelize,
});

Sales.hasOne(Products);

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
      product: props.product,
      quantity: props.quantity,
      amount: props.amount
    })
    return ("Venda adicionada com sucesso!")
  }
  catch (error) {
    console.log(error);
  }
}