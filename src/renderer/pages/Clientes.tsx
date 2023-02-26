import { FormEvent, useState } from "react";

import Header from "../components/Header";
import { registerClient } from '../../../database/cliente'

export default function Clientes() {

  const [name, setName] = useState('');
  console.log(name);

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
            <li>Cliente 1</li>
            <li>Cliente 2</li>
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

      {name ? <span>{name}</span> : null}
    </>
  )
}