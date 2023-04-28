import Head from "next/head";
import _ from "lodash";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  AiOutlineClose,
  AiOutlineEdit,
  AiOutlineForm,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import CreatePatient from "../../../components/dashboard/patient/CreatePatient";
import Alert from "@/components/functions/Alert";
import Loading from "@/components/functions/Loading";
import CreatePHQ9 from "../../../components/dashboard/patient/CreatePHQ9";
import CreatePredict from "../../../components/dashboard/patient/CreatePredict";

export default function index() {
  const supabase = useSupabaseClient();
  const [patientData, setPatientData] = useState([]);
  const [createPatientModal, setCreatePatientModal] = useState(false);
  const [createPHQ9Modal, setCreatePHQ9Modal] = useState(false);
  const [createPredictModal, setCreatePredictModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState([]);
  const [alert, setAlert] = useState("");
  const [success, setSuccess] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPatient = async () => {
      const { data: patient, error } = await supabase
        .from("patient")
        .select("*, phq9(*)");
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
          <label
            htmlFor="my-modal-create-patient"
            className="btn btn-sm gap-2 modal-button"
            onClick={() => {
              setCreatePatientModal(true);
            }}
          >
            <AiOutlinePlusSquare size={25} />
            Add Patient
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full z-0">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Religion</th>
                <th>Predict</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patientData.map((item, index) => (
                <tr key={index}>
                  <th>{++index}</th>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                  <td>{item.religion}</td>
                  <td>
                    <label
                      htmlFor="my-modal-create-predict"
                      className={
                        "btn btn-sm gap-2 " + (item.phq9 ? "" : "btn-disabled")
                      }
                      onClick={() => {
                        setSelectedPatient(item), setCreatePredictModal(true);
                      }}
                    >
                      <TbReportAnalytics size={20} />
                    </label>
                  </td>
                  <td>
                    <label
                      htmlFor="my-modal-create-phq9"
                      className="btn btn-sm gap-2"
                      onClick={() => {
                        setSelectedPatient(item), setCreatePHQ9Modal(true);
                      }}
                    >
                      {item.phq9 ? (
                        <>
                          <AiOutlineEdit size={20} />
                        </>
                      ) : (
                        <>
                          <AiOutlineForm size={20} />
                        </>
                      )}
                    </label>
                  </td>
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
            id="my-modal-create-patient"
            className="modal-toggle"
          />
          <div className="modal w-full">
            <div className="modal-box w-[90%] sm:w-[80%]">
              <label
                htmlFor="my-modal-create-patient"
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
      {createPHQ9Modal && (
        <div>
          <input
            type="checkbox"
            id="my-modal-create-phq9"
            className="modal-toggle"
          />
          <div className="modal w-full">
            <div className="modal-box w-[90%] sm:w-[80%]">
              <label
                htmlFor="my-modal-create-phq9"
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setCreatePHQ9Modal(false)}
              >
                <AiOutlineClose size={20} />
              </label>
              <CreatePHQ9
                setCreatePHQ9Modal={setCreatePHQ9Modal}
                selectedPatient={selectedPatient}
                setAlert={setAlert}
                setSuccess={setSuccess}
                setRefresh={setRefresh}
              />
            </div>
          </div>
        </div>
      )}
      {createPredictModal && (
        <div>
          <input
            type="checkbox"
            id="my-modal-create-predict"
            className="modal-toggle"
          />
          <div className="modal w-full">
            <div className="modal-box w-[90%] sm:w-[80%]">
              <label
                htmlFor="my-modal-create-predict"
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setCreatePredictModal(false)}
              >
                <AiOutlineClose size={20} />
              </label>
              <CreatePredict
                setCreatePredictModal={setCreatePredictModal}
                selectedPatient={selectedPatient}
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
