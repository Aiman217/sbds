import AlertMsgHndl from "@/components/functions/AlertMsgHndl";

export default function DownloadCSV({
  supabase,
  setDeletePatientModal,
  selectedPatient,
  setAlert,
  setSuccess,
  setRefresh,
}) {
  async function deletePatient(id) {
    const { error } = await supabase.from("patient").delete().eq("id", id);
    setDeletePatientModal(false);
    AlertMsgHndl(
      "Successfully delete patient!",
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
          Confirmation on patient deletion
        </h1>
        <div className="divider p-0 m-0"></div>
        <p className="text-base text-center">
          You data will be permanently delete and any recovery attempt would not
          be possible in the future!
        </p>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder={selectedPatient?.name}
            className="input input-bordered mb-2"
            disabled
          />
        </div>
        <div className="form-control flex-row gap-4 mt-6">
          <button
            onClick={() => {
              deletePatient(selectedPatient?.id);
            }}
            className={"btn btn-error flex-1"}
          >
            Delete
          </button>
          <button
            onClick={() => {
              setDeletePatientModal(false);
            }}
            className={"btn btn-outline flex-1"}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
