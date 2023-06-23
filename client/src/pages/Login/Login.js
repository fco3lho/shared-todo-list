import styles from "./Login.module.css";

//Hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Context
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import Axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const { Online } = useContext(UserContext);

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    await Axios.post("http://localhost:3001/login", {
      username: username.toLocaleLowerCase(),
      password: password,
    })
      .then((response) => {
        setMessage(response.data[0]);
        Online(response.data[1]);
        localStorage.setItem("user", response.data[1]);
        localStorage.setItem("logged", true)

        setTimeout(() => {
          Navigate("/");
        }, 1000);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  const handleShowMessage = () => {
    setShowMessage(true);
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 1500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showMessage]);

  return (
    <div className={styles.container}>
      <div className={styles.subtexto}>
      <h1>Entrar</h1>
      <p>Faça o login para poder utilizar a To-do List.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.box}>
        <label className={styles.inputs}>
          <span className={styles.nomeinput}>Nome de usuário:</span>
          <input
            type="text"
            name="username"
            placeholder="Insira o seu nome de usuário"
            maxLength={16}
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className={styles.inputs}>
          <span className={styles.nomeinput}>Senha:</span>
          <input
            type="password"
            name="username"
            placeholder="Insira sua senha"
            maxLength={128}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className={styles.button} onClick={handleShowMessage}> Entrar </button>
        </div>
        {showMessage && message && <p>{message}</p>}
        {showMessage && error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
