import styles from "./CardsInvitedLists.module.css"

//Hooks
import { useEffect } from "react";
import { Link } from "react-router-dom";

//Axios
import Axios from "axios";

//Context
import { useContext } from "react";
import { CheckerContext } from "../../contexts/CheckerContext";
import { UserContext } from "../../contexts/UserContext";

const Cards = (props) => {
  //Caso vá fazer edição, trocar para useState()
  const editValues = {
    list_id: props.list_id,
    name: props.name,
    create_date: props.create_date,
    last_mod: props.last_mod,
    user_last_mod_id: props.user_last_mod_id,
    user_admin_id: props.user_admin_id,
  }

  const { check } = useContext(CheckerContext);
  const { whoIs } = useContext(UserContext);

  useEffect(() => {
    Axios.get(`http://localhost:3001/getChanges/${props.list_id}`).catch(
      (error) => console.log(error.response.data)
    );
  }, [check]);

  return (
    <>
      <div className={styles.cardContainer}>
        {/* <p>ID Lista: {props.list_id}</p> */}
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