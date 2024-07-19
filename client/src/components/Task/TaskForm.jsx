import { useState } from "react";
import fetchAPI from "../../libs/fetchAPI";

const TaskForm = ({ setTasks, workspace, task, setTask, taskInitialState }) => {
  const [errors, setErrors] = useState({});

  // basic form validation
  const validateForm = () => {
    let newErrors = {};

    // Title : trim, min length ==1, Required
    task.title = task.title.trim();
    if (!task.title || task.title.length < 1)
      newErrors.title = "Task name is required";

    // Description : trim, optional
    task.description = task.description.trim();

    // Due date is optional
    return newErrors;
  };

  // form submission
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    let payload = {
      workspace_id: workspace.id,
      title: task.title,
      description: task.description,
      duedate: task.duedate,
    };
    if (!task.id) {
      console.log("Creating a new task = ", payload);

      fetchAPI(`/tasks/`, {
        method: "POST",
        body: JSON.stringify(payload),
      })
        .then((newTask) => {
          console.log("Task created successfully, new task=", newTask);
          setTasks((prev) => [...prev, newTask]);
          setTask(taskInitialState);
        })
        .catch((error) => console.error("Error creating task", error));
    } else {
      // update the task
      console.log("Updating the task to =>", {
        ...payload,
        id: task.id,
      });

      fetchAPI(`/tasks/${task.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...payload,
          id: task.id,
        }),
      })
        .then((updatedTask) => {
          console.log("Tasked updated successfully, task=", updatedTask);
          setTask(taskInitialState);
        })
        .catch((error) => console.error("Error updating task", error));
    }
  };

  return (
    <div className="bg-gradient-to-b from-orange-100 via-orange-200 to-orange-200 shadow-sm p-4 md:p-6 rounded-lg mt-6">
      <form
        onSubmit={handleSubmit}
        className="bg-indigo- flex items-end justify-center flex-wrap gap-4"
      >
        <label htmlFor="" className="flex flex-col">
          <span
            className={`text-sm font-medium ${
              errors.title ? "text-red-500" : "text-gray-800"
            }`}
          >
            Task Name
            {errors.title && <span> *Required</span>}
          </span>
          <input
            type="text"
            name="task_name"
            id="task_name"
            placeholder="Task name"
            value={task.title}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, title: e.target.value }))
            }
            className="text-base border-none px-2 py-1.5 rounded-md focus:outline-none focus:ring-0"
          />
        </label>

        <label htmlFor="" className="flex flex-col flex-grow">
          <span className="text-sm font-medium text-gray-800">
            Task Description
          </span>
          <input
            type="text"
            placeholder="Description"
            name="task_description"
            id="task_description"
            value={task.description}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full text-base border-none px-2 py-1.5 rounded-md focus:outline-none focus:ring-0"
          />
        </label>
        <label htmlFor="" className="flex flex-col">
          <span className="text-sm font-medium text-gray-800">Due Date</span>
          <input
            type="date"
            name="due_date"
            id="due_date"
            placeholder="Due Date"
            value={task.duedate}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, duedate: e.target.value }))
            }
            className="text-base border-none px-2 py-1.5 rounded-md focus:outline-none focus:ring-0"
          />
        </label>

        <button
          type="submit"
          className="px-2 py-1 text-white text-base bg-orange-700 border border-amber-700 focus:outline-amber-500 rounded-lg"
        >
          {task.id ? "Update" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
