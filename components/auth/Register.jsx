import EmptyCheck from "@/components/functions/EmptyCheck";
import { useEffect, useState } from "react";

export default function Register({
  supabase,
  email,
  setEmail,
  password,
  setPassword,
  setIsRegister,
}) {
  const [staffRole, setStaffRole] = useState("");
  const [doctorList, setDoctorList] = useState("");
  const [doctorID, setDoctorID] = useState(0);
  const [username, setUsername] = useState("");

  function formEmpty() {
    return EmptyCheck(email) || EmptyCheck(password);
  }

  async function signUp() {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      username: username,
      options: {
        data: {
          username: username,
          role: staffRole,
          doctor_id: doctorID,
        },
      },
    });
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
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body text-center items-center">
          <h2 className="card-title font-bold text-2xl">Register Now!</h2>
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
                Pick staff role
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
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              className="input input-bordered"
            />
          </div>
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
          </div>
          <label className="label">
            <a
              href="#"
              onClick={() => {
                setIsRegister(false);
              }}
              className="label-text-alt link link-hover"
            >
              Already have an account?
            </a>
          </label>
          <div className="form-control w-full mt-6">
            <button
              className="btn btn-primary"
              onClick={signUp}
              disabled={formEmpty() ? "disabled" : ""}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
