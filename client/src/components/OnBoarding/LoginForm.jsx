import React, { useState } from "react";
import fetchAPI from "../../libs/fetchAPI";
import toast from "react-hot-toast";

const LoginForm = ({ setWorkspace }) => {
  const [workspaceIdInput, setWorkspaceIdInput] = useState("");
  const handleLogin = (ev) => {
    ev.preventDefault();
    if (!workspaceIdInput) return;

    fetchAPI(`/workspaces/${workspaceIdInput}`, { method: "GET" })
      .then((data) => {
        console.log("response data = ", data);
        localStorage.setItem("workspace", JSON.stringify(data));
        setWorkspace(data);
      })
      .catch((error) => {
        console.log("Error occurred while logging in ", error);
        toast.error("Workspace doesn't exists!");
      });
  };
  return (
    <form className="py-1" onSubmit={handleLogin}>
      <h1 className="text-md text-center pt-2 pb-1 font-medium">
        Create a workspace
      </h1>
      <label htmlFor="" className="flex justify-center">
        <input
          type="text"
          name="workspace"
          id="workspace"
          placeholder="Workspace id"
          className="px-1 py-1 border-none rounded-l-md outline-none text-sm"
          value={workspaceIdInput}
          onChange={(e) => setWorkspaceIdInput(e.target.value)}
        />
        <button
          type="submit"
          className="border text-sm bg-orange-500 text-white rounded-r-md px-1 py-1"
        >
          Enter
        </button>
      </label>
    </form>
  );
};

export default LoginForm;
