import sequelize from "./connection";
import { DataTypes, Model } from "sequelize";

type setShoppingProps = {
  materialID: string,
  quantity: number,
  amount: number,
  createdAt: string
}

type setMaterialsProps = {
  name: string,
  price: number
}

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
  name: DataTypes.STRING,
  priceInCents: DataTypes.INTEGER
}, {
  sequelize,
  timestamps: false,
});

export async function getMaterials() {
  try {
    return await Materials.findAll()
  } catch (error) {
    console.log(error)
  }
}

export async function setMaterials(props: setMaterialsProps) {
  try {
    await Materials.create({
      name: props.name,
      priceInCents: props.price
    })
    return ("Material registrado com sucesso!")
  } catch (error) {
    console.log(error)
  }
}

class Shopping extends Model {
  declare id: number;
  declare materialID: string;
  declare quantity: number;
  declare amountInCents: number;
  declare createdAt: string;
  declare Material: {
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
  materialID: DataTypes.STRING,
  quantity: DataTypes.NUMBER,
  amountInCents: DataTypes.INTEGER,
  createdAt: DataTypes.STRING
}, {
  sequelize,
  timestamps: false,
});

Shopping.belongsTo(Materials, {
  foreignKey: 'materialID'
})

// busca informações para a tabela
export async function getShopping() {
  try {
    return await Shopping.findAll({
      include: Materials,
      order: [
        ['id', 'DESC'],
      ]
    })
  }
  catch (error) {
    console.log(error);
  }
}

// registra da compra 
export async function setShopping(data: setShoppingProps) {
  try {
    await Shopping.create({
      materialID: data.materialID,
      quantity: data.quantity,
      amountInCents: data.amount,
      createdAt: data.createdAt
    })
    return "Compra registrada com sucesso!"
  } catch (error) {
    console.log(error)
    return "Erro ao registrar compra no banco de dados"
  }
}

export async function countBuys() {
  try {
    return await Shopping.count()
  } catch (error) {
    console.log(error)
    return 0
  }
}

// soma o custo total
export async function sumShoppingAmount() {
  try {
    return await Shopping.sum('amountInCents')
  } catch (error) {
    console.log(error)
    return 0
  }
}