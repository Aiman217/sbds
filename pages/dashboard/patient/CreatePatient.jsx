import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function CreatePatient() {
  const supabase = useSupabaseClient();
  const [name, setName] = useState("");

  async function createPatient() {
    const { data, error } = await supabase
      .from("patient")
      .insert([{ name: name }]);
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
        <div className="form-control">
          <button
            onClick={createPatient}
            className="btn btn-block btn-success mt-6 mb-16"
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
}
