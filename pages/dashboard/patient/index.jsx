import Head from "next/head";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AiOutlineClose, AiOutlinePlusCircle } from "react-icons/ai";
import CreatePatient from "./CreatePatient";
import Loading from "@/components/Loading";

export default function index() {
  const supabase = useSupabaseClient();
  const [patientData, setPatientData] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPatient = async () => {
      const { data: patient, error } = await supabase
        .from("patient")
        .select("*");
      setPatientData(patient);
      setLoading(false);
    };
    getPatient();
  }, []);

  return (
    <>
      <Head>
        <title>Patient</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="h-full w-full p-4 flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-bold text-3xl capitalize mb-4">Patient</h1>
          <div className="tooltip tooltip-left" data-tip="Add new patient">
            <label
              htmlFor="my-modal-create"
              className="btn btn-sm btn-ghost modal-button cursor-pointer"
              onClick={() => {
                setCreateModal(true);
              }}
            >
              <AiOutlinePlusCircle size={25} />
            </label>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {patientData.map((item, index) => (
                <tr key={index}>
                  <th>{++index}</th>
                  <td>{item.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {createModal && (
        <div>
          <input
            type="checkbox"
            id="my-modal-create"
            className="modal-toggle"
          />
          <div className="modal w-full">
            <div className="modal-box w-[90%] sm:w-[80%]">
              <label
                htmlFor="my-modal-create"
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setCreateModal(false)}
              >
                <AiOutlineClose size={20} />
              </label>
              <CreatePatient />
            </div>
          </div>
        </div>
      )}
      {loading && <Loading />}
    </>
  );
}
