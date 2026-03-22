import React, { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default function Home({
  taskList,
  taskCount,
  setviewTask,
  setTaskList,
}) {
  const [taskInput, setTaskInput] = useState("");
  const [dateInput, setDateInput] = useState(
    "" || dayjs().format("YYYY-MM-DD"),
  );
  const [timeInput, setTimeInput] = useState("" || dayjs().format("hh:mm"));

  const handleTLButton = () => {
    setviewTask(true);
  };

  // console.log(dayjs(`${timeInput}`, 'hh:mm').format('h:mm A'))
  // console.log(dayjs(dateInput).format('DD-MM-YYYY'))

  const handleAdd = () => {
    const taskListValue = {
      task: taskInput.charAt(0).toUpperCase() + taskInput.slice(1),
      date: dayjs(dateInput).format("DD-MM-YYYY"),
      time: dayjs(`${timeInput}`, "hh:mm").format("h:mm A"),
    };

    setTaskList([...taskList, taskListValue]);
    setTaskInput("");
    setDateInput(dayjs().format("YYYY-MM-DD"));
    setTimeInput(dayjs().format("hh:mm"));
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center gap-y-20 mt-10 [&_label]:text-2xl
    [&_input]:outline-2 [&_input]:w-55 [&_input]:rounded-xl [&_label]:font-bold"
    >
      <div className="cursor-pointer flex items-center w-full justify-end space-x-10">
        <p className="text-3xl font-bold">REMINDER</p>
        <div
          onClick={handleTLButton}
          className="mr-5 text-white rounded-full font-Montserrat font-semibold relative"
        >
          <i className="fa-solid fa-clipboard-list text-[#104050] relative text text-[40px]"></i>

          {taskCount > 0 && (
            <div className="absolute top-[-10px] right-0 text-white bg-red-500 px-2 py-0.5 rounded-full">
              {taskCount}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center space-y-20">
        <div className="flex space-x-10 items-center">
          <label htmlFor="text">Task</label>
          <input
            className="py-10 px-5 capitalize"
            value={taskInput}
            onChange={(e) => {
              setTaskInput(e.target.value);
            }}
            onKeyDown={handleEnter}
            type="text"
            id="text"
            placeholder="Enter Task"
          ></input>
        </div>

        <div className="flex space-x-10 items-center">
          <label htmlFor="date">Date</label>
          <input
            className="px-5 py-3"
            value={dateInput}
            onChange={(e) => {
              setDateInput(e.target.value);
            }}
            type="date"
            id="date"
          ></input>
        </div>

        <div className="flex space-x-10 items-center">
          <label htmlFor="time">Time</label>
          <input
            className="px-5 py-3"
            value={timeInput}
            onChange={(e) => {
              setTimeInput(e.target.value);
            }}
            type="time"
            id="time"
            placeholder="Enter Task"
          ></input>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className="cursor-pointer mt-10 font-semibold px-20 py-3 text-white rounded-2xl bg-[#104050] tracking-wider"
      >
        Add Task
      </button>
    </div>
  );
}
