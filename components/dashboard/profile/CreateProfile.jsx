import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
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
  const [dob, setDOB] = useState(0);

  function formEmpty() {
    return EmptyCheck(name);
  }

  async function uploadFile() {
    const { data, error } = await supabase.storage
      .from("user")
      .upload("file_path2", uploadPhoto);
    if (error) {
      console.log(error);
    } else {
      console.log(data.path);
      getFileURL();
    }
  }

  async function getFileURL() {
    const { data, error } = supabase.storage
      .from("user")
      .getPublicUrl("file_path2");
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  }

  async function createPatient() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from("user").insert([
      {
        name: name,
        account_created_at: user.created_at,
      },
    ]);
    setCreateProfileModal(false);
    AlertMsgHndl(
      "Successfully create user profile!",
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
            <span className="label-text">Profile Image</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            accept="image/*"
            onChange={(e) => {
              setUploadPhoto(e.target.files[0]);
            }}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Date of Birth</span>
          </label>
          <Datepicker
            useRange={false}
            asSingle={true}
            value={dob}
            primaryColor="pink"
            onChange={(e) => {
              setDOB(e.startDate);
            }}
          />
        </div>
        <div className="form-control">
          <button
            onClick={createPatient}
            className="btn btn-block btn-success mt-6"
            disabled={formEmpty() ? "disabled" : ""}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
}
