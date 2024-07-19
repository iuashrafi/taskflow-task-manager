import { Pencil, Trash2, GripVertical } from "lucide-react";
import TaskModal from "./TaskModal";
import { useState } from "react";
const TaskItem = ({ item, index, setActiveDragId, handleDelete, setTask }) => {
  const [display, setDisplay] = useState(false);

  return (
    <>
      <TaskModal display={display} setDisplay={setDisplay} task={item} />
      <li
        draggable
        onDragStart={() => setActiveDragId(index)}
        onDragEnd={() => setActiveDragId(null)}
        className={`flex items-center gap-1`}
      >
        <div>
          <button className="cursor-grab">
            <GripVertical size={16} className="text-gray-500" />
          </button>
        </div>
        <div
          onClick={() => setDisplay(true)}
          className={`cursor-pointer flex-grow hover:bg-slate-50 border border-slate-100 rounded-md px-3 py-2.5 flex items-center justify-between`}
        >
          <div className="">{item.title}</div>
          <div className="space-x-1 flex items-center">
            <button
              className="float-right border-none rounded-md px-0.5 py-1 hover:bg-slate-200"
              onClick={(ev) => {
                ev.stopPropagation();
                setTask({
                  id: item.id,
                  title: item.title,
                  description: item.description,
                  duedate: item.duedate,
                });
              }}
            >
              <Pencil size={16} />
            </button>
            <button
              className="float-right border-none rounded-md px-0.5 py-1 hover:bg-gray-200"
              onClick={(ev) => {
                ev.stopPropagation();
                handleDelete(item.id);
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </li>
    </>
  );
};

export default TaskItem;
