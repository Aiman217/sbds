import Head from "next/head";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Loading from "@/components/functions/Loading";

export default function index() {
  const supabase = useSupabaseClient();
  const [patientCount, setPatientCount] = useState(0);
  const [highRiskCount, setHighRiskCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPatientCount = async () => {
      const { count, error } = await supabase
        .from("patient")
        .select("*", { count: "exact", head: true });
      setPatientCount(count);
    };
    const getHighRiskCount = async () => {
      const { count, error } = await supabase
        .from("result")
        .select("*", { count: "exact", head: true })
        .eq("result", "Positive");
      setHighRiskCount(count);
      setLoading(false);
    };
    getPatientCount();
    getHighRiskCount();
  }, []);

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
            <div className="stat-value text-secondary">{patientCount}</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">High Risk Patients</div>
            <div className="stat-value text-error">{highRiskCount}</div>
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
}
