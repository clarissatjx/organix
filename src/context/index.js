import React, { createContext, useState, useEffect } from "react";
import { useTodos, useLabels } from "../hooks";

const TodoContext = createContext();

function TodoContextProvider({ children }) {
  const defaultLabel = "today";
  const [selectedLabel, setSelectedLabel] = useState(defaultLabel);
  const [selectedTask, setSelectedTask] = useState(undefined);

  const todos = useTodos();
  const labels = useLabels(todos);

  return (
    <TodoContext.Provider
      value={{
        selectedLabel,
        setSelectedLabel,
        todos,
        labels,
        selectedTask,
        setSelectedTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContextProvider, TodoContext };
