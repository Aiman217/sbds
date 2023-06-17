import Head from "next/head";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import GenderBar from "@/components/dashboard/GenderBar";
import GenderPie from "@/components/dashboard/GenderPie";
import AgeBar from "@/components/dashboard/AgeBar";
import Loading from "@/components/functions/Loading";

export default function index() {
  const supabase = useSupabaseClient();
  const [patientData, setPatientData] = useState([]);
  const [highRiskCount, setHighRiskCount] = useState(0);
  const [lowRiskCount, setLowRiskCount] = useState(0);
  const [notTestedCount, setNotTestedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPatient = async () => {
      const { data } = await supabase
        .from("patient")
        .select("*, result(result)");
      setPatientData(data);
      setHighRiskCount(
        data.filter((c) => c.result?.result == "High Risk").length
      );
      setLowRiskCount(
        data.filter((c) => c.result?.result == "Low Risk").length
      );
      setNotTestedCount(data.filter((c) => c.result == null).length);
      setLoading(false);
    };
    getPatient();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="h-full w-full p-4 flex flex-col gap-4">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl capitalize mb-4">Dashboard</h1>
        </div>
        <div className="card w-full bg-primary text-base-100 shadow-xl">
          <div className="card-body p-2 items-center text-center">
            <h2 className="card-title">Statistics</h2>
            <div className="stats w-full shadow">
              <div className="stat place-items-center">
                <div className="stat-title">Patients</div>
                <div className="stat-value text-secondary">
                  {patientData.length}
                </div>
              </div>
            </div>
            <div className="stats w-full shadow">
              <div className="stat place-items-center">
                <div className="stat-title">High Risk</div>
                <div className="stat-value text-error">{highRiskCount}</div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-title">Low Risk</div>
                <div className="stat-value text-success">{lowRiskCount}</div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-title">Not Tested</div>
                <div className="stat-value text-warning">{notTestedCount}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card w-full bg-primary text-base-100 shadow-xl">
          <div className="card-body p-2 items-center text-center">
            <h2 className="card-title">Data Visualization</h2>
            <div className="card w-full bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <GenderPie data={patientData} />
                <GenderBar data={patientData} />
                <AgeBar data={patientData} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
}
