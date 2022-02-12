import { createContext, useState, ReactNode } from "react";

interface ModalContextData {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalContext = createContext({} as ModalContextData);

export function ModalProvider({
  children,
  ...rest
}: ModalProviderProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ModalContext.Provider value={{
      open,
      handleOpen,
      handleClose
    }}>
      {children}
    </ModalContext.Provider>
  );
}
