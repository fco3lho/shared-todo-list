import styles from "./CardsList.module.css";

//Hooks
import { useState } from "react";
import { Link } from "react-router-dom";

//Axios
import Axios from "axios";

const Cards = (props) => {
  const [editValues, setEditValues] = useState({
    list_id: props.list_id,
    name: props.name,
    create_date: props.create_date,
    last_mod: props.last_mod,
    user_last_mod_id: props.user_last_mod_id,
    user_admin_id: props.user_admin_id,
  });

  const handleDelete = () => {
    Axios.delete(`http://localhost:3001/delete/${props.list_id}`)
      .then((response) => {
        console.log(response.data);
        props.setListCard(
          props.listCard.filter((value) => {
            return value.list_id !== editValues.list_id;
          })
        );
      })
      .catch((error) => console.log(error));
  };

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
        <Link to={"/"} onClick={handleDelete}>
          Excluir
        </Link>
      </div>
    </>
  );
};

export default Cards;
