import styles from "./Tasks.module.css";

//Hooks
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//Components
import Cards from "../../../components/CardsTasks/CardsTasks";

//Axios
import Axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState();

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const { id } = useParams();
  const [today, setToday] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    console.log(taskName, description, expireDate, id);

    Axios.post("http://localhost:3001/task/create", {
      taskName: taskName,
      description: description,
      expireDate: expireDate,
      list_id: id,
    })
      .then((response) => setMessage(response.data))
      .catch((error) => setError(error.response.data));
  };

  const handleChangeDate = (e) => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    setToday(`${year}-${month}-${day}T00:00`);
    setExpireDate(e.target.value);
  };

  const handleShowMessage = () => {
    setShowMessage(true);
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 1500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showMessage]);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome:</span>
            <input
              type="text"
              name="taskName"
              maxLength={32}
              required
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </label>
          <label>
            <span>Descrição:</span>
            <input
              type="text"
              name="description"
              maxLength={128}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            <span>Data de expiração:</span>
            <input
              type="datetime-local"
              name="expireDate"
              min={today}
              required
              value={expireDate}
              onChange={handleChangeDate}
            />
          </label>
          <button onClick={handleShowMessage}>Criar</button>
        </form>
        {showMessage && message && <p className={styles.success}>{message}</p>}
        {showMessage && error && <p className="error">{error}</p>}
      </div>

      <div>
        {typeof tasks !== "undefined" &&
          tasks.map((value) => {
            return (
              <Cards
                key={value.task_id}
                listCard={tasks}
                setListCard={setTasks}
                task_id={value.task_id}
                taskName={value.taskName}
                description={value.description}
                register_date={value.register_date}
                expire_date={value.expire_date}
                completed={value.completed}
              />
            );
          })}
      </div>
    </>
  );
};

export default Tasks;
