import styles from "./CardsList.module.css";

//Hooks
import { Link } from "react-router-dom";

const Cards = (props) => {

  return (
    <>
      <div className={styles.cardContainer}>
        <p>ID Lista: {props.list_id}</p>
        <p>Nome: {props.name}</p>
        <p>Data de criação: {props.create_date}</p>
        <p>Data da última modificação: {props.last_mod}</p>
        <p>Usuário que fez última modificação: {props.user_last_mod_id}</p>
        <p>Usuário administrador: {props.user_admin_id}</p>
        <Link to={`/${props.list_id}/tasks`}>Ver tarefas</Link>
      </div>
    </>
  );
};

export default Cards;