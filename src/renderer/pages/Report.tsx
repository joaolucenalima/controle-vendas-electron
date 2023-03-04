import { FormEvent, useEffect, useState } from "react";

import Header from "../components/Header";
import { listClient, registerClient } from '../../database/client'

type clientType = Awaited<ReturnType<typeof listClient>>

export default function Report() {

  const [name, setName] = useState('');
  const [clientes, setClientes] = useState<clientType>([])


  useEffect(() => {
    listClient().then((clientes) => {
      setClientes(clientes)
    })
  }, [])

  function handleSubmit(event: FormEvent) {

    event.preventDefault();

    registerClient(name);

    setName('')
  }

  return (
    <>
      <Header />

      <div className="client-container">
        <h2>Clientes cadastrados</h2>
        <div className="client-list">
          <ul>
            {clientes?.length ? clientes.map((cliente, index) => {
              return <li key={index}>{cliente.dataValues.name}</li>
            }) : <li>Nenhum cliente foi cadastrado</li>}
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome do Cliente: </label>
        <input
          type="text"
          name="name"
          className="inputs"
          onChange={event => setName(event.target.value)}
          value={name}
        />
        <input type="submit" value="Cadastrar cliente" />
      </form>
    </>
  )
}