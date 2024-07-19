import React from "react";

const TaskListLoader = () => {
  return (
    <section className="grid grid-cols-12 mt-6 gap-3">
      <div
        className={`animate-pulse col-span-12 md:col-span-4 border-4 rounded-lg border-dashed border-gray-100`}
      >
        <ul>
          <li className="p-4 bg-gray-50">
            <div className="bg-slate-100 rounded-md p-4"> </div>
          </li>
          <li className="p-4 bg-gray-50">
            <div className="bg-slate-100 rounded-md p-4"> </div>
          </li>
          <li className="p-4 bg-gray-50">
            <div className="bg-slate-100 rounded-md p-4"> </div>
          </li>
          <li className="p-4 bg-gray-50">
            <div className="bg-slate-100 rounded-md p-4"> </div>
          </li>
        </ul>
      </div>
      <div
        className={`animate-pulse col-span-12 md:col-span-4 border-4 rounded-lg border-dashed border-red-100`}
      >
        <ul>
          <li className="p-4 bg-gray-50">
            <div className="bg-slate-100 rounded-md p-4"> </div>
          </li>
          <li className="p-4 bg-gray-50">
            <div className="bg-slate-100 rounded-md p-4"> </div>
          </li>
          <li className="p-4 bg-gray-50">
            <div className="bg-slate-100 rounded-md p-4"> </div>
          </li>
          <li className="p-4 bg-gray-50">
            <div className="bg-slate-100 rounded-md p-4"> </div>
          </li>
        </ul>
      </div>
      <div
        className={`animate-pulse col-span-12 md:col-span-4 border-4 rounded-lg border-dashed border-green-100`}
      >
        <ul>
          <li className="p-4 bg-gray-50">
            <div className="bg-slate-100 rounded-md p-4"> </div>
          </li>
          <li className="p-4 bg-gray-50">
            <div className="bg-slate-100 rounded-md p-4"> </div>
          </li>
          <li className="p-4 bg-gray-50">
            <div className="bg-slate-100 rounded-md p-4"> </div>
          </li>
          <li className="p-4 bg-gray-50">
            <div className="bg-slate-100 rounded-md p-4"> </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default TaskListLoader;
