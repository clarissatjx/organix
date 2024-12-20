import React, { useContext, useState } from "react";
import { PencilFill, XCircle } from "react-bootstrap-icons";
import Modal from "../../Modal";
import RenameLabel from "./Label/RenameLabel";
import { deleteItem, update, getSubcollectionDocRef } from "../../../firebase";
import { useUser } from "../../../context/user";
import { TodoContext, TodoContextProvider } from "../../../context";

function Label({ label, edit }) {
  const { username } = useUser();
  const { setSelectedLabel } = useContext(TodoContext);
  const { todos } = useContext(TodoContext);

  const [showModal, setShowModal] = useState(false);

  function handleDelete() {
    if (label.name === "misc") {
      alert("Misc label cannot be deleted.");
      return;
    }
    const labelRef = getSubcollectionDocRef(username, label.id, "labels");
    const filteredTodos = todos.filter((task) => task.label === label.name);
    filteredTodos.map((task) =>
      update(getSubcollectionDocRef(username, task.id, "tasks"), {
        label: "misc",
      })
    );
    deleteItem(labelRef)
      .then(() => {
        console.log(`Label ${label.name} deleted successfully`);
      })
      .catch((error) => {
        console.error("Error deleting label:", error);
      });
  }

  return (
    <div className="Label">
      <div className="name" onClick={() => setSelectedLabel(label.name)}>
        {label.name}
      </div>
      <div className="buttons">
        {edit ? (
          <div className="edit-delete">
            <span className="edit" onClick={() => setShowModal(true)}>
              <PencilFill size="13" />
            </span>
            <span className="delete" onClick={handleDelete}>
              <XCircle size="13" />
            </span>
          </div>
        ) : label.numOfTasks === 0 ? (
          ""
        ) : (
          <div className="total-tasks">{label.numOfTasks}</div>
        )}
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <RenameLabel label={label} setShowModal={setShowModal} />
      </Modal>
    </div>
  );
}

export default Label;
