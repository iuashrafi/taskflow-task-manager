import { Calendar, X } from "lucide-react";

const TaskModal = ({ display, setDisplay, task }) => {
  if (display === false) {
    return <></>;
  }
  return (
    <div
      className={
        "fixed inset-0 w-full h-full bg-gray-500/50 flex items-center justify-center"
      }
    >
      <div className="flex flex-col bg-white rounded-lg w-96 overflow-hidden">
        {/* modal header */}
        <div className="w-full flex justify-between bg-orange-200 p-3">
          <h1 className="font-medium">{task.title}</h1>
          <button
            onClick={() => setDisplay(false)}
            className="bg-white rounded-full size-6 flex items-center justify-center"
          >
            <X size={16} className="text-gray-700" />
          </button>
        </div>
        {/* body */}
        <div className="w-full p-3">
          <h2 className="font-medium">Description</h2>
          <p>{task.description}</p>

          <div className="pb-1 pt-2 flex items-center justify-between">
            {task?.duedate && (
              <span className="flex items-center gap-1 rounded-full bg-gray-200 border text-gray-900 px-1.5 py-0.5 text-sm">
                <Calendar className="inline" size={16} />
                <span>2014 05</span>
              </span>
            )}

            {task.status === "todo" && (
              <span className="border-none rounded-full bg-sky-400 text-white px-1.5 py-0.5 text-sm">
                {task.status}
              </span>
            )}

            {task.status === "in_progress" && (
              <span className="border-none rounded-full bg-red-400 text-white px-1.5 py-0.5 text-sm">
                Progress
              </span>
            )}
            {task.status === "completed" && (
              <span className="border-none rounded-full bg-green-400 text-white px-1.5 py-0.5 text-sm">
                Completed
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
