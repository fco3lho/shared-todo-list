import styles from "./Invite.module.css";

//Components
import Cards from "../../../components/CardsUser/CardsUser";

//Hooks
import { useState, useEffect } from "react";

//Axios
import Axios from "axios";

const Invite = () => {
  const [users, setUsers] = useState();

  const username = localStorage.getItem("user");

  useEffect(() => {
    Axios.get(`http://localhost:3001/invite/users/${username}`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error.response.data));
  }, []);

  return (
    <>
      <div>
        {typeof users !== "undefined" &&
          users.map((value) => {
            return (
              <Cards
                key={value.user_id}
                listCard={users}
                setListCard={setUsers}
                user_id={value.user_id}
                name={value.name}
                username={value.username}
                phone={value.phone}
                email={value.email}
              />
            );
          })}
      </div>
    </>
  );
};

export default Invite;
