import { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import moment from "moment";
import EditableInput from "./EditableInput";
import "./../App.css";

const Card = (props) => {
  const { listId, cardInfo, setLists } = props;

  const dragItemRef = useRef({ listId, cardInfo });

  useEffect(() => {
    dragItemRef.current = { listId, cardInfo };
  }, [listId, cardInfo]);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "listItem",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: () => dragItemRef.current,
  }));

  const handleChange = (input) => {
    setLists((prevLists) => {
      const updatedLists = prevLists.map((list) => {
        if (list.id === listId) {
          list.cards = list.cards.map((card) => {
            if (card.id === cardInfo.id) {
              return { ...card, title: input };
            }
            return card;
          });
        }
        return list;
      });
      localStorage.setItem("listifyTasks", JSON.stringify(updatedLists));
      return updatedLists;
    });
  };

  return (
    <div className={`card ${isDragging ? "dragging" : ""}`} ref={drag}>
      <p className="date">{moment(cardInfo.time).format("LLL")}</p>
      <EditableInput
        id={cardInfo.id}
        text={cardInfo.title}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Card;
