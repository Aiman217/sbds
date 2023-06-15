import { useState } from "react";
import AlertMsgHndl from "@/components/functions/AlertMsgHndl";
import EmptyCheck from "@/components/functions/EmptyCheck";

export default function UpdatePHQ9({
  supabase,
  setPHQ9Modal,
  selectedPatient,
  setAlert,
  setSuccess,
  setRefresh,
}) {
  const [littleInterest, setLittleInterest] = useState(
    selectedPatient?.phq9?.little_interest
  );
  const [feelingDown, setFeelingDown] = useState(
    selectedPatient?.phq9?.feeling_down
  );
  const [sleepingTrouble, setSleepingTrouble] = useState(
    selectedPatient?.phq9?.sleeping_trouble
  );
  const [feelingTired, setFeelingTired] = useState(
    selectedPatient?.phq9?.feeling_tired
  );
  const [poorAppetite, setPoorAppetite] = useState(
    selectedPatient?.phq9?.poor_appetite
  );
  const [feelingBad, setFeelingBad] = useState(
    selectedPatient?.phq9?.feeling_bad
  );
  const [troubleConcentrating, setTroubleConcentrating] = useState(
    selectedPatient?.phq9?.trouble_concentrating
  );
  const [movingSlowly, setMovingSlowly] = useState(
    selectedPatient?.phq9?.moving_slowly
  );
  const [thoughtsSelfHarm, setThoughtsSelfHarm] = useState(
    selectedPatient?.phq9?.thoughts_self_harm
  );

  const phq9Input = [
    {
      name: "Little interest or pleasure in doing things",
      input: "little_interest",
      function: setLittleInterest,
    },
    {
      name: "Feeling down, depressed or hopeless",
      input: "feeling_down",
      function: setFeelingDown,
    },
    {
      name: "Trouble falling / staying asleep, sleeping too much",
      input: "sleeping_trouble",
      function: setSleepingTrouble,
    },
    {
      name: "Feeling tired or having little energy",
      input: "feeling_tired",
      function: setFeelingTired,
    },
    {
      name: "Poor appetite or over eating",
      input: "poor_appetite",
      function: setPoorAppetite,
    },
    {
      name: "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
      input: "feeling_bad",
      function: setFeelingBad,
    },
    {
      name: "Trouble concentrating on things, such as reading the newspaper or watching television",
      input: "trouble_concentrating",
      function: setTroubleConcentrating,
    },
    {
      name: "Moving or speaking so slowly that other people could have noticed or being so fidgety or restless that you have been moving around a lot more than usual",
      input: "moving_slowly",
      function: setMovingSlowly,
    },
    {
      name: "Thoughts that you would be better off dead or of hurting yourself in some way",
      input: "thoughts_self_harm",
      function: setThoughtsSelfHarm,
    },
  ];

  function formEmpty() {
    return (
      EmptyCheck(littleInterest) ||
      EmptyCheck(feelingDown) ||
      EmptyCheck(sleepingTrouble) ||
      EmptyCheck(feelingTired) ||
      EmptyCheck(poorAppetite) ||
      EmptyCheck(feelingBad) ||
      EmptyCheck(troubleConcentrating) ||
      EmptyCheck(movingSlowly) ||
      EmptyCheck(thoughtsSelfHarm)
    );
  }

  async function updatePHQ9() {
    const { error } = await supabase
      .from("phq9")
      .update([
        {
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
      ])
      .eq("patient_id_fk", selectedPatient.id);
    setPHQ9Modal(false);
    AlertMsgHndl(
      "Successfully update patient phq9 form!",
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
          Update PHQ9 Form
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
              defaultValue={selectedPatient?.phq9[item.input]}
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
            onClick={updatePHQ9}
            className="btn btn-block btn-info mt-6"
            disabled={formEmpty() ? "disabled" : ""}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
}
