import { useState } from "react";

const DropSpace = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <section
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={() => {
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={`${
        showDrop
          ? "px-1 py-5 opacity-100 diagonal-lines rounded-lg"
          : "opacity-0  px-1 py-1.5 "
      }`}
    ></section>
  );
};

export default DropSpace;
