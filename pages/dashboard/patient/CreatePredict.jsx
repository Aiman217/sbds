import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import InputConverter from "@/components/functions/InputConverter";

export default function CreatePredict({ selectedPatient }) {
  const supabase = useSupabaseClient();
  const [result, setResult] = useState([]);

  async function getPrediction(id) {
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
      body: JSON.stringify(InputConverter(patient[0])),
    })
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
      });
  }

  return (
    <>
      <div className="form-control">
        <h1 className="text-lg font-bold uppercase text-center mt-4">
          Suicidal Behaviour Prediction
        </h1>
        <div className="divider p-0 m-0"></div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            placeholder={selectedPatient?.name}
            type="text"
            className="input input-disabled input-bordered mb-2"
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Status</span>
          </label>
          {result?.predictions && (
            <i className="mb-4">
              {result?.predictions == "Positive" ? (
                <MdOutlineHealthAndSafety size={30} color="red" />
              ) : (
                <MdOutlineHealthAndSafety size={30} color="green" />
              )}
            </i>
          )}
          <input
            placeholder={result?.predictions}
            type="text"
            className="input input-disabled input-bordered mb-2"
          />
        </div>
        <div className="form-control">
          <button
            onClick={() => {
              getPrediction(selectedPatient?.id);
            }}
            className="btn btn-block btn-success mt-6"
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
}
