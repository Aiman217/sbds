import { AiOutlineReload } from "react-icons/ai";

export default function Loading() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
        <AiOutlineReload className="animate-spin text-white" size={40} />
        <h2 className="text-center text-white text-xl font-semibold">
          Loading...
        </h2>
        <p className="w-1/3 text-center text-white">
          This may take a few seconds, please don&apos;t close this page.
        </p>
      </div>
    </>
  );
}
