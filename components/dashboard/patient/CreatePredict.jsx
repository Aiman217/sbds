import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import InputConverter from "@/components/dashboard/patient/InputConverter";

export default function CreatePredict({
  setCreatePredictModal,
  selectedPatient,
  setAlert,
  setSuccess,
  setRefresh,
}) {
  const supabase = useSupabaseClient();
  const [result, setResult] = useState([]);
  const [predict, setPredict] = useState([]);
  const [algo, setAlgo] = useState("");
  const [loading, setLoading] = useState(false);

  async function getPrediction(id) {
    setLoading(true);
    const { data: patient, error } = await supabase
      .from("patient")
      .select("*, phq9(*)")
      .eq("id", id);
    await fetch("https://sbds-ml-model.onrender.com/predict", {
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
  }

  async function updatePrediction(result, id) {
    if (!_.isEmpty(result)) {
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
      error
        ? (setAlert("Failed to update patient prediction result!"),
          setSuccess(false),
          setTimeout(() => {
            setAlert("");
            setSuccess(false);
          }, 4000))
        : (setAlert("Successfully update patient prediction result!"),
          setSuccess(true),
          setRefresh(true),
          setTimeout(() => {
            setAlert("");
            setSuccess(false);
          }, 4000));
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
      error
        ? (setAlert("Failed to add patient prediction result!"),
          setSuccess(false),
          setTimeout(() => {
            setAlert("");
            setSuccess(false);
          }, 4000))
        : (setAlert("Successfully add patient prediction result!"),
          setSuccess(true),
          setRefresh(true),
          setTimeout(() => {
            setAlert("");
            setSuccess(false);
          }, 4000));
    }
  }

  useEffect(() => {
    const getResult = async () => {
      const { data: check } = await supabase
        .from("result")
        .select("*")
        .eq("patient_id_fk", selectedPatient?.id);
      setResult(check[0]);
    };
    getResult();
  }, []);

  return (
    <>
      <div className="form-control">
        <h1 className="text-lg font-bold uppercase text-center mt-4">
          Suicidal Behaviour Prediction
        </h1>
        <div className="divider p-0 m-0"></div>
        <p className="text-base">
          Prediction process might take some time. Please wait patiently.
        </p>
        <div className="form-control flex-1">
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
        <div className="flex flex-row gap-4 justify-around">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Latest Status</span>
            </label>
            <input
              placeholder={result?.result || "No Prediction Saved"}
              type="text"
              className="input input-bordered mb-2"
              disabled
            />
          </div>
          <div className="flex flex-col justify-center">
            {result?.result == "High Risk" ? (
              <MdOutlineHealthAndSafety size={40} color="red" />
            ) : result?.result == "Low Risk" ? (
              <MdOutlineHealthAndSafety size={40} color="green" />
            ) : (
              <MdOutlineHealthAndSafety size={40} color="grey" />
            )}
          </div>
        </div>
        <div className="divider p-0 m-0"></div>
        <div className="flex flex-row gap-4 justify-around">
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
              className={"btn btn-success " + (loading ? "loading" : "")}
            >
              {!loading ? "Predict" : ""}
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-around">
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
              updatePrediction(result, selectedPatient?.id);
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
