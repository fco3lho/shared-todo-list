import styles from "./CardsTasks.module.css";

const CardsTasks = (props) => {
  return <>
    <div>
      <p>Tarefa: {props.taskName}</p>
      <p>Descrição: {props.description}</p>
      <p>Data de criação: {props.register_date}</p>
      <p>Data de expiração: {props.expire_date}</p>
      <p>Feita: {props.completed}</p>
    </div>
  </>;
};

export default CardsTasks;
