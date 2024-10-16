import React from "react";

function LabelForm({ handleSubmit, heading, value, setValue, setShowModal, confirmButtonText }) {
  return (
    <form className='LabelForm' onSubmit={handleSubmit}>
      <h3 className="header">{heading}</h3>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Label name..."
        autoFocus
      />
      <button
        className="cancel"
        role="button"
        onClick={() => setShowModal(false)}
      >
        cancel
      </button>
      <button className="confirm">
        {confirmButtonText}
      </button>
    </form>
  );
}

export default LabelForm;