import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import AlertMsgHndl from "@/components/functions/AlertMsgHndl";
import EmptyCheck from "@/components/functions/EmptyCheck";

export default function UpdateRole({
  supabase,
  setUpdateRoleModal,
  selectedProfile,
  setAlert,
  setSuccess,
  setRefresh,
}) {
  const [name, setName] = useState(selectedProfile?.name);
  const [isDoctor, setIsDoctor] = useState(selectedProfile?.is_doctor);

  function formEmpty() {
    return EmptyCheck(name) || EmptyCheck(isDoctor);
  }

  async function updateRole() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("users")
      .update([
        {
          is_doctor: isDoctor,
        },
      ])
      .eq("id", selectedProfile?.id);
    setUpdateRoleModal(false);
    AlertMsgHndl(
      "Successfully change your user role!",
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
          Change Role
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
            defaultValue={!EmptyCheck(name) ? name : "name"}
            disabled
            className="input input-bordered mb-2"
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Current Role</span>
          </label>
          <select
            className="select select-bordered mb-2"
            onChange={(event) => {
              setIsDoctor(event.target.value);
            }}
            defaultValue={!EmptyCheck(isDoctor) ? isDoctor : ""}
          >
            <option value="" disabled>
              Pick your role
            </option>
            <option value={false}>Nurse</option>
            <option value={true}>Doctor</option>
          </select>
        </div>
        <div className="flex flex-row gap-2">
          <button
            onClick={updateRole}
            className="flex-grow btn btn-info mt-6"
            disabled={formEmpty() ? "disabled" : ""}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
}
