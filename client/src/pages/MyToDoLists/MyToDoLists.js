import styles from "./MyToDoLists.module.css";

//Axios
import Axios from "axios";

//Hooks
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

//Components
import Cards from "../../components/CardsList/CardsList";
import InvitedCards from "../../components/CardsInvitedLists/CardsInvitedLists";

//Context
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const MyToDoLists = () => {
  const [name, setName] = useState("");
  const [lists, setLists] = useState();
  const [invitedLists, setInvitedLists] = useState();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const { whoIs, isLoggedIn } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    Axios.post("http://localhost:3001/create", {
      name: name,
      username_admin: whoIs,
    })
      .then((response) => setMessage(response.data))
      .catch((error) => setError(error.response.data));
  };

  const handleShowMessage = () => {
    setShowMessage(true);
  };

  useEffect(() => {
    if (!isLoggedIn && localStorage.getItem("logged")) {
      Axios.get(`http://localhost:3001/${localStorage.getItem("user")}`)
        .then((response) => setLists(response.data))
        .catch((error) => console.log(error.response.data));

      Axios.get(
        `http://localhost:3001/invite/invitedLists/${localStorage.getItem(
          "user"
        )}`
      )
        .then((response) => setInvitedLists(response.data))
        .catch((error) => console.log(error.response.data));
    } else if (whoIs) {
      Axios.get(`http://localhost:3001/${whoIs}`)
        .then((response) => setLists(response.data))
        .catch((error) => console.log(error.response.data));

      Axios.get(`http://localhost:3001/invite/invitedLists/${whoIs}`)
        .then((response) => setInvitedLists(response.data))
        .catch((error) => console.log(error.response.data));
    }
  }, [showMessage]);

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
    <>
      {!localStorage.getItem("logged") && <Navigate to="/login" />}
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
        <span className={styles.nomeinput}>Criar nova lista de atividades:</span>
          <input className={styles.inputs}
          required
            type="text"
            placeholder="nome ..."
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button className={styles.button} onClick={handleShowMessage}>Criar</button>
        </form>
        {showMessage && message && <p className={styles.success}>{message}</p>}
        {showMessage && error && <p className="error">{error}</p>}
      </div>

      <h1 className={styles.title}>Minhas listas de tarefas 📃</h1>
      <div className={styles.mytodolists}>
        {typeof lists !== "undefined" &&
          lists.map((value) => {
            return (
              <Cards
                key={value.list_id}
                listCard={lists}
                setListCard={setLists}
                list_id={value.list_id}
                name={value.name}
                create_date={value.create_date}
                last_mod={value.last_mod}
                user_last_mod_id={value.user_last_mod_id}
                user_admin_id={value.user_admin_id}
              />
            );
          })}
      </div>

      <h1 className={styles.title}>Listas de tarefas compartilhadas 👥</h1>
      <div className={styles.mytodolists}>
        {typeof invitedLists !== "undefined" &&
          invitedLists.map((value) => {
            return (
              <InvitedCards className={styles.informacoes}
                key={value.list_id}
                listCard={invitedLists}
                setListCard={setInvitedLists}
                list_id={value.list_id}
                name={value.name}
                create_date={value.create_date}
                last_mod={value.last_mod}
                user_last_mod_id={value.user_last_mod_id}
                user_admin_id={value.user_admin_id}
              />
            );
          })}
      </div>
    </>
  );
};

export default MyToDoLists;
