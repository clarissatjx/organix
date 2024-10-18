import moment from "moment";
import React, { useEffect, useState } from "react";
import Todo from "./Todo";

function Next7Days({ tasks }) {
  const [weekTasks, setWeekTasks] = useState([]);

  useEffect(() => {
    const todaysDate = moment().startOf('day');
    const nextWeekEndDate = moment().add(6, 'days').endOf('day');

    const days = ['0', '1', '2', '3', '4', '5', '6'];
    const sortedTasksByDay = days.map(day => {
      return {
        tasks: tasks.filter(task => {
          const taskDate = moment(task.date, 'DD/MM/YYYY');
          return task.day === day
            && taskDate.isBetween(todaysDate,
              nextWeekEndDate, null, '[]');
        }),
        number: day
      }
    });

    const today = parseInt(moment().format('d'));
    const arrangedDays = sortedTasksByDay.slice(today)
      .concat(sortedTasksByDay.slice(0, today));
    setWeekTasks(arrangedDays);
  }, [tasks])

  return (
    <div className="Next7Days">
      {weekTasks.map((day) => (
        <div key={day.number}>
          <div className="day">
            <div className="name">
              {moment(day.number, "d").format("dddd")}
              {day.number === moment().format("d") && " (Today) "}
            </div>
            <div className="total-tasks">
              ({day.tasks.length})
            </div>
          </div>
          <div className="tasks">
            {
              day.tasks.map(task =>
                <Todo key={task.id} todo={task} />
              )
            }
          </div>
        </div>
      ))}
    </div>
  );
}

export default Next7Days;
