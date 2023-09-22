import DeletePopUp from "./DeletePopUp";

interface TableProps {
  title: string,
  elementList: {
    id: string,
    name: string,
    priceInCents: number
  }[]
}

export default function Table(props: TableProps) {
  return (
    <table>

      <thead>
        <tr>
          <th>Nome</th>
          <th>Preço</th>
          <th>Editar</th>
          <th>Excluir</th>
        </tr>
      </thead>

      <tbody>
        {props.elementList.map((element) => {
          return (
            <tr key={element.id}>
              <td>{element.name}</td>
              <td>R$ {element.priceInCents / 100}</td>
              <td>
                edit
              </td>
              <td>
                <DeletePopUp id={element.id} register={props.title} />
              </td>
            </tr>
          )
        })}
      </tbody>

    </table>
  )
}