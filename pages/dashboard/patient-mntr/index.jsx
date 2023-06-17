import Head from "next/head";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AiOutlineClose, AiOutlineEdit, AiOutlineForm } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import CreatePHQ9 from "@/components/dashboard/patient-mntr/CreatePHQ9";
import UpdatePHQ9 from "@/components/dashboard/patient-mntr/UpdatePHQ9";
import CreatePredict from "@/components/dashboard/patient-mntr/CreatePredict";
import Alert from "@/components/functions/Alert";
import Loading from "@/components/functions/Loading";
import EmptyCheck from "@/components/functions/EmptyCheck";

export default function index() {
  const supabase = useSupabaseClient();
  const [patientData, setPatientData] = useState([]);
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
        <title>Patient Monitoring</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="h-full w-full p-4 flex flex-col gap-4">
        <div className="flex flex-row flex-wrap justify-between items-center">
          <div className="flex flex-col">
            <h1 className="font-bold text-3xl capitalize mb-4">
              Patient Monitoring
            </h1>
            <p className="italic text-md mb-4">
              The prediction process required the patient&apos;s PHQ9 form. If
              the prediction button is disabled, please fill in the PHQ9 form
              first before trying again.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full z-0 [&_thead_tr_th]:bg-primary [&_tbody_tr_th]:bg-base-200 [&_tbody_tr_td]:bg-base-200 [&_thead_tr_th]:text-base-100">
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
                        className="btn btn-sm btn-warning gap-2"
                        disabled={!item.phq9 ? "disabled" : ""}
                        onClick={() => {
                          setSelectedPatient(item);
                          setCreatePredictModal(true);
                        }}
                      >
                        <TbReportAnalytics size={20} />
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
      {!EmptyCheck(alert) && (
        <Alert alert={alert} setAlert={setAlert} success={success} />
      )}
      {loading && <Loading />}
    </>
  );
}
