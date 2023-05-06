import { useEffect, useState } from "react"

import Login from "../components/Login"
import CreatePass from "../components/CreatePass"

import { countPassword } from "../../database/password"

interface LoginPageProps {
  setIsLogged: () => void
}

export default function LoginPage({ setIsLogged }: LoginPageProps) {

  const [havePassword, setHavePassword] = useState(0)

  useEffect(() => {
    countPassword().then(number => {
      setHavePassword(number)
    })
  }, [])

  if (havePassword > 0) {
    return (
      <Login setIsLogged={setIsLogged} />
    )
  } else {
    return (
      <CreatePass setIsLogged={setIsLogged} />
    )
  }
}