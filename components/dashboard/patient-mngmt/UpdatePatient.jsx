import { useState } from "react";
import AlertMsgHndl from "@/components/functions/AlertMsgHndl";
import EmptyCheck from "@/components/functions/EmptyCheck";

export default function UpdatePatient({
  supabase,
  setUpdatePatientModal,
  selectedPatient,
  setAlert,
  setSuccess,
  setRefresh,
}) {
  const [name, setName] = useState(selectedPatient?.name);
  const [age, setAge] = useState(selectedPatient?.age);
  const [gender, setGender] = useState(selectedPatient?.gender);
  const [ethnicity, setEthnicity] = useState(selectedPatient?.ethnicity);
  const [religion, setReligion] = useState(selectedPatient?.religion);
  const [marital_status, setMaritalStatus] = useState(
    selectedPatient?.marital_status
  );
  const [employment, setEmployment] = useState(selectedPatient?.employment);
  const [hasDepressiveDisorder, setHasDepressiveDisorder] = useState(
    selectedPatient?.has_depressive_disorder
  );
  const [pastPsychiatricDisorder, setPastPsychiatricDisorder] = useState(
    selectedPatient?.past_psychiatric_disorder
  );
  const [pastSuicidalAttempt, setPastSuicidalAttempt] = useState(
    selectedPatient?.past_suicidal_attempt
  );
  const [medicalComorbidity, setMedicalComorbidity] = useState(
    selectedPatient?.medical_comorbidity
  );

  const medical_input = [
    {
      name: "Depressive Disorder",
      input: "has_depressive_disorder",
      function: setHasDepressiveDisorder,
    },
    {
      name: "Past Psychiatric Treatment",
      input: "past_psychiatric_disorder",
      function: setPastPsychiatricDisorder,
    },
    {
      name: "Past Suicidal Attempt",
      input: "past_suicidal_attempt",
      function: setPastSuicidalAttempt,
    },
    {
      name: "Comorbid Medical Condition",
      input: "medical_comorbidity",
      function: setMedicalComorbidity,
    },
  ];

  function formEmpty() {
    return (
      EmptyCheck(name) ||
      EmptyCheck(age) ||
      EmptyCheck(gender) ||
      EmptyCheck(ethnicity) ||
      EmptyCheck(religion) ||
      EmptyCheck(marital_status) ||
      EmptyCheck(employment) ||
      EmptyCheck(hasDepressiveDisorder) ||
      EmptyCheck(pastPsychiatricDisorder) ||
      EmptyCheck(pastSuicidalAttempt) ||
      EmptyCheck(medicalComorbidity)
    );
  }

  async function updatePatient() {
    const { error } = await supabase
      .from("patient")
      .update([
        {
          name: name,
          age: age,
          gender: gender,
          ethnicity: ethnicity,
          religion: religion,
          marital_status: marital_status,
          employment: employment,
          has_depressive_disorder: hasDepressiveDisorder,
          past_psychiatric_disorder: pastPsychiatricDisorder,
          past_suicidal_attempt: pastSuicidalAttempt,
          medical_comorbidity: medicalComorbidity,
        },
      ])
      .eq("id", selectedPatient.id);
    setUpdatePatientModal(false);
    AlertMsgHndl(
      "Successfully update patient!",
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
          Update Patient
        </h1>
        <div className="divider p-0 m-0"></div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            onChange={(event) => {
              setName(event.target.value);
            }}
            type="text"
            value={name}
            className="input input-bordered mb-2"
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Age</span>
          </label>
          <input
            onChange={(event) => {
              setAge(event.target.value);
            }}
            type="number"
            value={age}
            className="input input-bordered mb-2"
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Gender</span>
          </label>
          <select
            className="select select-bordered mb-2"
            onChange={(event) => {
              setGender(event.target.value);
            }}
            defaultValue={gender}
          >
            <option value="" disabled>
              Pick gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Ethnicity</span>
          </label>
          <select
            className="select select-bordered mb-2"
            onChange={(event) => {
              setEthnicity(event.target.value);
            }}
            defaultValue={ethnicity}
          >
            <option value="" disabled>
              Pick ethnicity
            </option>
            <option value="Malay">Malay</option>
            <option value="Chinese">Chinese</option>
            <option value="Indian">Indian</option>
          </select>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Religion</span>
          </label>
          <select
            className="select select-bordered mb-2"
            onChange={(event) => {
              setReligion(event.target.value);
            }}
            defaultValue={religion}
          >
            <option value="" disabled>
              Pick religion
            </option>
            <option value="Islam">Islam</option>
            <option value="Buddhist">Buddhist</option>
            <option value="Christian">Christian</option>
            <option value="Hindu">Hindu</option>
          </select>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Marital Status</span>
          </label>
          <select
            className="select select-bordered mb-2"
            onChange={(event) => {
              setMaritalStatus(event.target.value);
            }}
            defaultValue={marital_status}
          >
            <option value="" disabled>
              Pick marital status
            </option>
            <option value="Married">Married</option>
            <option value="Single">Single</option>
            <option value="Divorcee">Divorcee</option>
          </select>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Employment</span>
          </label>
          <select
            className="select select-bordered mb-2"
            onChange={(event) => {
              setEmployment(event.target.value);
            }}
            defaultValue={employment}
          >
            <option value="" disabled>
              Pick employment
            </option>
            <option value="Unemployed">Unemployed</option>
            <option value="Employed">Employed</option>
          </select>
        </div>
        {medical_input.map((item, index) => (
          <div key={index + "patient"} className="form-control w-full">
            <label className="label">
              <span className="label-text">{item.name}</span>
            </label>
            <select
              className="select select-bordered mb-2"
              onChange={(event) => {
                item.function(event.target.value);
              }}
              defaultValue={selectedPatient[item.input]}
            >
              <option value="" disabled>
                Pick related option
              </option>
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>
        ))}
        <div className="form-control">
          <button
            onClick={updatePatient}
            className={
              "btn btn-block btn-info mt-6 " +
              (formEmpty() ? "btn-disabled" : "")
            }
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
}
