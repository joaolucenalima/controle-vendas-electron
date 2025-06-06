import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './AppRouter'
import { ModalProvider } from './contexts/ModalContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </StrictMode>,
)
