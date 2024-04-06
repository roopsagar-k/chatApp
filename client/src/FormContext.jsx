import { createContext, useState } from "react";

export const ModalContext = createContext({});

export function FormContextProvider({ children }) {
    const [showFormModal, setShowFormModal] = useState(false);
  return (
    <ModalContext.Provider value={{ showFormModal, setShowFormModal }}>
      {children}
    </ModalContext.Provider>
  )
}