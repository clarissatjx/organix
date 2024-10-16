import React, { useState } from "react";
import LabelForm from "../AddNewLabel/LabelForm";

function RenameLabel({label, setShowModal}) {
  const [newLabelName, setNewLabelName] = useState(label.name);

  function handleSubmit(e) {

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
