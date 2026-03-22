import React from "react";

function TaskList({
  taskList,
  setTaskList,
  setviewTask,
  setIsEdit,
  editedIndex,
}) {
  const handleBack = () => {
    setviewTask(false);
  };

  const handleDelete = (index) => {
    taskList.splice(index, 1);
    setTaskList([...taskList]);
  };

  const handleEdit = (index) => {
    editedIndex.current = index;
    setIsEdit(true);
  };

  const handleDeleteAll = () => {
    const alert = prompt("", "Do you want to delete all of these");
    if (alert) {
      console.log("delete all");
      setTaskList([]);
    }
  };

  return (
    <div className="mt-11">
      <div className="flex items-center justify-around mb-10">
        <i
          onClick={handleBack}
          className="fa-solid fa-angle-left text-3xl cursor-pointer"
        ></i>
        <p className="text-3xl font-bold">TASK LIST</p>
        <i
          onClick={handleDeleteAll}
          className="fa-solid fa-trash text-[#104050] cursor-pointer text-[34px]"
        ></i>
      </div>

      <div className="pb-10">
        {taskList.length > 0 &&
          taskList.map((value, index) => {
            return (
              <div
                key={index}
                className="flex ring-2 rounded-2xl items-center mx-10 px-5 mt-5 font-semibold relative"
              >
                <p className="font-bold">{index + 1}.</p>
                <div className="p-4 space-y-1.5">
                  <p className="text-xl font-extrabold">{value.task}</p>
                  <p>{value.date}</p>
                  <p>{value.time}</p>
                </div>
                <div
                  onClick={() => {
                    handleDelete(index);
                  }}
                  className="cursor-pointer absolute right-2 top-2"
                >
                  <i className="fa-solid fa-xmark text-2xl"></i>
                </div>

                <div
                  onClick={() => {
                    handleEdit(index);
                  }}
                  className="cursor-pointer absolute right-2 bottom-4"
                >
                  <i className="fa-solid fa-pencil text-2xl"></i>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default TaskList;
