import { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Boards from "./Boards";
import List from "./List";
import { AppContext } from "../context/appContext";
import { LISTIFY_TASKS } from "../tasks";
import "./../App.css";

const Layout = () => {
  const { setCurrentInput } = useContext(AppContext);

  const [lists, setLists] = useState([]);

  useEffect(() => {
    const localStorageTasks = localStorage.getItem("listifyTasks");
    if (localStorageTasks) {
      setLists(JSON.parse(localStorageTasks));
    } else {
      setLists(LISTIFY_TASKS);
    }
  }, []);

  const addList = () => {
    const newUUID = uuidv4();
    setLists((prevLists) => {
      return [...prevLists, { id: newUUID, listName: "", cards: [] }];
    });
    setCurrentInput(newUUID);
  };

  return (
    <div className="container">
      <header>
        <i className="fa-solid fa-bars-staggered"></i> Listify
      </header>
      <main>
        <Boards setLists={setLists} />
        <div className="kanban no-scrollbar">
          {lists.map((list) => (
            <List listData={list} lists={lists} setLists={setLists} />
          ))}
          <div className="list" onClick={addList}>
            <div className="add-button">+ Create a new list</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
