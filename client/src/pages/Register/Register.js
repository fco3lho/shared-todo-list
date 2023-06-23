import styles from "./Register.module.css";

//Hooks
import { useState, useEffect } from "react";

//Deps
import Axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais.");
      return;
    } else if (password.length < 6) {
      setError("A senha precisa ter 6 ou mais caracteres.");
      return;
    }

    Axios.post("http://localhost:3001/register", {
      name: name,
      username: username,
      password: password,
      phone: phone,
      email: email,
    })
      .then((response) => {
        setMessage(response.data);

        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);

        setName("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        setPhone("");
      })
      .catch((error) => {
        setError(error.response.data);
      });
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

  const handleShowMessage = () => {
    setShowMessage(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.subtexto}>
      <h1>Cadastre-se para criar listas de tarefas</h1>
      <p>É rápido, prático e eficiente.</p>
      </div>
      <form onSubmit={handleSubmit}>
      <div className={styles.box}>
        <div className={styles.coluna}>
        <label className={styles.inputs}>
          <span>Nome:</span>
          <input
            type="text"
            name="name"
            placeholder="Insira aqui o seu nome"
            maxLength={32}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className={styles.inputs}>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            placeholder="Insira aqui o seu email"
            maxLength={64}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className={styles.inputs}>
          <span>Nome de usuário:</span>
          <input
            type="text"
            name="username"
            placeholder="Insira aqui o seu nome de usuário"
            maxLength={16}
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        </div>
        <div className={styles.coluna}>
        <label className={styles.inputs}>
          <span className={styles.nomeinput}>Telefone:</span>
          <input
            type="text"
            name="phone"
            placeholder="Insira aqui o seu número de telefone"
            maxLength={11}
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label className={styles.inputs}>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            placeholder="Insira aqui a sua senha"
            maxLength={128}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className={styles.inputs}>
          <span className={styles.nomeinput}>Confirmar senha:</span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirme sua senha aqui"
            maxLength={128}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        </div>
        <button className={styles.button} onClick={handleShowMessage}> Registrar </button>
        {showMessage && message && <p className={styles.success}>{message}</p>}
        {showMessage && error && <p className="error">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Register;
