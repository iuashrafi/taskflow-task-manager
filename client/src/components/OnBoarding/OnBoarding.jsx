import React, { useState } from "react";
import NavbarBrand from "../Navbar/NavbarBrand";
import fetchAPI from "../../libs/fetchAPI";
import LoginForm from "./LoginForm";
import toast from "react-hot-toast";

const OnBoarding = ({ setWorkspace }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [havingWorkspace, setHavingWorkspace] = useState(false);
  const handleGenerate = () => {
    setIsGenerating(true);
    fetchAPI("/workspaces", {
      method: "POST",
      body: JSON.stringify({
        name: "New Workspace",
      }),
    })
      .then((data) => {
        toast.success("Workspace created!");
        console.log(data);
        localStorage.setItem("workspace", JSON.stringify(data));
        setWorkspace(data);
      })
      .catch((error) => {
        console.log("Error during workspace creation", error);
        setIsGenerating(false);
      });
  };

  return (
    <section className="min-h-screen w-full flex justify-center items-center">
      <div className="p-6 lg:p-8 border rounded-lg bg-slate-50 flex flex-col items-center justify-center">
        <NavbarBrand />

        {!havingWorkspace ? (
          <>
            <button
              type="button"
              className="bg-orange-500 rounded-md px-3 py-1 mt-4 text-white hover:bg-orange-500/95"
              onClick={handleGenerate}
            >
              {isGenerating ? "Generating..." : "Generate a Workspace"}
            </button>
            <p className="text-center text-sm mt-2 italic">
              Remember to save the Workspace id
            </p>
          </>
        ) : (
          <>
            <LoginForm setWorkspace={setWorkspace} />
          </>
        )}

        <button
          onClick={() => setHavingWorkspace((prev) => !prev)}
          className="mt-2 py-1 text-sm hover:underline  text-center"
        >
          {havingWorkspace
            ? "Generate a Workspace?"
            : "Already have a Workspace ?"}
        </button>
      </div>
    </section>
  );
};

export default OnBoarding;
