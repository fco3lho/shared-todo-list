import styles from "./CardsList.module.css";

//Hooks
import { useEffect } from "react";
import { Link } from "react-router-dom";

//Axios
import Axios from "axios";

//Context
import { useContext } from "react";
import { CheckerContext } from "../../contexts/CheckerContext";
import { UserContext } from "../../contexts/UserContext";

import { format } from 'date-fns';

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

  const handleDelete = () => {
    Axios.delete(`http://localhost:3001/delete/${props.list_id}/${whoIs}`)
      .then((response) => {
        console.log(response.data);
        props.setListCard(
          props.listCard.filter((value) => {
            return value.list_id !== editValues.list_id;
          })
        );
      })
      .catch((error) => console.log(error.response.data));
  };

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
        <p>Data de criação: {format(new Date(props.create_date), 'dd/MM/yyyy')}</p>
        <p>Data da última modificação: {format(new Date(props.last_mod), 'dd/MM/yyyy')}</p>
        <p>Usuário que fez última modificação: {props.user_last_mod_id}</p>
        <p>Usuário administrador: {props.user_admin_id}</p>
        <div className={styles.funcionalidades}>
          <ul>
            <li><Link className={styles.outrasfunc} to={`/${props.list_id}/tasks`}>Ver tarefas 🔎</Link></li>
            <li><Link className={styles.outrasfunc} to={`/${props.list_id}/invite`}>Convidar usuários ✉️</Link></li>
            <li><Link className={styles.excluir} to={"/"} onClick={handleDelete}>
              Excluir 🗑️
            </Link></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Cards;
