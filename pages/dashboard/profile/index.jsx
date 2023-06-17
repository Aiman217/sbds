import Head from "next/head";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AiOutlineClose } from "react-icons/ai";
import Alert from "@/components/functions/Alert";
import Loading from "@/components/functions/Loading";
import EmptyCheck from "@/components/functions/EmptyCheck";
import CreateProfile from "@/components/dashboard/profile/CreateProfile";
import UpdateProfile from "@/components/dashboard/profile/UpdateProfile";

export default function index() {
  const supabase = useSupabaseClient();
  const [userProfile, setUserProfile] = useState([]);
  const [createProfileModal, setCreateProfileModal] = useState(false);
  const [updateProfileModal, setUpdateProfileModal] = useState(false);
  const [alert, setAlert] = useState("");
  const [success, setSuccess] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data: profile } = await supabase
        .from("user")
        .select("*")
        .eq("user_id", user.id);
      setUserProfile(profile[0]);
      setRefresh(false);
      setLoading(false);
    };
    getUser();
  }, [refresh]);

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="h-full w-full p-4 flex flex-col gap-4">
        <div className="flex flex-row flex-wrap justify-between items-center">
          <div className="flex flex-col">
            <h1 className="font-bold text-3xl capitalize mb-4">Profile</h1>
            <p className="text-md mb-4">Update your profile.</p>
          </div>
          {EmptyCheck(userProfile) ? (
            <label
              htmlFor="my-modal-create-profile"
              className="btn btn-sm btn-success gap-2 modal-button"
              onClick={() => {
                setCreateProfileModal(true);
              }}
            >
              Create Profile
            </label>
          ) : (
            <label
              htmlFor="my-modal-update-profile"
              className="btn btn-sm btn-success gap-2 modal-button"
              onClick={() => {
                setUpdateProfileModal(true);
              }}
            >
              Update Profile
            </label>
          )}
        </div>
        <div className="card w-full bg-base-200 shadow-xl mt-10">
          <div className="card-body p-2 items-center text-center">
            <div className="card w-full bg-base-100 shadow-xl">
              {!EmptyCheck(userProfile) ? (
                <div className="card-body items-center">
                  <img
                    className="mask mask-squircle fixed -translate-y-3/4"
                    src={userProfile.image}
                    height={100}
                    width={100}
                  />
                  <div className="flex flex-row flex-wrap gap-4 mt-10">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder={userProfile.name}
                        className="input input-bordered mb-2"
                        disabled="disabled"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="text"
                        placeholder={userProfile.email}
                        className="input input-bordered mb-2"
                        disabled="disabled"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Gender</span>
                      </label>
                      <input
                        type="text"
                        placeholder={userProfile.gender}
                        className="input input-bordered mb-2"
                        disabled="disabled"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Phone</span>
                      </label>
                      <input
                        type="number"
                        placeholder={userProfile.phone}
                        className="input input-bordered mb-2"
                        disabled="disabled"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Office Address</span>
                      </label>
                      <textarea
                        className="textarea textarea-bordered"
                        placeholder={userProfile.office_address}
                        disabled="disabled"
                      ></textarea>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Date of Birth</span>
                      </label>
                      <input
                        type="text"
                        placeholder={userProfile.dob}
                        className="input input-bordered mb-2"
                        disabled="disabled"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card-body items-center text-center font-bold">
                  No profile created yet. Please create it using create profile button.
                </div>
              )}
            </div>
          </div>
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
              <CreateProfile
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
      {updateProfileModal && (
        <div>
          <input
            type="checkbox"
            id="my-modal-update-profile"
            className="modal-toggle"
          />
          <div className="modal w-full">
            <div className="modal-box w-[90%] sm:w-[80%]">
              <label
                htmlFor="my-modal-update-profile"
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setUpdateProfileModal(false)}
              >
                <AiOutlineClose size={20} />
              </label>
              <UpdateProfile
                supabase={supabase}
                setUpdateProfileModal={setUpdateProfileModal}
                selectedProfile={userProfile}
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
