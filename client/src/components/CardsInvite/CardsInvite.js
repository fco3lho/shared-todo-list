import styles from "./CardsInvite.module.css";

//Axios
import Axios from "axios";

const CardsInvite = (props) => {
  const username = localStorage.getItem("user");

  const handleAccept = () => {
    Axios.post(
      `http://localhost:3001/invite/myInvites/${username}/${props.id_todo_list}/accept`
    )
      .then((response) => alert(response.data))
      .catch((error) => console.log(error.response.data));
  };

  const handleRefuse = () => {
    Axios.post(
      `http://localhost:3001/invite/myInvites/${username}/${props.id_todo_list}/refuse`
    )
      .then((response) => alert(response.data))
      .catch((error) => console.log(error.response.data));
  };

  return (
    <div className={styles.cardContainer}>
      <p>
        {props.username} lhe convidou para acessar a lista de tarefas de ID:{" "}
        {props.id_todo_list}
      </p>
      <button className={styles.buttonA} onClick={handleAccept}>Aceitar</button>
      <button className={styles.buttonR} onClick={handleRefuse}>Recusar</button>
    </div>
  );
};

export default CardsInvite;
