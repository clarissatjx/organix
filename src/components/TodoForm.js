import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import React from "react";
import { Bell, Calendar2, Clock, Tag, X } from "react-bootstrap-icons";

function TodoForm({
  handleSubmit,
  heading = false,
  text,
  setText,
  day,
  setDay,
  time,
  setTime,
  todoLabel,
  setTodoLabel,
  labels,
  showButtons = false,
  setShowModal = false,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit} className="TodoForm">
        <div className="text">
          {heading && <h3 className="heading">{heading}</h3>}
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Study for cs2040"
            autoFocus
          />
        </div>
        <div className="remind">
          <Bell />
          <p>Remind me!</p>
        </div>
        <div className="pick-day">
          <div className="title">
            <Calendar2 />
            <p>Choose a day</p>
          </div>
          <DatePicker value={day} onChange={(day) => setDay(day)} />
        </div>
        <div className="pick-time">
          <div className="title">
            <Clock />
            <p>Choose time</p>
          </div>
          <TimePicker value={time} onChange={(time) => setTime(time)} />
        </div>
        <div className="pick-label">
          <div className="title">
            <Tag />
            <p>Choose a label</p>
          </div>
          <div className="labels">
            {labels.length > 0 ? (
              labels.map((label) => (
                <div
                  className={`label ${todoLabel === label.name ? "active" : ""}`}
                  onClick={() => setTodoLabel(label.name)}
                  key={label.id}
                >
                  {label.name}
                </div>
              ))
            ) : (
              <div style={{ color: "#ff0000" }}>
                Please add a project before proceeding!
              </div>
            )}
          </div>
        </div>
        {showButtons && (
          <div>
            <div className="cancel" onClick={() => setShowModal(false)}>
              <X size="40" />
            </div>
            <div className="confirm">
              <button>+ Add task</button>
            </div>
          </div>
        )}
      </form>
    </LocalizationProvider>
  );
}

export default TodoForm;
