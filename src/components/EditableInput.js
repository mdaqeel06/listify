import { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "../context/appContext";

const EditableInput = ({ id, text, handleChange, listName = false }) => {
  const textareaRef = useRef(null);

  const [showInput, setShowInput] = useState(false);

  const { currentInput } = useContext(AppContext);

  useEffect(() => {
    if (id === currentInput) {
      setShowInput(true);
      setTimeout(() => {
        document.getElementById(currentInput).focus();
      }, 0);
    }
  }, [currentInput]);

  useEffect(() => {
    if (!listName) handleTextareaHeight();
  }, [showInput]);

  const handleTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  return (
    <>
      {!showInput && (
        <p className="card-title" onDoubleClick={() => setShowInput(true)}>
          {text}
        </p>
      )}
      {showInput &&
        (listName ? (
          <input
            className="list-name-input"
            value={text}
            autoFocus
            id={id}
            onBlur={() => setShowInput(false)}
            onChange={(e) => handleChange(e.target.value)}
          />
        ) : (
          <textarea
            className="textarea"
            ref={textareaRef}
            rows={1}
            value={text}
            autoFocus
            id={id}
            onBlur={() => setShowInput(false)}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            onChange={(e) => handleChange(e.target.value)}
            onInput={handleTextareaHeight}
          />
        ))}
    </>
  );
};

export default EditableInput;
