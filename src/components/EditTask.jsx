import React, { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

function EditTask({ setIsEdit, editedIndex,taskList,setTaskList }) {
  const [taskInput, setTaskInput] = useState("");
  const [dateInput, setDateInput] = useState(
    "" || dayjs().format("YYYY-MM-DD"),
  );
  const [timeInput, setTimeInput] = useState("" || dayjs().format("hh:mm"));
  const [matchingElement, setMatchingElement] = useState({});

  const handleSaveChanges = () => {

    // console.log(matchingElement);
    matchingElement.task = taskInput.charAt(0).toUpperCase() + taskInput.slice(1);
    matchingElement.date = dayjs(dateInput).format("DD-MM-YYYY");
    matchingElement.time = dayjs(`${timeInput}`, "hh:mm").format("h:mm A");

    // console.log(taskList);

    setTaskList([...taskList]);
    setIsEdit(false);
  };

  const handleClose = () => {
    setIsEdit(false);
  }

  const handleEnter = (event) => {
    if(event.key === 'Enter'){
      handleSaveChanges();
    }
  }


  useState(()=>{
    const findEditedTask = () => {
      const matchingElement = taskList.find((value, index)=>{
        return index === editedIndex.current;
      }) 

      // const converToInput = {
      //   task: matchingElement.task,
      //   date: dayjs(`${matchingElement.date}`, "DD-MM-YYYY").format("YYYY-MM-DD"),
      //   time: dayjs(`${matchingElement.time}`,'h:mm A').format('hh:mm')
      // }

      setTaskInput(matchingElement.task);
      setDateInput(dayjs(`${matchingElement.date}`, "DD-MM-YYYY").format("YYYY-MM-DD"));
      setTimeInput(dayjs(`${matchingElement.time}`,'h:mm A').format('hh:mm'))

      setMatchingElement(matchingElement);
    }

    findEditedTask();
  },[]) 
    
  return (
    <div className="fixed top-0 w-full h-[100vh] backdrop-blur-xs flex justify-center items-center">
      <div className="bg-white outline-3 rounded-2xl p-10 flex flex-col items-center justify-center space-y-7 relative">
        <div onClick={handleClose} className="cursor-pointer bg-[#104050] absolute top-[-10px] right-[-10px] p-1 py-1 rounded-full">
          <i className="fa-solid fa-xmark text-white text-lg"></i>
        </div>
        <p className="text-2xl font-bold">Edit</p>
        <input
          value={taskInput}
          onChange={(e) => {
            setTaskInput(e.target.value);
          }}
          onKeyDown={handleEnter}
          className="outline-1 p-2 w-60 rounded-lg capitalize"
          type="text"
          placeholder={matchingElement.task}
        />
        <input
          value={dateInput}
          onChange={(e) => {
            setDateInput(e.target.value);
          }}
          className="outline-1 p-2 w-60 rounded-lg"
          type="date"
        ></input>
        <input
          value={timeInput}
          onChange={(e) => {
            setTimeInput(e.target.value);
          }}
          className="outline-1 p-2 w-60 rounded-lg"
          type="time"
        ></input>
        <button className=" cursor-pointer p-2 px-4 rounded-xl font-semibold bg-[#104050] text-white" onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  );
}

export default EditTask;
