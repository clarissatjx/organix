import React, { useContext } from "react";
import Todo from "./Todos/Todo";
import Next7Days from "./Todos/Next7Days";
import { TodoContext } from "../../context";
import moment from "moment";

function Todos() {
  const { todos, selectedLabel } = useContext(TodoContext);

  return (
    <div className="Todos">
      <div className="selected-label">{selectedLabel}</div>
      <div className="todos">
        {selectedLabel === "next 7 days" ? (
          <Next7Days tasks={todos} />
        ) : selectedLabel === "today" ? (
          todos
            .filter((todo) =>
              moment(todo.date, "DD/MM/YYYY").isSame(moment(), "day")
            )
            .map((todo) => <Todo todo={todo} key={todo.id} />)
        ) : selectedLabel === "all time" ? (
          todos.map((todo) => (
            <Todo todo={todo} key={todo.id} showDate={true} />
          ))
        ) : (
          todos
            .filter((todo) => todo.label === selectedLabel)
            .map((todo) => <Todo todo={todo} key={todo.id} showDate={true} showLabel={false} />)
        )}
      </div>
    </div>
  );
}

export default Todos;
