import { useEffect, useState } from "react";
import AlertMsgHndl from "@/components/functions/AlertMsgHndl";
import EmptyCheck from "@/components/functions/EmptyCheck";

export default function Register({
  supabase,
  email,
  setEmail,
  password,
  setPassword,
  setIsRegister,
  setAlert,
  setSuccess,
  setRefresh,
}) {
  const [staffRole, setStaffRole] = useState("");
  const [doctorList, setDoctorList] = useState("");
  const [doctorID, setDoctorID] = useState(0);

  function formEmpty() {
    return EmptyCheck(staffRole) || EmptyCheck(email) || EmptyCheck(password);
  }

  async function signUp() {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          role: staffRole,
          doctor_id: doctorID,
        },
      },
    });
    AlertMsgHndl(
      "Successfully sign up!",
      error,
      setAlert,
      setSuccess,
      setRefresh
    );
  }

  useEffect(() => {
    const getUser = async () => {
      const { data: profile } = await supabase
        .from("users")
        .select("id, email");
      setDoctorList(profile);
    };
    getUser();
  }, []);

  return (
    <>
      <div className="card w-full max-w-lg shadow-lg shadow-primary bg-base-100">
        <div className="card-body text-center items-center">
          <h2 className="card-title font-bold text-2xl uppercase">Register</h2>
          <div className="divider m-4 p-0"></div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Register As</span>
            </label>
            <select
              className="select select-bordered mb-2"
              onChange={(event) => {
                setStaffRole(event.target.value);
              }}
              defaultValue=""
            >
              <option value="" disabled>
                Pick health staff role
              </option>
              <option value="Nurse">Nurse</option>
              <option value="Doctor">Doctor</option>
            </select>
          </div>
          {staffRole === "Nurse" ? (
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Work Under</span>
              </label>
              <select
                className="select select-bordered mb-2"
                onChange={(event) => {
                  setDoctorID(event.target.value);
                }}
                defaultValue=""
              >
                <option value="" disabled>
                  Pick doctor you work under
                </option>
                {doctorList.map((dr, index) => (
                  <option key={index} value={dr.id}>
                    {dr.email}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            []
          )}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              className="input input-bordered"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              className="input input-bordered"
            />
            <label className="label">
              <a
                href="#login"
                onClick={() => {
                  setIsRegister(false);
                }}
                className="label-text-alt link link-hover link-primary"
              >
                Already have an account?
              </a>
            </label>
          </div>
          <div className="form-control w-full mt-6">
            <button
              className="btn btn-primary"
              onClick={signUp}
              disabled={formEmpty() ? "disabled" : ""}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
