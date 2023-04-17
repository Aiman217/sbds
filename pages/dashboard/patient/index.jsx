import Head from "next/head";
import _ from "lodash";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AiOutlineClose, AiOutlinePlusCircle } from "react-icons/ai";
import CreatePatient from "./CreatePatient";
import Alert from "@/components/functions/Alert";
import Loading from "@/components/functions/Loading";

export default function index() {
  const supabase = useSupabaseClient();
  const [patientData, setPatientData] = useState([]);
  const [createPatientModal, setCreatePatientModal] = useState(false);
  const [alert, setAlert] = useState("");
  const [success, setSuccess] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPatient = async () => {
      const { data: patient, error } = await supabase
        .from("patient")
        .select("*");
      setPatientData(patient);
      setRefresh(false);
      setLoading(false);
    };
    getPatient();
  }, [refresh]);

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
                setCreatePatientModal(true);
              }}
            >
              <AiOutlinePlusCircle size={25} />
            </label>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full z-0">
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
      {createPatientModal && (
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
                onClick={() => setCreatePatientModal(false)}
              >
                <AiOutlineClose size={20} />
              </label>
              <CreatePatient
                setCreatePatientModal={setCreatePatientModal}
                setAlert={setAlert}
                setSuccess={setSuccess}
                setRefresh={setRefresh}
              />
            </div>
          </div>
        </div>
      )}
      {!_.isEmpty(alert) && (
        <Alert alert={alert} setAlert={setAlert} success={success} />
      )}
      {loading && <Loading />}
    </>
  );
}
