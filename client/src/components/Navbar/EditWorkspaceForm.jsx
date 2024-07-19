import { Edit } from "lucide-react";
import { useState } from "react";
import fetchAPI from "../../libs/fetchAPI";
import toast from "react-hot-toast";

const EditWorkspaceForm = ({ workspace, setWorkspace }) => {
  const [wsname, setWsname] = useState(workspace?.name || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setWsname(wsname.trim());

    if (wsname.length === 0) return;

    if (!workspace?.id) return;

    fetchAPI(`/workspaces/`, {
      method: "PUT",
      body: JSON.stringify({
        name: wsname,
        workspace_id: workspace?.id,
      }),
    })
      .then((data) => {
        console.log(data);
        toast.success("Renamed successfully!");
        setWorkspace(data);
        localStorage.setItem("workspace", JSON.stringify(data));
      })
      .catch((error) => {
        toast.error("Error renaming...");
        console.error("Error during rename ", error);
      });

    setIsEditing(false);
  };
  return (
    <div className="">
      {isEditing === false ? (
        <button
          className="group hover:underline cursor-pointer flex items-center space-x-1"
          onClick={() => setIsEditing(true)}
        >
          <span className="text-sm">{wsname}</span>
          <span className="opacity-0  group-hover:opacity-100">
            <Edit size={16} />
          </span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="flex items-baseline">
          <input
            type="text"
            onChange={(e) => setWsname(e.target.value)}
            value={wsname}
            className="border-b border-b-gray-900 outline-none"
          />
          <button className="bg-orange-700 rounded-lg px-1.5 py-1 text-sm text-white">
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default EditWorkspaceForm;
