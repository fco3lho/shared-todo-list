import styles from "./CardsInvitedLists.module.css"

//Hooks
import { useEffect } from "react";
import { Link } from "react-router-dom";

//Axios
import Axios from "axios";

//Context
import { useContext } from "react";
import { CheckerContext } from "../../contexts/CheckerContext";

import { format } from 'date-fns';

const Cards = (props) => {
  const { check } = useContext(CheckerContext);

  useEffect(() => {
    Axios.get(`http://localhost:3001/getChanges/${props.list_id}`).catch(
      (error) => console.log(error.response.data)
    );
  }, [check]);

  return (
    <>
      <div className={styles.cardContainer}>
        {/* <p>ID Lista: {props.list_id}</p> */}
        <p className={styles.nome}>Nome: {props.name}</p>
        <p>Criado em: {format(new Date(props.create_date), 'dd/MM/yyyy')}</p>
        <p>Modificado em: {format(new Date(props.last_mod), 'dd/MM/yyyy')}</p>
        <p>Modificado por: {props.user_last_mod_id}</p>
        <p>Usuário adm: {props.user_admin_id}</p>
        <div className={styles.funcionalidades}>
          <Link className={styles.outrasfunc} to={`/${props.list_id}/tasks`}>Ver tarefas 🔎</Link>
        </div>
      </div>
    </>
  );
};

export default Cards;