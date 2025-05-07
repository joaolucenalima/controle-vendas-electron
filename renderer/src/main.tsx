import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './AppRouter'
import { Modal } from './components/modal'
import { ModalProvider } from './contexts/ModalContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalProvider>
      <Modal />
      <App />
    </ModalProvider>
  </StrictMode>,
)
