import styles from "./CardsInvite.module.css";

const CardsInvite = (props) => {
  return <div className={styles.cardContainer}>
    <p>{props.username} lhe convidou para acessar a lista de tarefas de ID: {props.id_todo_list}</p>
    <button>Aceitar</button>
    <button>Recusar</button>
  </div>;
};

export default CardsInvite;
