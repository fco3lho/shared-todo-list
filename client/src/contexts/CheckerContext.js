import { createContext, useState } from "react";

export const CheckerContext = createContext();

export const CheckerProvider = ({ children }) => {
  const [check, setCheck] = useState(false);

  const changeCheck = () => {
    setCheck(!check);
  };

  return (
    <CheckerContext.Provider value={{ check, changeCheck }}>
      {children}
    </CheckerContext.Provider>
  );
};
