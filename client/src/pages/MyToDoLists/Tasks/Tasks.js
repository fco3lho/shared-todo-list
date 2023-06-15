import styles from "./Tasks.module.css";

//Hooks
import { useState } from "react";

const Tasks = () => {
  const [description, setDescription] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [today, setToday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(description, expireDate);
  };

  const handleChangeDate = (e) => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    setToday(`${year}-${month}-${day}T00:00`);
    setExpireDate(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button>Criar</button>
      </form>
    </div>
  );
};

export default Tasks;
