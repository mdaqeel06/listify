import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [currentInput, setCurrentInput] = useState(1);
  return (
    <AppContext.Provider value={{ currentInput, setCurrentInput }}>
      {children}
    </AppContext.Provider>
  );
};
