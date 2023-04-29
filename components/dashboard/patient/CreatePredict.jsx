import { useState } from "react";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import InputConverter from "@/components/dashboard/patient/InputConverter";
import AlertMsgHndl from "@/components/functions/AlertMsgHndl";

export default function CreatePredict({
  supabase,
  setCreatePredictModal,
  selectedPatient,
  setAlert,
  setSuccess,
  setRefresh,
}) {
  const [predict, setPredict] = useState([]);
  const [algo, setAlgo] = useState("");
  const [loading, setLoading] = useState(false);

  async function getPrediction(id) {
    setLoading(true);
    const { data: patient } = await supabase
      .from("patient")
      .select("*, phq9(*)")
      .eq("id", id);
    await fetch("https://sbds-ml-model.onrender.com").then(() => {
      fetch("https://sbds-ml-model.onrender.com/predict", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(InputConverter(patient[0], algo)),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setPredict(data);
        });
    });
  }

  async function updatePrediction(predict, id) {
    if (!_.isEmpty(predict)) {
      const { error } = await supabase
        .from("result")
        .update([
          {
            patient_id_fk: selectedPatient.id,
            result: predict.prediction,
            algo: predict.algorithm,
            update_at: new Date().toISOString(),
          },
        ])
        .eq("patient_id_fk", id);
      setCreatePredictModal(false);
      AlertMsgHndl(
        "Successfully update patient prediction result!",
        "Failed to update patient prediction result!",
        error,
        setAlert,
        setSuccess,
        setRefresh
      );
    } else {
      const { error } = await supabase
        .from("result")
        .insert([
          {
            patient_id_fk: selectedPatient.id,
            result: predict.predictions,
            algo: predict.algorithm,
          },
        ])
        .eq("patient_id_fk", id);
      setCreatePredictModal(false);
      AlertMsgHndl(
        "Successfully add patient prediction result!",
        "Failed to add patient prediction result!",
        error,
        setAlert,
        setSuccess,
        setRefresh
      );
    }
  }

  return (
    <>
      <div className="form-control">
        <h1 className="text-lg font-bold uppercase text-center mt-4">
          Suicidal Behaviour Prediction
        </h1>
        <div className="divider p-0 m-0"></div>
        <p className="text-base text-center">
          Prediction process might take some time. Please wait patiently.
        </p>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            placeholder={selectedPatient?.name}
            type="text"
            className="input input-bordered mb-2"
            disabled
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Latest Algorithm Used</span>
          </label>
          <input
            placeholder={selectedPatient?.result?.algo || "No Prediction Saved"}
            type="text"
            className="input input-bordered mb-2"
            disabled
          />
        </div>
        <div className="flex flex-wrap gap-4 justify-around">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Latest Status</span>
            </label>
            <input
              placeholder={
                selectedPatient?.result?.result || "No Prediction Saved"
              }
              type="text"
              className="input input-bordered mb-2"
              disabled
            />
          </div>
          <div className="flex flex-col justify-center">
            {selectedPatient?.result?.result == "High Risk" ? (
              <MdOutlineHealthAndSafety size={40} color="red" />
            ) : selectedPatient?.result?.result == "Low Risk" ? (
              <MdOutlineHealthAndSafety size={40} color="green" />
            ) : (
              <MdOutlineHealthAndSafety size={40} color="grey" />
            )}
          </div>
        </div>
        <div className="divider p-0 m-0"></div>
        <div className="flex flex-wrap gap-4 justify-around">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Choose Algorithm</span>
            </label>
            <select
              className="select select-bordered mb-2"
              onChange={(event) => {
                setAlgo(event.target.value);
              }}
              defaultValue=""
            >
              <option value="" disabled>
                Pick algorithms
              </option>
              <option value="dtree">Decision Tree (More Sensitive)</option>
              <option value="nb">Naive Bayes (Less Sensitive)</option>
            </select>
          </div>
          <div className="form-control justify-center">
            <button
              onClick={() => {
                getPrediction(selectedPatient?.id);
              }}
              className={
                "btn btn-success " + (loading ? "loading btn-circle" : "")
              }
            >
              {!loading ? "Predict" : ""}
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-around">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Prediction Result</span>
            </label>
            <input
              placeholder={predict?.prediction || "Make Prediction"}
              type="text"
              className="input input-bordered mb-2"
              disabled
            />
          </div>
          <div className="flex flex-col justify-center">
            {predict?.prediction == "High Risk" ? (
              <MdOutlineHealthAndSafety size={40} color="red" />
            ) : predict?.prediction == "Low Risk" ? (
              <MdOutlineHealthAndSafety size={40} color="green" />
            ) : (
              <MdOutlineHealthAndSafety size={40} color="grey" />
            )}
          </div>
        </div>
        <div className="form-control">
          <button
            onClick={() => {
              updatePrediction(predict, selectedPatient?.id);
            }}
            className="btn btn-block btn-success mt-6"
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
}
