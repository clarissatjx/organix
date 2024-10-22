import React, { useState, useContext } from "react";
import {
  ArrowClockwise,
  CheckCircleFill,
  Circle,
  Trash,
} from "react-bootstrap-icons";
import {
  deleteItem,
  getSubcollectionDocRef,
  getSubcollectionRef,
  update,
  add,
} from "../../../firebase/index";
import { useUser } from "../../../context/user";
import moment from "moment";
import { TodoContext } from "../../../context";

function Todo({ todo, showDate = false, showLabel = true }) {
  const { username } = useUser();
  const { selectedTask, setSelectedTask } = useContext(TodoContext);

  const [hover, setHover] = useState(false);

  function handleDelete() {
    const taskRef = getSubcollectionDocRef(username, todo.id, "tasks");
    deleteItem(taskRef)
      .then(() => {
        console.log(`Task ${todo.text} deleted successfully`);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });

      if (selectedTask === todo) {
        setSelectedTask(undefined);
      }
  }

  function handleAdd() {
    const tasksSubcollectionRef = getSubcollectionRef(username, "tasks");
    // Use Moment.js to parse the original date and add one day
    const originalDate = moment(todo.date, "DD/MM/YYYY").add(1, "days");
    const newDate = originalDate.format("DD/MM/YYYY");
    const newDay = originalDate.format("d");

    try {
      add(tasksSubcollectionRef, {
        text: todo.text,
        time: todo.time,
        label: todo.label,
        date: newDate,
        day: newDay,
        checked: false,
      });
    } catch (e) {
      console.log("Error adding task", e);
    }
  }

  function handleCheck() {
    const taskRef = getSubcollectionDocRef(username, todo.id, "tasks");
    update(taskRef, { checked: !todo.checked });
  }

  return (
    <div className="Todo">
      <div
        className="todo-container"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="check-todo">
          {todo.checked ? (
            <span className="checked" onClick={handleCheck}>
              <CheckCircleFill
                className="icon"
                color="#9caf88"
                size={"1.3rem"}
              />
            </span>
          ) : (
            <span className="unchecked" onClick={handleCheck}>
              <Circle className="icon" color="#9caf88" size={"1.3rem"} />
            </span>
          )}
        </div>

        <div className="text" onClick={() => setSelectedTask(todo)}>
          <p style={{ color: todo.checked ? "#bebebe" : "#303030" }}>
            {todo.text}
          </p>
          <span>
            {showDate && showLabel ? (
              <span>
                {todo.date} {todo.time} - {todo.label}
              </span>
            ) : showDate ? (
              <span>
                {todo.date} {todo.time}
              </span>
            ) : (
              <span>
                {todo.time} - {todo.label}
              </span>
            )}
          </span>
          <div className={`line ${todo.checked ? "line-through" : ""}`}></div>
        </div>

        <div className="add-to-next-day" onClick={handleAdd}>
          {todo.checked && (
            <span>
              <ArrowClockwise />
            </span>
          )}
        </div>

        <div className="delete-todo">
          {(hover || todo.checked) && (
            <span onClick={handleDelete}>
              <Trash />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;
