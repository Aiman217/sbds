import Head from "next/head";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { v4 as uuidv4 } from "uuid";
import Alert from "@/components/functions/Alert";
import Loading from "@/components/functions/Loading";
import EmptyCheck from "@/components/functions/EmptyCheck";

export default function index() {
  const supabase = useSupabaseClient();
  const [uploadPhoto, setUploadPhoto] = useState([]);
  const [createProfileModal, setCreateProfileModal] = useState(false);
  const [alert, setAlert] = useState("");
  const [success, setSuccess] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  // Upload file using standard upload
  async function uploadFile() {
    const { data, error } = await supabase.storage
      .from("user")
      .upload("file_path2", uploadPhoto);
    if (error) {
      // Handle error
      console.log(error);
    } else {
      // Handle success
      console.log(data.path);
      getFileURL();
    }
  }

  // Upload file using standard upload
  async function getFileURL() {
    const { data, error } = supabase.storage
      .from("user")
      .getPublicUrl("file_path2");
    if (error) {
      // Handle error
      console.log(error);
    } else {
      // Handle success
      console.log(data);
    }
  }

  async function createProfile() {
    const { error } = await supabase.from("user").insert([
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
    setPHQ9Modal(false);
    AlertMsgHndl(
      "Successfully add patient phq9 form!",
      error,
      setAlert,
      setSuccess,
      setRefresh
    );
  }

  // useEffect(() => {
  //   const getUser = async () => {
  //     const { data: profile } = await supabase.from("user").select("*").eq("doctor_id", );
  //     setPatientData(patient);
  //     setRefresh(false);
  //     setLoading(false);
  //   };
  //   getPatient();
  // }, [refresh]);

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {console.log(supabase)}
      <div className="h-full w-full p-4 flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <h1 className="font-bold text-3xl capitalize mb-4">Profile</h1>
            <p className="text-md mb-4">Update your profile.</p>
          </div>
          <div className="flex gap-2">
            <label
              htmlFor="my-modal-create-profile"
              className="btn btn-sm btn-success gap-2 modal-button"
              onClick={() => {
                setCreateProfileModal(true);
              }}
            >
              Create Profile
            </label>
          </div>
        </div>
        <input
          type="file"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          accept="image/*"
          onChange={(e) => {
            setUploadPhoto(e.target.files[0]);
          }}
        />
        <div className="form-control">
          <button onClick={uploadFile} className="btn btn-block btn-info mt-6 ">
            Upload
          </button>
        </div>
      </div>
      {createProfileModal && (
        <div>
          <input
            type="checkbox"
            id="my-modal-create-profile"
            className="modal-toggle"
          />
          <div className="modal w-full">
            <div className="modal-box w-[90%] sm:w-[80%]">
              <label
                htmlFor="my-modal-create-profile"
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setCreateProfileModal(false)}
              >
                <AiOutlineClose size={20} />
              </label>
              <CreatePatient
                supabase={supabase}
                setCreateProfileModal={setCreateProfileModal}
                setAlert={setAlert}
                setSuccess={setSuccess}
                setRefresh={setRefresh}
              />
            </div>
          </div>
        </div>
      )}
      {!EmptyCheck(alert) && (
        <Alert alert={alert} setAlert={setAlert} success={success} />
      )}
      {loading && <Loading />}
    </>
  );
}
