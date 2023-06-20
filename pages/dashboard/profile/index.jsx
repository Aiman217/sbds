import Head from "next/head";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AiOutlineClose } from "react-icons/ai";
import Alert from "@/components/functions/Alert";
import Loading from "@/components/functions/Loading";
import EmptyCheck from "@/components/functions/EmptyCheck";
import UpdateProfile from "@/components/dashboard/profile/UpdateProfile";

export default function index() {
  const supabase = useSupabaseClient();
  const [userProfile, setUserProfile] = useState([]);
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
        .from("users")
        .select("*")
        .eq("id", user.id);
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
            <h1 className="font-bold text-3xl capitalize mb-4">
              Profile Management
            </h1>
            <p className="italic text-md mb-4">Manage your profile.</p>
          </div>
          <div className="flex flex-row gap-2">
            <label
              htmlFor="my-modal-update-profile"
              className="btn btn-sm btn-info gap-2 modal-button"
              onClick={() => {
                setUpdateProfileModal(true);
              }}
            >
              Update Profile
            </label>
          </div>
        </div>
        <div className="card w-full bg-primary text-base-100 shadow-xl">
          <div className="card-body p-2 items-center text-center">
            <div className="card w-full bg-base-100 shadow-xl">
              <div className="card-body lg:flex-row items-center">
                <img
                  className="mask mask-squircle"
                  src={userProfile.image}
                  height={100}
                  width={100}
                />
                <div className="divider lg:divider-horizontal before:bg-primary after:bg-primary p-0 m-0"></div>
                <div className="flex flex-row flex-wrap gap-4">
                  <div className="form-control w-full lg:w-fit">
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
                  <div className="form-control w-full lg:w-fit">
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
                  <div className="form-control w-full lg:w-fit">
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
                  <div className="form-control w-full lg:w-fit">
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
                  <div className="form-control w-full lg:w-fit">
                    <label className="label">
                      <span className="label-text">Office Address</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered"
                      placeholder={userProfile.office_address}
                      disabled="disabled"
                    ></textarea>
                  </div>
                  <div className="form-control w-full lg:w-fit">
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
            </div>
          </div>
        </div>
      </div>
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
