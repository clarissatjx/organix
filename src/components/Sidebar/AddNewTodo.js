import React, { useContext, useEffect, useState } from "react";
import Modal from "../Modal";
import { Button } from "@mui/material";
import TodoForm from "../TodoForm";
import { TodoContext } from "../../context";

function AddNewTodo() {
  const { selectedLabel } = useContext(TodoContext);

  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [todoLabel, setTodoLabel] = useState(selectedLabel);

  useEffect(() => {
    setTodoLabel(selectedLabel);
  }, [selectedLabel]);

  const labels = [
    { id: 1, name: "personal", numOfTasks: 0 },
    { id: 2, name: "school", numOfTasks: 1 },
    { id: 3, name: "misc", numOfTasks: 3 },
  ];

  function handleSubmit(e) {}

  return (
    <div className="AddNewTodo">
      <div className="button">
        <Button
          className="newTask"
          variant="contained"
          onClick={() => setShowModal(true)}
        >
          + New Task
        </Button>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <TodoForm
          handleSubmit={handleSubmit}
          heading="Add new task"
          text={text}
          setText={setText}
          day={day}
          setDay={setDay}
          time={time}
          setTime={setTime}
          todoLabel={todoLabel}
          setTodoLabel={setTodoLabel}
          labels={labels}
          showButtons={true}
          setShowModal={setShowModal}
        />
      </Modal>
    </div>
  );
}

export default AddNewTodo;
