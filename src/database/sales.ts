import sequelize from "./connection";
import { DataTypes, Model } from "sequelize";

interface registerProps {
  product: string,
  quantity: number,
  price: number
}

class Sales extends Model { }

Sales.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  product: DataTypes.STRING,
  quantity: DataTypes.INTEGER,
  price: DataTypes.FLOAT,
}, {
  sequelize,
});

export async function listSales() {
  try {
    const sales = await Sales.findAll()

    console.log(sales)

    return sales;
  }
  catch (error) {
    console.log(error);
  }
}

export async function registerSale(props: registerProps) {
  try {
    await Sales.create({
      product: props.product,
      quantity: props.quantity,
      price: props.price
    })
    return ("Venda adicionada com sucesso!")
  }
  catch (error) {
    console.log(error);
  }
}