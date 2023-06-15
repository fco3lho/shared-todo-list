import { NavLink } from "react-router-dom";

//Contexts
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const Navbar = () => {
  const { isLoggedIn, whoIs, Offline } = useContext(UserContext);

  return (
    <div>
      <ul>
        {isLoggedIn && <li>Bem vindo, {whoIs}</li>}

        {isLoggedIn && (
          <li>
            <NavLink to="/">Listas de tarefas</NavLink>
          </li>
        )}

        {!isLoggedIn && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}

        {!isLoggedIn && (
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        )}

        <li>
          <NavLink to="/about">About</NavLink>
        </li>

        {isLoggedIn && (
          <li>
            <NavLink to="/login" onClick={Offline}>
              Sair
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
