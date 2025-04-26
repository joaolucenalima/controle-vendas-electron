import Materials from "../models/materials"

export class MaterialsController {
  public async getMaterials() {
    return await Materials.findAll()
  }
  
  public async setMaterials(props: any) {
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
  
  public async updateMaterials(props: any) {
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
  
  public async deleteMaterials(id: string | number) {
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
}