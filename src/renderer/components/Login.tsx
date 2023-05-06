import { useState, FormEvent, useContext } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { FcLock } from "react-icons/fc"
import bcrypt from 'bcrypt'

import { getPassword } from '../../database/password'
import { NotificationContext } from '../contexts/NotificationContext';

interface LoginProps {
  setIsLogged: () => void
}

export default function Login({ setIsLogged }: LoginProps) {

  const { showToast } = useContext(NotificationContext);

  const [pass, setPass] = useState("")
  const [inputType, setInputType] = useState("password")

  async function comparePassword(event: FormEvent) {
    event.preventDefault()

    const DBpass = await getPassword()

    const hash = DBpass?.dataValues.pass

    if (hash != null) {

      bcrypt.compare(pass, String(hash), function (err, res) {
        if (res == true) {
          setIsLogged()
        } else {
          showToast({ error: "Senha incorreta!" })
        }
      })
    }
  }

  return (
    <div className="login-screen">

      <FcLock style={{ fontSize: "6rem" }} />

      <form onSubmit={comparePassword}>

        <label htmlFor="pass">Digite sua senha</label>

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