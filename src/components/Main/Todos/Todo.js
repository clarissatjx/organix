import React, { useState } from "react";
import {
  ArrowClockwise,
  CheckCircleFill,
  Circle,
  Trash,
} from "react-bootstrap-icons";

function Todo({ todo }) {
  const [hover, setHover] = useState(false);

  return (
    <div className="Todo">
      <div
        className="todo-container"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="check-todo">
          {todo.checked ? (
            <span className="checked">
              <CheckCircleFill
                className="icon"
                color="#9caf88"
                size={"1.3rem"}
              />
            </span>
          ) : (
            <span className="unchecked">
              <Circle className="icon" color="#9caf88" size={"1.3rem"} />
            </span>
          )}
        </div>

        <div className="text">
          <p style={{ color: todo.checked ? "#bebebe" : "#303030" }}>
            {todo.text}
          </p>
          <span>
            {todo.time} - {todo.label}
          </span>
          <div className={`line ${todo.checked ? "line-through" : ""}`}></div>
        </div>

        <div className="add-to-next-day">
          {todo.checked && (
            <span>
              <ArrowClockwise />
            </span>
          )}
        </div>

        <div className="delete-todo">
          {(hover || todo.checked) && (
            <span>
              <Trash />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;
