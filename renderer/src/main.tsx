import { ModalProvider } from "@contexts/modal-provider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeInit } from "../.flowbite-react/init";
import App from "./AppRouter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalProvider>
      <ThemeInit />
      <App />
    </ModalProvider>
  </StrictMode>,
);
