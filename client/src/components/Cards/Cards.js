import styles from "./Cards.module.css";

//Axios
import Axios from "axios";

//Hooks
import { useState } from "react";

const Cards = (props) => {
  return <>
    <div className={styles.cardContainer}>
      <p>ID Lista: {props.list_id}</p>
      <p>Nome: {props.name}</p>
      <p>Data de criação: {props.create_date}</p>
      <p>Data da última modificação: {props.last_mod}</p>
      <p>Usuário que fez última modificação: {props.user_last_mod_id}</p>
      <p>Usuário administrador: {props.user_admin_id}</p>
    </div>
  </>;
};

export default Cards;
