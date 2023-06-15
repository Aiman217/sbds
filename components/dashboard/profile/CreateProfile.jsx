import { useState } from "react";
import AlertMsgHndl from "@/components/functions/AlertMsgHndl";
import EmptyCheck from "@/components/functions/EmptyCheck";

export default function CreateProfile({
  supabase,
  setCreateProfileModal,
  setAlert,
  setSuccess,
  setRefresh,
}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [religion, setReligion] = useState("");
  const [marital_status, setMaritalStatus] = useState("");
  const [employment, setEmployment] = useState("");
  const [hasDepressiveDisorder, setHasDepressiveDisorder] = useState("");
  const [pastPsychiatricDisorder, setPastPsychiatricDisorder] = useState("");
  const [pastSuicidalAttempt, setPastSuicidalAttempt] = useState("");
  const [medicalComorbidity, setMedicalComorbidity] = useState("");

  const medical_input = [
    {
      name: "Depressive Disorder",
      function: setHasDepressiveDisorder,
    },
    {
      name: "Past Psychiatric Treatment",
      function: setPastPsychiatricDisorder,
    },
    {
      name: "Past Suicidal Attempt",
      function: setPastSuicidalAttempt,
    },
    {
      name: "Comorbid Medical Condition",
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

  async function createPatient() {
    const { error } = await supabase.from("patient").insert([
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
    ]);
    setCreateProfileModal(false);
    AlertMsgHndl(
      "Successfully add new patient!",
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
          Add New Patient
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
            placeholder="name"
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
            placeholder="age"
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
              defaultValue=""
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
            onClick={createPatient}
            className={
              "btn btn-block btn-success mt-6 " +
              (formEmpty() ? "btn-disabled" : "")
            }
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
}
