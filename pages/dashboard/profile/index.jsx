import Head from "next/head";

export default function index() {
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="h-full w-full p-4 flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <h1 className="font-bold text-3xl capitalize mb-4">Profile</h1>
            <p className="text-md mb-4">Update your profile.</p>
          </div>
        </div>
      </div>
    </>
  );
}
