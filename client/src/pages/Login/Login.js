import styles from "./Login.module.css";

//Hooks
import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom'

import Axios from "axios";

const Login = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const Navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setMessage('');

    await Axios.post('http://localhost:3001/login', {
      username: username.toLocaleLowerCase(),
      password: password,
    })
      .then((response) => {
        setMessage(response.data[0]);
        localStorage.setItem("user", response.data[1]);
        setTimeout(() =>{
          Navigate('/');
        }, 1000);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  useEffect(() => {
    const userLocalStorage = localStorage.getItem("user");
    if (userLocalStorage) {
      setTimeout(() => {
        Navigate("/");
      }, 50);
    }
  }, []);

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
  }
  
  return <div>
  <h1>Entrar</h1>
  <p>Faça o login para poder utilizar a To-do List. </p>
  <form onSubmit={handleSubmit}>
    <label>
        <span>Nome de usuário:</span>
        <input
          type='text'
          name='username'
          placeholder='Insira o seu nome de usuário'
          maxLength={16}
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
    </label>
    <label>
      <span>Senha:</span>
      <input 
        type='text'
        name='username'
        placeholder='Insira sua senha'
        maxLength={128}
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </label>

    <button onClick={handleShowMessage}> Entrar </button>
    {showMessage && message && <p>{message}</p>}
    {showMessage && error && <p>{error}</p>}
  </form>
  </div>;
};

export default Login;
