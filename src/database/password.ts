import { DataTypes, Model } from "sequelize";
import sequelize from "./config";

class Password extends Model {
  declare pass: string;
}

Password.init({
  pass: {
    type: DataTypes.STRING,
    primaryKey: true,
  }
}, {
  sequelize,
  timestamps: false,
})

export async function setPassword(pass: string) {
  try {
    await Password.create({
      pass,
    })
    return ({ success: "Senha cadastrada!" })
  }
  catch (err) {
    console.log(err)
    return ({ error: "Erro ao cadastrar senha." })
  }
}

export async function getPassword() {
  return await Password.findOne()
}

export async function countPassword() {
  try {
    const number = await Password.count()
    return number
  } catch (err) {
    console.log("Nenhum registro encontrado, retornando 0...")
    return 0
  }
}