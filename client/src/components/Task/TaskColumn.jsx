import React from "react";
import DropSpace from "./DropSpace";
import TaskItem from "./TaskItem";

const TaskColumn = ({
  title,
  status,
  tasks,
  setTasks,
  setActiveDragId,
  handleDrop,
  handleDelete,
  setTask,
}) => {
  const sortByTitle = () => {
    const sortedTasks = [...tasks];
    const tasksToSort = sortedTasks.filter((item) => item.status === status);
    tasksToSort.sort((a, b) => a.title.localeCompare(b.title));

    // Merge sorted tasks back into the original array
    const sorted = sortedTasks.map((item) =>
      item.status === status ? tasksToSort.shift() : item
    );
    setTasks(sorted);
  };

  return (
    <div className={`col-span-12 md:col-span-4`}>
      <div
        className={`border-2  border-dashed rounded-xl p-2 ${
          status === "in_progress"
            ? "border-red-400"
            : status === "completed"
            ? "border-green-400"
            : "border-gray-400"
        }`}
      >
        <h1 className="text-center text-base font-medium flex items-center justify-center gap-1">
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              status === "in_progress"
                ? "bg-red-400"
                : status === "completed"
                ? "bg-green-400"
                : "bg-gray-400"
            }`}
          ></span>
          <span>{title}</span>
        </h1>
        <div className="flex gap-1 justify-end">
          <button
            className="border-none px-1.5 py-1 rounded-md text-xs hover:bg-gray-100"
            onClick={sortByTitle}
          >
            Sort by Title
          </button>
        </div>
        <ul className="space-y-0">
          <DropSpace onDrop={() => handleDrop(status, 0)} />
          {tasks.map(
            (item, index) =>
              item.status === status && (
                <React.Fragment key={item.id}>
                  <TaskItem
                    item={item}
                    index={index}
                    setActiveDragId={setActiveDragId}
                    handleDelete={handleDelete}
                    setTask={setTask}
                  />
                  <DropSpace onDrop={() => handleDrop(status, index + 1)} />
                </React.Fragment>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default TaskColumn;
