import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import _ from "lodash";

export default function CreatePatient({
  setCreateModal,
  setAlert,
  setSuccess,
}) {
  const supabase = useSupabaseClient();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [religion, setReligion] = useState("");
  const [marital_status, setMaritalStatus] = useState("");
  const [employment, setEmployment] = useState("");

  async function createPatient() {
    const { data, error } = await supabase.from("patient").insert([
      {
        name: name,
        age: age,
        gender: gender,
        ethnicity: ethnicity,
        religion: religion,
        marital_status: marital_status,
        employment: employment,
      },
    ]);
    setCreateModal(false);
    error
      ? (setAlert("Failed to add patient!"),
        setSuccess(false),
        setTimeout(() => {
          setAlert("");
          setSuccess(false);
        }, 4000))
      : (setAlert("Successfully add new patient!"),
        setSuccess(true),
        setTimeout(() => {
          setAlert("");
          setSuccess(false);
        }, 4000));
  }

  return (
    <>
      <div className="form-control">
        <h1 className="text-lg font-bold uppercase text-center mt-4">
          Add new patient
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
        <div className="form-control">
          <button
            onClick={createPatient}
            className={
              "btn btn-block btn-success mt-6 " +
              (_.isEmpty(name) &&
              _.isEmpty(age) &&
              _.isEmpty(gender) &&
              _.isEmpty(ethnicity) &&
              _.isEmpty(religion) &&
              _.isEmpty(marital_status) &&
              _.isEmpty(employment)
                ? "btn-disabled"
                : "")
            }
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
}
