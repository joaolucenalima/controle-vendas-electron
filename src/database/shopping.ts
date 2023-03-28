import sequelize from "./connection";
import { DataTypes, Model } from "sequelize";

type setMaterialsProps = {
  name: string,
  price: number
}

type updateMaterialsProps = {
  id: string,
  name: string,
  priceInCents: number,
}

type setShoppingProps = {
  materialID: string,
  quantity: number,
  amount: number,
  createdAt: string
}

type updateShoppingProps = {
  id: number,
  materialID: string,
  quantity: number,
  amountInCents: number
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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  priceInCents: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
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
    return "Não foi possível cadastrar o material. Tente novamente mais tarde"
  }
}

export async function updateMaterials(props: updateMaterialsProps) {
  try {
    await Materials.update({
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

export async function deleteMaterials(id: string | number) {
  try {
    await Materials.destroy({
      where: {
        id
      }
    })
    return "Registro apagado com sucesso."
  } catch (error) {
    console.log(error)
    return "Não foi possível apagar o registro. Tente novamente mais tarde"
  }
}

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
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  sequelize,
  timestamps: true,
  updatedAt: false,
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

export async function updateShopping(props: updateShoppingProps) {
  try {
    await Shopping.update({
      materialID: props.materialID,
      quantity: props.quantity
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

export async function deleteShopping(id: string | number) {
  try {
    await Shopping.destroy({
      where: {
        id
      }
    })
    return "Registro apagado com sucesso."
  } catch (error) {
    console.log(error)
    return "Não foi possível apagar o registro. Tente novamente mais tarde"
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