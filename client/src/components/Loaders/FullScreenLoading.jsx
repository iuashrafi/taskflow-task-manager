import { LoaderCircle } from "lucide-react";

const FullScreenLoading = () => {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <span className="animate-spin">
        <LoaderCircle />
      </span>
    </main>
  );
};

export default FullScreenLoading;
