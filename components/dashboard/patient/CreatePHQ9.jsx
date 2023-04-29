import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import _ from "lodash";
import AlertMsgHndl from "@/components/functions/AlertMsgHndl";

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

  const phq9Input = [
    {
      name: "Little interest or pleasure in doing things",
      function: setLittleInterest,
    },
    {
      name: "Feeling down, depressed or hopeless",
      function: setFeelingDown,
    },
    {
      name: "Trouble falling / staying asleep, sleeping too much",
      function: setSleepingTrouble,
    },
    {
      name: "Feeling tired or having little energy",
      function: setFeelingTired,
    },
    {
      name: "Poor appetite or over eating",
      function: setPoorAppetite,
    },
    {
      name: "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
      function: setFeelingBad,
    },
    {
      name: "Trouble concentrating on things, such as reading the newspaper or watching television",
      function: setTroubleConcentrating,
    },
    {
      name: "Moving or speaking so slowly that other people could have noticed or being so fidgety or restless that you have been moving around a lot more than usual",
      function: setMovingSlowly,
    },
    {
      name: "Thoughts that you would be better off dead or of hurting yourself in some way",
      function: setThoughtsSelfHarm,
    },
  ];

  function formEmpty() {
    return (
      _.isEmpty(littleInterest) ||
      _.isEmpty(feelingDown) ||
      _.isEmpty(sleepingTrouble) ||
      _.isEmpty(feelingTired) ||
      _.isEmpty(poorAppetite) ||
      _.isEmpty(feelingBad) ||
      _.isEmpty(troubleConcentrating) ||
      _.isEmpty(movingSlowly) ||
      _.isEmpty(thoughtsSelfHarm)
    );
  }

  async function createPHQ9() {
    const { error } = await supabase.from("phq9").insert([
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
      },
    ]);
    setCreatePHQ9Modal(false);
    AlertMsgHndl(
      "Successfully add new patient phq9 questions!",
      "Failed to add patient phq9 questions!",
      error,
      setAlert,
      setSuccess,
      setRefresh
    );
  }

  return (
    <>
      <div className="form-control">
        <h1 className="text-lg font-bold uppercase text-center mt-4">
          Fill in PHQ9 Form for Patient
        </h1>
        <div className="divider p-0 m-0"></div>
        <div className="form-control w-full">
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
                Pick related option
              </option>
              <option value={0}>Not at all</option>
              <option value={1}>Several days</option>
              <option value={2}>More than half the days</option>
              <option value={3}>Nearly everyday</option>
            </select>
          </div>
        ))}
        <div className="form-control">
          <button
            onClick={createPHQ9}
            className={
              "btn btn-block btn-success mt-6 " +
              (formEmpty() ? "btn-disabled" : "")
            }
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
