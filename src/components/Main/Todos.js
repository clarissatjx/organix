import React, { useContext } from "react";
import Todo from "./Todos/Todo";
import Next7Days from "./Todos/Next7Days";
import { TodoContext } from "../../context";

function Todos() {
  const { todos, selectedLabel } = useContext(TodoContext);

  return (
    <div className="Todos">
      <div className="selected-label">{selectedLabel}</div>
      <div className="todos">
        {selectedLabel === "next 7 days" ? (
          <Next7Days todos={todos} />
        ) : (
          todos.map((todo) => <Todo todo={todo} key={todo.id} />)
        )}
      </div>
    </div>
  );
}

export default Todos;
