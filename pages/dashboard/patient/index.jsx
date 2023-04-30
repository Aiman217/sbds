import Head from "next/head";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AiOutlineClose, AiOutlineEdit, AiOutlineForm } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import CreatePatient from "@/components/dashboard/patient/CreatePatient";
import UpdatePatient from "@/components/dashboard/patient/UpdatePatient";
import DeletePatient from "@/components/dashboard/patient/DeletePatient";
import CreatePHQ9 from "@/components/dashboard/patient/CreatePHQ9";
import UpdatePHQ9 from "@/components/dashboard/patient/UpdatePHQ9";
import CreatePredict from "@/components/dashboard/patient/CreatePredict";
import Alert from "@/components/functions/Alert";
import Loading from "@/components/functions/Loading";
import EmptyCheck from "@/components/functions/EmptyCheck";

export default function index() {
  const supabase = useSupabaseClient();
  const [patientData, setPatientData] = useState([]);
  const [createPatientModal, setCreatePatientModal] = useState(false);
  const [updatePatientModal, setUpdatePatientModal] = useState(false);
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
        .select("*, phq9(*), result(algo, result)")
        .order("name");
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
          <div className="flex flex-col">
            <h1 className="font-bold text-3xl capitalize mb-4">Patient</h1>
            <p className="text-md mb-4">
              The prediction process required the patient&apos;s PHQ9 form. If
              the prediction button is disabled, please fill in the PHQ9 Form
              first before trying again.
            </p>
          </div>
          <label
            htmlFor="my-modal-create-patient"
            className="btn btn-sm btn-success gap-2 modal-button"
            onClick={() => {
              setCreatePatientModal(true);
            }}
          >
            Add Patient
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full z-0 [&_thead_tr_th]:bg-primary [&_thead_tr_th]:text-base-100">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Religion</th>
                <th>Status</th>
                <th>PHQ9</th>
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
                      data-tip={item.phq9 ? "Update PHQ9" : "Create PHQ9"}
                    >
                      <label
                        htmlFor="my-modal-action-phq9"
                        className={
                          "btn btn-sm gap-2 " +
                          (item.phq9 ? "btn-info" : "btn-success")
                        }
                        onClick={() => {
                          setSelectedPatient(item);
                          setPHQ9Modal(true);
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
                  </td>
                  <td>
                    <div
                      className="tooltip tooltip-left uppercase font-bold"
                      data-tip="Make Prediction"
                    >
                      <label
                        htmlFor="my-modal-create-predict"
                        className={
                          "btn btn-sm btn-warning gap-2 " +
                          (item.phq9 ? "" : "btn-disabled")
                        }
                        onClick={() => {
                          setSelectedPatient(item);
                          setCreatePredictModal(true);
                        }}
                      >
                        <TbReportAnalytics size={20} />
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-4">
                      <div
                        className="tooltip tooltip-left uppercase font-bold"
                        data-tip="Update Patient"
                      >
                        <label
                          htmlFor="my-modal-update-patient"
                          className="btn btn-sm btn-info gap-2"
                          onClick={() => {
                            setSelectedPatient(item);
                            setUpdatePatientModal(true);
                          }}
                        >
                          <AiOutlineEdit size={20} />
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
                            setSelectedPatient(item);
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
      {updatePatientModal && (
        <div>
          <input
            type="checkbox"
            id="my-modal-update-patient"
            className="modal-toggle"
          />
          <div className="modal w-full">
            <div className="modal-box w-[90%] sm:w-[80%]">
              <label
                htmlFor="my-modal-update-patient"
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setUpdatePatientModal(false)}
              >
                <AiOutlineClose size={20} />
              </label>
              <UpdatePatient
                supabase={supabase}
                setUpdatePatientModal={setUpdatePatientModal}
                selectedPatient={selectedPatient}
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
            id="my-modal-action-phq9"
            className="modal-toggle"
          />
          <div className="modal w-full">
            <div className="modal-box w-[90%] sm:w-[80%]">
              <label
                htmlFor="my-modal-action-phq9"
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
