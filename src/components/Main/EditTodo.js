import React, { useContext, useEffect, useState } from "react";
import TodoForm from "../TodoForm";
import { TodoContext } from "../../context";
import moment from "moment";
import { getSubcollectionDocRef, update } from "../../firebase";
import { useUser } from "../../context/user";

function EditToDo() {
  const [text, setText] = useState("");
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [todoLabel, setTodoLabel] = useState("");

  const { labels, selectedTask } = useContext(TodoContext);
  const { username } = useUser();

  useEffect(() => {
    if (selectedTask) {
      setText(selectedTask.text);
      setDay(moment(selectedTask.date, "DD/MM/YYYY", true).toDate());
      setTime(moment(selectedTask.time, "hh:mm A", true).toDate());
      setTodoLabel(selectedTask.label);
    }
  }, [selectedTask]);

  useEffect(() => {
    if (selectedTask) {
      // Format day and time before submission
      const formattedDate = moment(day).format("DD/MM/YYYY");
      const formattedDay = moment(day).format("d");
      const formattedTime = moment(time).format("hh:mm A");
      // Create an updated task object
      const updatedTask = {
        ...selectedTask, // Keep other properties unchanged
        text: text,
        date: formattedDate,
        day: formattedDay,
        time: formattedTime,
        label: todoLabel,
      };
      update(
        getSubcollectionDocRef(username, selectedTask.id, "tasks"),
        updatedTask
      );
      console.log("Updated task: ", updatedTask);
    }
  }, [text, day, time, todoLabel]);

  function handleSubmit(e) {}

  return (
    <div>
      {selectedTask && (
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
      )}
    </div>
  );
}

export default EditToDo;
