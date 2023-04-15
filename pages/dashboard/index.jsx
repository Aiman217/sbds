import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const index = ({ session }) => {
  const router = useRouter();

  useEffect(() => {
    !session ? router.push("/login") : [];
  });

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="h-full w-full p-4 flex flex-col gap-4">
        <h1 className="font-bold text-3xl capitalize mb-4">Dashboard</h1>
        <div className="stats shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Patients</div>
            <div className="stat-value text-secondary">31</div>
            <div className="stat-desc">Last Updated on 15/04/2023</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">High Risk Patients</div>
            <div className="stat-value text-error">3</div>
            <div className="stat-desc">Last Updated on 15/04/202</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">New Registers</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
