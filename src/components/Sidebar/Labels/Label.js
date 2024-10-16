import React, { useContext, useState } from "react";
import { PencilFill, XCircle } from "react-bootstrap-icons";
import Modal from "../../Modal";
import RenameLabel from "./Label/RenameLabel";
import { TodoContext } from "../../../context";

function Label({ label, edit }) {
  const { setSelectedLabel } = useContext(TodoContext);

  const [showModal, setShowModal] = useState(false);
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
            <span className="delete">
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
