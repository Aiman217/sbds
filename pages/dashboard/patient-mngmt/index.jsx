import Head from "next/head";

export default function index() {
  return (
    <>
      <Head>
        <title>Patient Management</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="h-full w-full p-4 flex flex-col gap-4">
        <h1 className="font-bold text-3xl capitalize mb-4">
          Patient Management
        </h1>
      </div>
    </>
  );
}
