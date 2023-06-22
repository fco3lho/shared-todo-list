import styles from "./CardsUser.module.css";

const CardsUser = (props) => {
  return <>
    <div className={styles.cardContainer}>
      <p>ID: {props.user_id}</p>
      <p>Username: {props.username}</p>
      <p>Nome: {props.name}</p>
      <p>Telefone: {props.phone}</p>
      <p>Email: {props.email}</p>
      <button>Convidar</button>
    </div>
  </>
};

export default CardsUser;
