import Head from "next/head";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AiOutlineClose, AiOutlineEdit, AiOutlineForm } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import CreatePatient from "@/components/dashboard/patient/CreatePatient";
import Alert from "@/components/functions/Alert";
import Loading from "@/components/functions/Loading";
import CreatePHQ9 from "@/components/dashboard/patient/CreatePHQ9";
import CreatePredict from "@/components/dashboard/patient/CreatePredict";
import DeletePatient from "@/components/dashboard/patient/DeletePatient";
import UpdatePHQ9 from "@/components/dashboard/patient/UpdatePHQ9";
import EmptyCheck from "@/components/functions/EmptyCheck";

export default function index() {
  const supabase = useSupabaseClient();
  const [patientData, setPatientData] = useState([]);
  const [createPatientModal, setCreatePatientModal] = useState(false);
  const [deletePatientModal, setDeletePatientModal] = useState(false);
  const [PHQ9Modal, setPHQ9Modal] = useState(false);
  const [createPredictModal, setCreatePredictModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState([]);
  const [alert, setAlert] = useState("");
  const [success, setSuccess] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPatient = async () => {
      const { data: patient } = await supabase
        .from("patient")
        .select(
          "id, name, age, gender, religion, phq9(*), result(algo, result)"
        );
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
                <th>Status</th>
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
                    <>
                      {item?.result?.result == "High Risk" ? (
                        <MdOutlineHealthAndSafety size={40} color="red" />
                      ) : item?.result?.result == "Low Risk" ? (
                        <MdOutlineHealthAndSafety size={40} color="green" />
                      ) : (
                        <MdOutlineHealthAndSafety size={40} color="grey" />
                      )}
                    </>
                  </td>
                  <td>
                    <div
                      className="tooltip tooltip-left uppercase font-bold"
                      data-tip="Make Prediction"
                    >
                      <label
                        htmlFor="my-modal-create-predict"
                        className={
                          "btn btn-sm gap-2 " +
                          (item.phq9 ? "" : "btn-disabled")
                        }
                        onClick={() => {
                          setSelectedPatient(item), setCreatePredictModal(true);
                        }}
                      >
                        <TbReportAnalytics size={20} />
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-4">
                      <div
                        className="tooltip tooltip-left uppercase font-bold"
                        data-tip="Create/Update PHQ9"
                      >
                        <label
                          htmlFor="my-modal-create-phq9"
                          className="btn btn-sm btn-info gap-2"
                          onClick={() => {
                            setSelectedPatient(item), setPHQ9Modal(true);
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
                      </div>
                      <div
                        className="tooltip tooltip-left uppercase font-bold"
                        data-tip="Delete Patient"
                      >
                        <label
                          htmlFor="my-modal-delete-patient"
                          className="btn btn-sm btn-error btn-circle gap-2"
                          onClick={() => {
                            setSelectedPatient(item),
                              setDeletePatientModal(true);
                          }}
                        >
                          <AiOutlineClose size={20} />
                        </label>
                      </div>
                    </div>
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
                supabase={supabase}
                setCreatePatientModal={setCreatePatientModal}
                setAlert={setAlert}
                setSuccess={setSuccess}
                setRefresh={setRefresh}
              />
            </div>
          </div>
        </div>
      )}
      {PHQ9Modal && (
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
                onClick={() => setPHQ9Modal(false)}
              >
                <AiOutlineClose size={20} />
              </label>
              {!EmptyCheck(selectedPatient?.phq9) ? (
                <UpdatePHQ9
                  supabase={supabase}
                  setPHQ9Modal={setPHQ9Modal}
                  selectedPatient={selectedPatient}
                  setAlert={setAlert}
                  setSuccess={setSuccess}
                  setRefresh={setRefresh}
                />
              ) : (
                <CreatePHQ9
                  supabase={supabase}
                  setPHQ9Modal={setPHQ9Modal}
                  selectedPatient={selectedPatient}
                  setAlert={setAlert}
                  setSuccess={setSuccess}
                  setRefresh={setRefresh}
                />
              )}
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
                supabase={supabase}
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
      {deletePatientModal && (
        <div>
          <input
            type="checkbox"
            id="my-modal-delete-patient"
            className="modal-toggle"
          />
          <div className="modal w-full">
            <div className="modal-box w-[90%] sm:w-[80%]">
              <label
                htmlFor="my-modal-delete-patient"
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setDeletePatientModal(false)}
              >
                <AiOutlineClose size={20} />
              </label>
              <DeletePatient
                supabase={supabase}
                setDeletePatientModal={setDeletePatientModal}
                selectedPatient={selectedPatient}
                setAlert={setAlert}
                setSuccess={setSuccess}
                setRefresh={setRefresh}
              />
            </div>
          </div>
        </div>
      )}
      {!EmptyCheck(alert) && (
        <Alert alert={alert} setAlert={setAlert} success={success} />
      )}
      {loading && <Loading />}
    </>
  );
}
