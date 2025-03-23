import { useDrop } from "react-dnd";
import "./../App.css";

const Boards = ({ setLists }) => {
  const handleDrop = (item) => {
    setLists((prevLists) => {
      const updatedLists = prevLists.map((list) => {
        if (list.id === item.listId) {
          return {
            ...list,
            cards: list.cards.filter((card) => card.id !== item.cardInfo.id),
          };
        }
        return list;
      });
      localStorage.setItem("listifyTasks", JSON.stringify(updatedLists));
      return updatedLists;
    });
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "listItem",
    drop: (item) => {
      handleDrop(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className="boards">
      <div>
        <h4>Boards</h4>
        <ul>
          <li>Main</li>
        </ul>
      </div>
      <div ref={drop} className={`delete-cards ${isOver ? "dragging" : ""}`}>
        <div>
          <i className="fa-solid fa-trash-can"></i>
        </div>
        To delete a card, just drop it here.
      </div>
    </div>
  );
};

export default Boards;
