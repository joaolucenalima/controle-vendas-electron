import sequelize from "./connection";
import { DataTypes, Model } from "sequelize";

interface productProps {
  name: string,
  priceInCents: number
}

interface updateProductsProps {
  id: string,
  name: string,
  priceInCents: number
}
interface salesProps {
  productID: string,
  quantity: number,
  amountInCents: number,
  createdAt: string
}

type updateSalesProps = {
  id: number,
  productID: string,
  quantity: number,
  amountInCents: number
}

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
  priceInCents: DataTypes.INTEGER
}, {
  sequelize,
  timestamps: false
});

export async function registerProduct(props: productProps) {
  try {
    await Products.create({
      name: props.name,
      priceInCents: props.priceInCents
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

export async function updateProducts(props: updateProductsProps) {
  try {
    await Products.update({
      name: props.name,
      priceInCents: props.priceInCents
    },
      {
        where: {
          id: props.id
        }
      })
    return ("Edição salva com sucesso!")
  } catch (error) {
    console.log(error)
    return "Não foi possível registrar as mudanças. Tente novamente mais tarde"
  }
}


class Sales extends Model {
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
  amountInCents: DataTypes.INTEGER,
}, {
  sequelize,
  timestamps: true,
  updatedAt: false
});

Sales.belongsTo(Products, {
  foreignKey: 'productID'
})

export async function listSales() {
  try {
    return await Sales.findAll({
      include: Products,
      order: [
        ['id', 'DESC'],
      ]
    })
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
      amountInCents: props.amountInCents,
      createdAt: props.createdAt
    })
    return ("Venda adicionada com sucesso!")
  }
  catch (error) {
    console.log(error);
  }
}

export async function updateSales(props: updateSalesProps) {
  try {
    await Sales.update({
      productID: props.productID,
      quantity: props.quantity,
      amountInCents: props.amountInCents
    },
      {
        where: {
          id: props.id
        }
      })
    return ("Edição salva com sucesso!")
  } catch (error) {
    console.log(error)
    return "Não foi possível registrar as mudanças. Tente novamente mais tarde."
  }
}

export async function countSales() {
  try {
    return await Sales.count()
  } catch (error) {
    console.log(error)
    return 0
  }
}

export async function getSalesAmount() {
  try {
    return await Sales.sum('amountInCents')
  } catch (error) {
    console.log(error)
    return 0
  }
}