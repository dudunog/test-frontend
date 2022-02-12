import { createContext, useState, ReactNode } from "react";

interface DrawerContextData {
  drawerIsOpen: boolean;
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

interface DrawerProviderProps {
  children: ReactNode;
}

export const DrawerContext = createContext({} as DrawerContextData);

export function DrawerProvider({
  children,
  ...rest
}: DrawerProviderProps) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDrawerIsOpen(open);
    };

  return (
    <DrawerContext.Provider value={{
      drawerIsOpen,
      toggleDrawer
    }}>
      {children}
    </DrawerContext.Provider>
  );
}