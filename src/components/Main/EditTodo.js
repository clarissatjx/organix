import React, {useState} from "react";
import TodoForm from "../TodoForm";

function EditToDo() {
  const [text, setText] = useState("");
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [todoLabel, setTodoLabel] = useState();

  const labels = [
    { id: 1, name: "personal", numOfTasks: 0 },
    { id: 2, name: "school", numOfTasks: 1 },
    { id: 3, name: "misc", numOfTasks: 3 },
  ];

  function handleSubmit(e) {
    
  }

  return (
    <div className="EditToDo">
      <div className="header">Edit task</div>
      <div className="container">
        <TodoForm
          handleSubmit={handleSubmit}
          text={text}
          setText={setText}
          day={day}
          setDay={setDay}
          time={time}
          setTime={setTime}
          todoLabel={todoLabel}
          setTodoLabel={setTodoLabel}
          labels={labels}
        />
      </div>
    </div>
  );
}

export default EditToDo;
