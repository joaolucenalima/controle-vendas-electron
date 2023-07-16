import { Materials } from "../models/Materials"

type setMaterialsProps = {
  name: string,
  price: number
}

type updateMaterialsProps = {
  id: string,
  name: string,
  priceInCents: number,
}

export async function getMaterials() {
  try {
    return await Materials.findAll()
  } catch (err) {
    console.log(err)
  }
}

export async function setMaterials(props: setMaterialsProps) {
  try {
    await Materials.create({
      name: props.name,
      priceInCents: props.price
    })
    return ({ success: "Material registrado com sucesso!" })
  } catch (err) {
    console.log(err)
    return ({ error: "Não foi possível cadastrar o material." })
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
    return ({ success: "Edição salva com sucesso!" })
  } catch (err) {
    console.log(err)
    return ({ error: "Não foi possível registrar as mudanças." })
  }
}

export async function deleteMaterials(id: string | number) {
  try {
    await Materials.destroy({
      where: {
        id
      }
    })
    return ({ success: "Registro apagado com sucesso." })
  } catch (err) {
    console.log(err)
    return ({ error: "Não foi possível apagar o registro." })
  }
}