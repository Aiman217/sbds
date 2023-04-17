import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import _ from "lodash";

export default function CreatePHQ9({
  setCreatePHQ9Modal,
  selectedPatient,
  setAlert,
  setSuccess,
  setRefresh,
}) {
  const supabase = useSupabaseClient();
  const [littleInterest, setLittleInterest] = useState("");
  const [feelingDown, setFeelingDown] = useState("");
  const [sleepingTrouble, setSleepingTrouble] = useState("");
  const [feelingTired, setFeelingTired] = useState("");
  const [poorAppetite, setPoorAppetite] = useState("");
  const [feelingBad, setFeelingBad] = useState("");
  const [troubleConcentrating, setTroubleConcentrating] = useState("");
  const [movingSlowly, setMovingSlowly] = useState("");
  const [thoughtsSelfHarm, setThoughtsSelfHarm] = useState("");
  const [hasDepressiveDisorder, setHasDepressiveDisorder] = useState("");
  const [pastPsychiatricDisorder, setPastPsychiatricDisorder] = useState("");
  const [pastSuicidalAttempt, setPastSuicidalAttempt] = useState("");
  const [medicalComorbidity, setMedicalComorbidity] = useState("");

  const phq9Input = [
    {
      name: "Little Interest",
      function: setLittleInterest,
    },
    {
      name: "Feeling Down",
      function: setFeelingDown,
    },
    {
      name: "Sleeping Trouble",
      function: setSleepingTrouble,
    },
    {
      name: "Feeling Tired",
      function: setFeelingTired,
    },
    {
      name: "Poor Appetite",
      function: setPoorAppetite,
    },
    {
      name: "Feeling Bad",
      function: setFeelingBad,
    },
    {
      name: "Trouble Concentrating",
      function: setTroubleConcentrating,
    },
    {
      name: "Moving Slowly",
      function: setMovingSlowly,
    },
    {
      name: "Thoughts Self Harm",
      function: setThoughtsSelfHarm,
    },
    {
      name: "Has Depressive Disorder",
      function: setHasDepressiveDisorder,
    },
    {
      name: "Past Psychiatric Disorder",
      function: setPastPsychiatricDisorder,
    },
    {
      name: "Past Suicidal Attempt",
      function: setPastSuicidalAttempt,
    },
    {
      name: "Medical Comorbidity",
      function: setMedicalComorbidity,
    },
  ];

  async function createPHQ9() {
    const { data, error } = await supabase.from("phq9").insert([
      {
        patient_id_fk: selectedPatient.id,
        little_interest: littleInterest,
        feeling_down: feelingDown,
        sleeping_trouble: sleepingTrouble,
        feeling_tired: feelingTired,
        poor_appetite: poorAppetite,
        feeling_bad: feelingBad,
        trouble_concentrating: troubleConcentrating,
        moving_slowly: movingSlowly,
        thoughts_self_harm: thoughtsSelfHarm,
        has_depressive_disorder: hasDepressiveDisorder,
        past_psychiatric_disorder: pastPsychiatricDisorder,
        past_suicidal_attempt: pastSuicidalAttempt,
        medical_comorbidity: medicalComorbidity,
      },
    ]);
    setCreatePHQ9Modal(false);
    error
      ? (setAlert("Failed to add patient phq9 questions!"),
        setSuccess(false),
        setTimeout(() => {
          setAlert("");
          setSuccess(false);
        }, 4000))
      : (setAlert("Successfully add new patient phq9 questions!"),
        setSuccess(true),
        setRefresh(true),
        setTimeout(() => {
          setAlert("");
          setSuccess(false);
        }, 4000));
  }

  return (
    <>
      <div className="form-control">
        <h1 className="text-lg font-bold uppercase text-center mt-4">
          Create PHQ9 for Patient
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
        {phq9Input.map((item, index) => (
          <div key={index + "phq9"} className="form-control w-full">
            <label className="label">
              <span className="label-text">{item.name}</span>
            </label>
            <select
              className="select select-bordered mb-2"
              onChange={(event) => {
                item.function(event.target.value);
              }}
              defaultValue=""
            >
              <option value="" disabled>
                Pick level
              </option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
        ))}
        <div className="form-control">
          <button
            onClick={createPHQ9}
            className={
              "btn btn-block btn-success mt-6 " + (false ? "btn-disabled" : "")
            }
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
}
