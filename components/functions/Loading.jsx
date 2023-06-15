export default function Loading() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
        <div className="flex flex-row gap-2">
          <h2 className="text-center text-white text-xl font-semibold">
            Loading
          </h2>
          <span className="loading loading-dots loading-md text-white"></span>
        </div>
        <p className="w-1/3 text-center text-white">
          This may take a few seconds, please don&apos;t close this page.
        </p>
      </div>
    </>
  );
}
