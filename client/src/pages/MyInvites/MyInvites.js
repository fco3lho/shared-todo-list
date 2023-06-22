import styles from "./MyInvites.module.css";

//Hooks
import { useState, useEffect } from "react";

//Components
import Cards from "../../components/CardsInvite/CardsInvite";

//Axios
import Axios from "axios";

const MyInvites = () => {
  const [myInvites, setMyInvites] = useState();

  const username = localStorage.getItem("user");

  useEffect(() => {
    Axios.get(`http://localhost:3001/invite/myInvites/${username}`)
      .then((response) => setMyInvites(response.data))
      .catch((error) => console.log(error.response.data));
  }, [, setMyInvites]);

  return (
    <div>
      {typeof myInvites !== "undefined" ? (
        myInvites.map((value) => {
          return (
            <Cards
              key={value.id_todo_list}
              listCard={myInvites}
              setListCard={setMyInvites}
              username={value.username}
              id_todo_list={value.id_todo_list}
            />
          );
        })
      ) : (
        <div>Você não possui convites</div>
      )}
    </div>
  );
};

export default MyInvites;
