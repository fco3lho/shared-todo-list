import styles from "./CardsUser.module.css";

//Hooks
import { useParams } from "react-router-dom";

//Axios
import Axios from "axios";

const CardsUser = (props) => {
  const { id } = useParams();

  const handleSubmit = () => {
    Axios.post("http://localhost:3001/invite", {
      admin_username: localStorage.getItem("user"),
      username_invited: props.username,
      id_todo_list: id,
    })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.response.data));
  };

  return (
    <>
      <div className={styles.cardContainer}>
        <p>ID: {props.user_id}</p>
        <p>Username: {props.username}</p>
        <p>Nome: {props.name}</p>
        <p>Telefone: {props.phone}</p>
        <p>Email: {props.email}</p>
        <button onClick={handleSubmit}>Enviar convite</button>
      </div>
    </>
  );
};

export default CardsUser;
