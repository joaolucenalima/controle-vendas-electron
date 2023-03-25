import { createContext, ReactNode, useState } from "react";

interface ResponseContextData {
  response: string | undefined,
  setResponseValue: (message: string | undefined) => void
}

interface ResponseProviderProps {
  children: ReactNode,
  response: string
}

export const ResponseContext = createContext({} as ResponseContextData);

export function ResponseProvider({ children, ...rest }: ResponseProviderProps) {

  const [response, setResponse] = useState<string | undefined>(rest.response ?? undefined)

  function setResponseValue(message: string | undefined) {
    setResponse(message)
  }

  return (
    <ResponseContext.Provider
      value={{
        response,
        setResponseValue
      }}
    >
      {children}
    </ResponseContext.Provider>
  );
}