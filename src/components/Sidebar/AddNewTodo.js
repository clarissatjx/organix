import React, { useContext, useEffect, useState } from "react";
import Modal from "../Modal";
import { Button } from "@mui/material";
import TodoForm from "../TodoForm";
import { TodoContext } from "../../context";
import { getCollectionRef, add } from "../../firebase";
import moment from "moment";
import { calendarItems } from "../../constants/index";

function AddNewTodo() {
  const { labels, selectedLabel } = useContext(TodoContext);

  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [todoLabel, setTodoLabel] = useState(selectedLabel);

  useEffect(() => {
    setTodoLabel(selectedLabel);
  }, [selectedLabel]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (text && !calendarItems.includes(todoLabel)) {
      try {
        await add(getCollectionRef("tasks"), {
          text: text,
          date: moment(day).format("DD/MM/YYYY"),
          day: moment(day).format("d"),
          time: moment(time).format("hh:mm A"),
          label: todoLabel,
          checked: false,
        });
        console.log("Successfully added task");
        setShowModal(false);
        setText("");
        setTime(new Date());
        setDay(new Date());
      } catch (e) {
        console.log("Error adding task", e);
      }
    }
  }

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
