import React, { useContext, useState } from "react";
import Label from "./Labels/Label";
import AddNewLabel from "./Labels/AddNewLabel";
import { CaretUpFill, PencilFill, Tag } from "react-bootstrap-icons";
import { TodoContext } from "../../context";

function Labels() {
  const [showMenu, setShowMenu] = useState(true);
  const [edit, setEdit] = useState(false);
  const pencilColour = edit ? "#A38A6D" : "#FAFAFA";

  const { labels } = useContext(TodoContext);

  return (
    <div className="Labels">
      <div className="header">
        <div className="title">
          <Tag size="18" />
          <p>Labels</p>
        </div>
        <div className="buttons">
          {showMenu && labels.length > 0 && (
            <span className="edit" onClick={() => setEdit((edit) => !edit)}>
              <PencilFill size="15" color={pencilColour} />
            </span>
          )}
          <AddNewLabel />
          <span className="arrow">
            <CaretUpFill size="20" />
          </span>
        </div>
      </div>
      <div className="items">
        {labels.map((label) => (
          <Label label={label} key={label.id} edit={edit} />
        ))}
      </div>
    </div>
  );
}

export default Labels;
