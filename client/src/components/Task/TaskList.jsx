import { useState } from "react";
import TaskColumn from "./TaskColumn";
import fetchAPI from "../../libs/fetchAPI";
import { BACKEND_URL } from "../../config";
import toast from "react-hot-toast";

const TaskList = ({ tasks, setTasks, workspace, setTask }) => {
  const [activeDragId, setActiveDragId] = useState(null);

  console.log(tasks);
  const handleDrop = (status, position) => {
    if (activeDragId === null) return;

    const taskToMove = tasks[activeDragId];

    // Remove the task from its current position
    let updatedTasks = tasks.filter((_, index) => index !== activeDragId);

    // Calculate the new index based on the target status and position
    let newIndex = position;

    // If moving to the same status, adjust index accordingly
    if (taskToMove.status === status) {
      const filteredTasks = tasks.filter((task) => task.status === status);
      newIndex = filteredTasks.findIndex((task) => task === taskToMove);
      newIndex = newIndex < position ? position - 1 : position;
    }

    // Insert the task at the new position
    updatedTasks.splice(newIndex, 0, { ...taskToMove, status });

    setTasks(updatedTasks);
    setActiveDragId(null);

    // backend updation
    const updatedTaskData = updatedTasks.map((task, index) => ({
      id: task.id,
      order_no: index,
      status: task.status,
    }));

    // Call backend API to update database with new order_no
    updateTaskOrderInDatabase(updatedTaskData);
  };

  const updateTaskOrderInDatabase = async (updatedTaskData) => {
    let data = {
      workspace_id: workspace.id,
      tasks: updatedTaskData,
    };

    fetchAPI("/update_tasks", {
      method: "PUT",

      body: JSON.stringify(data),
    })
      .then((data) => console.log("updatedTasks Response = ", data))
      .catch((error) => console.error("Error updating task order", error));
  };

  // Function to delete a task
  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      toast.success("Task deleted!");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <section className="grid grid-cols-12 mt-6 gap-3">
      <TaskColumn
        title="Todo"
        status="todo"
        tasks={tasks}
        setTasks={setTasks}
        setActiveDragId={setActiveDragId}
        handleDrop={handleDrop}
        handleDelete={handleDelete}
        setTask={setTask}
      />
      <TaskColumn
        title="In Progress"
        status="in_progress"
        tasks={tasks}
        setTasks={setTasks}
        setActiveDragId={setActiveDragId}
        handleDrop={handleDrop}
        handleDelete={handleDelete}
        setTask={setTask}
      />
      <TaskColumn
        title="Completed"
        status="completed"
        tasks={tasks}
        setTasks={setTasks}
        setActiveDragId={setActiveDragId}
        handleDrop={handleDrop}
        handleDelete={handleDelete}
        setTask={setTask}
      />
      {/* <div>Active Drag id = {activeDragId}</div>
      <div>
        Workspace id ={" "}
        {JSON.stringify({ uid: workspace.unique_id, w_id: workspace.id })}
      </div> */}
    </section>
  );
};

export default TaskList;
