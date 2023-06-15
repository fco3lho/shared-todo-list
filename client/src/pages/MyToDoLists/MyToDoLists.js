import styles from "./MyToDoLists.module.css";

//Axios
import Axios from "axios";

//Hooks
import { useState, useEffect } from "react";

//Components
import Cards from "../../components/CardsList/CardsList";

//Context
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const MyToDoLists = () => {
  const [name, setName] = useState("");
  const [lists, setLists] = useState();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const { whoIs } = useContext(UserContext);

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
    if (whoIs) {
      Axios.get(`http://localhost:3001/${whoIs}`)
        .then((response) => setLists(response.data))
        .catch((error) => console.log(error.response.data));
    }
  }, [whoIs]);

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
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite o nome da lista de tarefas que deseja criar."
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button onClick={handleShowMessage}>Criar</button>
        </form>
        {showMessage && message && <p className={styles.success}>{message}</p>}
        {showMessage && error && <p className="error">{error}</p>}
      </div>

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
    </>
  );
};

export default MyToDoLists;
