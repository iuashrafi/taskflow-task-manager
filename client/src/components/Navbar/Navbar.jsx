import { useState } from "react";
import toast from "react-hot-toast";
import EditWorkspaceForm from "./EditWorkspaceForm";
import NavbarBrand from "./NavbarBrand";
import { LogOut } from "lucide-react";
import WorkspaceIdModal from "./WorkspaceIdModal";

const Navbar = ({ workspace, setWorkspace }) => {
  const [display, setDisplay] = useState(false);

  const handleExitWorkspace = () => {
    localStorage.removeItem("workspace");
    setWorkspace(null);
    toast.success("Logged out");
  };
  return (
    <nav className="w-full px-2 py-1 border-b flex items-center justify-between gap-1">
      <NavbarBrand />

      <EditWorkspaceForm workspace={workspace} setWorkspace={setWorkspace} />
      <div className="flex items-center rounded-md">
        {display && (
          <WorkspaceIdModal
            display={display}
            setDisplay={setDisplay}
            workspace={workspace}
          />
        )}
        <button
          onClick={() => setDisplay(true)}
          className="hover:bg-gray-200 rounded-md text-sm px-1.5 py-1"
        >
          Copy ID
        </button>
        <button
          className="ml-3 px-1.5 py-1 border-none rounded-md bg-orange-700 text-white text-sm flex items-center space-x-2  focus:outline-amber-500"
          onClick={handleExitWorkspace}
        >
          <span>Exit</span>
          <LogOut size={16} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
