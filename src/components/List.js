import { useEffect, useRef, useContext } from "react";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import EditableInput from "./EditableInput";
import Content from "./Content";
import { AppContext } from "../context/appContext";
import "./../App.css";

const List = (props) => {
  const { listData, lists, setLists } = props;

  const updateRef = useRef({ listData, lists });

  useEffect(() => {
    updateRef.current = { listData, lists };
  }, [lists, listData]);

  const { setCurrentInput } = useContext(AppContext);

  const handleDrop = (position, existingCard, addCard) => {
    const listHistory = updateRef.current.lists.map((list) => {
      // insert
      let updatedCards = list.cards;
      if (list.id === existingCard.listId) {
        const index = updatedCards.findIndex(
          (card) => card.id === existingCard?.cardInfo?.id
        );

        addCard.cardInfo.id = uuidv4();
        if (position === "top") {
          updatedCards.splice(0, 0, { ...addCard.cardInfo, id: uuidv4() });
        } else {
          updatedCards.splice(index + 1, 0, {
            ...addCard.cardInfo,
            id: uuidv4(),
          });
        }
      }

      // remove
      if (list.id === addCard.listId) {
        updatedCards = updatedCards.filter(
          (card) => card.id !== addCard.cardInfo.id
        );
      }
      return { ...list, cards: [...updatedCards] };
    });
    localStorage.setItem("listifyTasks", JSON.stringify(listHistory));
    setLists(listHistory);
  };

  const [dragging, drag] = useDrop(() => ({
    accept: "listItem",
    canDrop: () => true,
    drop: (item) => {
      handleDrop("top", { listId: listData.id }, item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addCard = () => {
    const newUUID = uuidv4();
    setLists((prevLists) => {
      return prevLists.map((list) => {
        if (list.id === listData.id) {
          return {
            ...list,
            cards: [
              ...list.cards,
              { id: newUUID, title: "", time: new Date() },
            ],
          };
        }
        return list;
      });
    });
    setCurrentInput(newUUID);
  };

  const deleteList = () => {
    setLists((prevLists) => {
      const updatedLists = prevLists.filter((list) => list.id !== listData.id);
      localStorage.setItem("listifyTasks", JSON.stringify(updatedLists));
      return updatedLists;
    });
  };

  const handleChange = (input) => {
    setLists((prevLists) => {
      const updatedLists = prevLists.map((list) => {
        if (list.id === listData.id) {
          return { ...list, listName: input };
        }
        return list;
      });
      localStorage.setItem("listifyTasks", JSON.stringify(updatedLists));
      return updatedLists;
    });
  };

  return (
    <div className="list">
      <div className="list-header">
        <div className="list-name">
          <EditableInput
            id={listData.id}
            text={listData.listName}
            handleChange={handleChange}
            listName={true}
          />
        </div>
        <i className="fa-solid fa-trash" onClick={deleteList}></i>
      </div>
      <div className="cards-container no-scrollbar">
        <div ref={drag} className="drag"></div>
        {dragging.isOver && <div className="drag-highlight"></div>}
        {listData.cards.map((card) => (
          <>
            <Content
              listId={listData.id}
              cardInfo={card}
              handleDrop={handleDrop}
              setLists={setLists}
            />
          </>
        ))}
      </div>
      <div className="add-button" onClick={addCard}>
        + Create a new card in this list
      </div>
    </div>
  );
};

export default List;
