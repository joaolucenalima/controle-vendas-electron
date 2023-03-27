import { createContext, ReactNode, useState } from "react";

interface ResponseContextData {
  response: string | undefined,
  setResponseValue: (message: string | undefined) => void
}

interface ResponseProviderProps {
  children: ReactNode,
}

export const ResponseContext = createContext({} as ResponseContextData);

export function ResponseProvider({ children }: ResponseProviderProps) {

  const [response, setResponse] = useState<string | undefined>(undefined)

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