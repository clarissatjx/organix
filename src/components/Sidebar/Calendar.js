import React, { useContext } from "react";
import { Calendar2, CaretUpFill } from "react-bootstrap-icons";
import { calendarItems } from "../../constants";
import { TodoContext } from "../../context";

function Calendar() {
  const { setSelectedLabel } = useContext(TodoContext);
  
  return (
    <div className="Calendar">
      <div className="header">
        <div className="title">
          <Calendar2 size="18" />
          <p>Calendar</p>
        </div>
        <div className="buttons">
          <span>
            <CaretUpFill size="20"></CaretUpFill>
          </span>
        </div>
      </div>
      <div className="items">
        {calendarItems.map((item) => (
          <div 
          className="item" 
          key={item}
          onClick={() => setSelectedLabel(item)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
