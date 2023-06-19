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

  const handleCompletTask = (e) => {
    e.preventDefault();

    Axios.put(`http://localhost:3001/task/myTasks/completTask/${task_id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.response.data));
  };

  const handleIncompletTask = (e) => {
    e.preventDefault();

    Axios.put(`http://localhost:3001/task/myTasks/incompletTask/${task_id}`)
      .then((response) => console.log(response.data))
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
              onChange={(e) => setCompleted(e.target.value)}
              onClick={handleIncompletTask}
              checked
            />
          )}
          {props.completed === 0 && (
            <input
              type="checkbox"
              id="completed"
              name="completed"
              onChange={(e) => setCompleted(e.target.value)}
              onClick={handleCompletTask}
            />
          )}
          <label htmlFor="completed">Feita</label>
        </div>
      </div>
    </>
  );
};

export default CardsTasks;
