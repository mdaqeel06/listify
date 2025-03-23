import { useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import Card from "./Card";

const Content = (props) => {
  const { listId, cardInfo, setLists } = props;

  const updateRef = useRef({ listId, cardInfo });

  useEffect(() => {
    updateRef.current = { listId, cardInfo };
  }, [listId, cardInfo]);

  const [, drop] = useDrop(() => ({
    accept: "listItem",
    drop: (item) => {
      props.handleDrop("bottom", updateRef.current, item);
    },

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [bottomDragging, bottomDrag] = useDrop(() => ({
    accept: "listItem",
    canDrop: () => true,
    drop: (item) => {
      props.handleDrop("bottom", updateRef.current, item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div>
      <div ref={drop}>
        <Card
          listId={props.listId}
          cardInfo={props.cardInfo}
          setLists={setLists}
        />
      </div>

      <div
        ref={bottomDrag}
        className="drag"
      ></div>
      {bottomDragging.isOver && <div className="drag-highlight"></div>}
    </div>
  );
};

export default Content;
