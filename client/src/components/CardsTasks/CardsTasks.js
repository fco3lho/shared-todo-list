import styles from "./CardsTasks.module.css";

//Hooks
import { useState } from "react";

//Axios
import Axios from "axios";

const CardsTasks = (props) => {
  const [task_id, setTaskId] = useState(props.task_id);
  const [taskName, setTaskName] = useState(props.taskName);
  const [description, setDescription] = useState(props.description);
  const [expire_date, setExpireDate] = useState(props.expire_date);
  const [isChecked, setIsChecked] = useState(props.completed);

  const [verifyEdit, setVerifyEdit] = useState(false);

  const handleCheckboxChange = () => {
    if (isChecked === 0) {
      setIsChecked(1)
    } else if (isChecked === 1){
      setIsChecked(0)
    }

    Axios.put("http://localhost:3001/task/myTasks/checkbox", {
      task_id: task_id,
      completed: isChecked,
    })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.response.data));
  };

  const handleEdit = (e) => {
    e.preventDefault();

    console.log("handleEdit");
  };

  return (
    <>
      <div className={styles.cardContainer}>
        <p>ID: {props.task_id}</p>
        <p>Tarefa: {props.taskName}</p>
        <p>Descrição: {props.description}</p>
        <p>Data de criação: {props.register_date}</p>
        <p>Data de expiração: {props.expire_date}</p>
        <div>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="completed">Feita</label>
        </div>
        <button onClick={() => setVerifyEdit(true)}>Editar</button>
      </div>

      {verifyEdit && (
        <form onSubmit={handleEdit}>
          <h2>Editando tarefa: {props.taskName}</h2>
          <input
            type="text"
            id="name"
            label="Nome da tarefa"
            defaultValue={props.taskName}
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
            name="name"
            required
          />
          <input
            type="text"
            id="description"
            label="Descrição"
            defaultValue={props.description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            name="description"
            required
          />
          <input
            type="datetime-local"
            id="expireDate"
            label="Data de expiração"
            defaultValue={props.expire_date}
            onChange={(e) => {
              setExpireDate(e.target.value);
            }}
            name="expire_date"
            required
          />
          <button>Editar</button>
          <a href="#" onClick={() => setVerifyEdit(false)}>
            Cancelar
          </a>
        </form>
      )}
    </>
  );
};

export default CardsTasks;
