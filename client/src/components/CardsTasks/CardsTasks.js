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
  const [completed, setCompleted] = useState(props.completed);

  const [verifyEdit, setVerifyEdit] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();

    Axios.put("http://localhost:3001/task/myTasks/editTask", {
      task_id: task_id,
      taskName: taskName,
      description: description,
      expire_date: expire_date,
    })
      .then((response) => {
        props.setListCard(
          props.listCard.map((value) => {
            return value.task_id === task_id
              ? {
                  task_id: task_id,
                  taskName: taskName,
                  description: description,
                  expire_date: expire_date,
                }
              : value;
           })
         );
      })
      .catch((error) => console.log(error.response.data));

    setVerifyEdit(false);
  };

  const handleCompletTask = (e) => {
    e.preventDefault();

    Axios.put(`http://localhost:3001/task/myTasks/completTask/${task_id}`)
      .then((response) => {
        console.log(response.data);
        setCompleted(response.data);
      })
      .catch((error) => console.log(error.response.data));
  };

  const handleIncompletTask = (e) => {
    e.preventDefault();

    Axios.put(`http://localhost:3001/task/myTasks/incompletTask/${task_id}`)
      .then((response) => {
        console.log(response.data);
        setCompleted(response.data);
      })
      .catch((error) => console.log(error.response.data));
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
          {props.completed === 1 && (
            <input
              type="checkbox"
              id="completed"
              name="completed"
              defaultChecked={completed}
              onClick={handleIncompletTask}
              checked
            />
          )}
          {props.completed === 0 && (
            <input
              type="checkbox"
              id="completed"
              name="completed"
              defaultChecked={completed}
              onClick={handleCompletTask}
            />
          )}
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
            defaultValue={props.taskName}
            onChange={(e) => setTaskName(e.target.value)}
            name="name"
            required
          />
          <input
            type="text"
            id="description"
            defaultValue={props.description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            required
          />
          <input
            type="datetime-local"
            id="expireDate"
            defaultValue={props.expire_date}
            onChange={(e) => setExpireDate(e.target.value)}
            name="expire_date"
            required
          />
          <button>Editar</button>
        </form>
      )}
    </>
  );
};

export default CardsTasks;
