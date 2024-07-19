import { useState } from "react";
import { X } from "lucide-react";

const WorkspaceIdModal = ({ setDisplay, workspace }) => {
  const [isCopied, setIsCopied] = useState(false);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const handleCopyClick = () => {
    copyTextToClipboard(workspace.unique_id)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className={
        "fixed inset-0 w-full h-full bg-gray-500/50 flex items-center justify-center"
      }
    >
      <div className="flex flex-col bg-white rounded-lg w-96 overflow-hidden">
        {/* modal header */}
        <div className="w-full flex justify-between bg-gradient-to-b from-orange-100 via-orange-200 to-orange-200 p-3">
          <h1 className="font-medium">Workspace Id</h1>
          <button
            onClick={() => setDisplay(false)}
            className="bg-white rounded-full size-6 flex items-center justify-center"
          >
            <X size={16} className="text-gray-700" />
          </button>
        </div>
        {/* body */}
        <div className="w-full p-3">
          <p className="text-base py-3">
            Please Copy and Save this Id as it is needed to access your
            workspace.
          </p>
          <div className="flex">
            <input
              type="text"
              value={workspace.unique_id}
              readOnly
              className="px-1 rounded-l-md bg-orange-100 outline-none flex-grow"
            />
            <button
              onClick={handleCopyClick}
              className="bg-orange-700 text-white p-1 rounded-r-md text-sm"
            >
              {isCopied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceIdModal;
