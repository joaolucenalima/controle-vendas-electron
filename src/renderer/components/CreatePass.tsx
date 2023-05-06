import { useState, FormEvent, useContext } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcLock } from "react-icons/fc"
import bcrypt from 'bcrypt'

import { NotificationContext } from '../contexts/NotificationContext';
import { setPassword } from '../../database/password';

interface CreatePassProps {
  setIsLogged: () => void
}

export default function CreatePass({ setIsLogged }: CreatePassProps) {

  const { showToast } = useContext(NotificationContext);

  const [pass, setPass] = useState("")
  const [inputType, setInputType] = useState("password")

  function createPassword(event: FormEvent) {

    event.preventDefault()

    bcrypt.hash(pass, 10, async function (err, hash) {
      await setPassword(hash)
      setIsLogged()
      showToast({ success: "Senha criada com sucesso!" })
    })

  }

  return (
    <div className="login-screen">

      <FcLock style={{ fontSize: "6rem" }} />

      <form onSubmit={createPassword}>

        <label htmlFor="pass">Registre sua senha</label>

        <div style={{ position: 'relative' }}>
          <input
            type={inputType}
            name="pass"
            onChange={e => setPass(e.target.value)}
          />

          {inputType === "password" ? (
            <FaEyeSlash
              onClick={() => setInputType('text')}
              className='icone-olho'
            />
          ) : (
            <FaEye
              onClick={() => setInputType('password')}
              className='icone-olho'
            />
          )}
        </div>

      </form>

    </div>
  )
}