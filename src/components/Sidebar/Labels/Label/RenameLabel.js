import React, { useContext, useState } from "react";
import LabelForm from "../AddNewLabel/LabelForm";
import { useUser } from "../../../../context/user";
import { getSubcollectionDocRef, update } from "../../../../firebase";
import { TodoContext, TodoContextProvider } from "../../../../context";

function RenameLabel({ label, setShowModal }) {
  const { username } = useUser();
  const [newLabelName, setNewLabelName] = useState(label.name);
  const { todos } = useContext(TodoContext);

  function handleSubmit(e) {
    e.preventDefault();
    const docRef = getSubcollectionDocRef(username, label.id, "labels");
    const filteredTodos = todos.filter((task) => task.label === label.name);
    filteredTodos.map((task) =>
      update(getSubcollectionDocRef(username, task.id, "tasks"), {
        label: newLabelName,
      })
    );
    update(docRef, {
      name: newLabelName,
    });
    setShowModal(false);
  }

  return (
    <div className="RenameLabel">
      <LabelForm
        handleSubmit={handleSubmit}
        heading="Edit label name"
        value={newLabelName}
        setValue={setNewLabelName}
        setShowModal={setShowModal}
        confirmButtonText={"Confirm"}
      />
    </div>
  );
}

export default RenameLabel;
