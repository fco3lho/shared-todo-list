import { createContext, useEffect, useState } from "react";

import Axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [whoIs, setWhoIs] = useState(null);

  const setUser = (user) => {
    setWhoIs(user);
  };

  const Online = (user) => {
    setIsLoggedIn(true);
    setUser(user);
  };

  const Offline = () => {
    setIsLoggedIn(false);
    setUser("");
    localStorage.removeItem("user");

    Axios.post("http://localhost:3001/logout", {
      whoIs: whoIs,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const userLocalStorage = localStorage.getItem("user");
    if (userLocalStorage) {
      Online(userLocalStorage);
    }
  }, [children]);

  return (
    <UserContext.Provider
      value={{ isLoggedIn, whoIs, setUser, Online, Offline }}
    >
      {children}
    </UserContext.Provider>
  );
};
