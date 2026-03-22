import { useEffect, useRef, useState } from "react";
import "./App.css";
import "@fontsource-variable/montserrat";
import Home from "./assets/components/Home";
import TaskList from "./assets/components/TaskList";
import EditTask from "./assets/components/EditTask";

function App() {
  const [viewTask, setviewTask] = useState(false);
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("taskList")) || [],
  );
  const [taskCount, setTaskCount] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const editedIndex = useRef(null);


  useEffect(() => {
    const count = taskList.length;
    setTaskCount(count);
    // console.log(taskCount)
  }, [taskList]);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <>
      {!viewTask && (
        <Home
          setviewTask={setviewTask}
          taskCount={taskCount}
          taskList={taskList}
          setTaskList={setTaskList}
        />
      )}
      {viewTask && (
        <TaskList
          taskList={taskList}
          setTaskList={setTaskList}
          setviewTask={setviewTask}
          editedIndex={editedIndex}
          setIsEdit={setIsEdit}
        />
      )}
      {isEdit && (
        <EditTask
          taskList={taskList}
          setTaskList={setTaskList}
          editedIndex={editedIndex}
          setIsEdit={setIsEdit}
        />
      )}
    </>
  );
}

export default App;
