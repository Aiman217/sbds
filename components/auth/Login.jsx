import { BsGithub } from "react-icons/bs";
import AlertMsgHndl from "@/components/functions/AlertMsgHndl";
import EmptyCheck from "@/components/functions/EmptyCheck";

export default function Login({
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
  function formEmpty() {
    return EmptyCheck(email) || EmptyCheck(password);
  }

  async function signIn() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    AlertMsgHndl(
      "Successfully sign in!",
      error,
      setAlert,
      setSuccess,
      setRefresh
    );
  }

  async function resetPassword() {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://sbds.vercel.app/reset-password",
    });
    AlertMsgHndl(
      "Successfully send request for reset password! Please check your email!",
      error,
      setAlert,
      setSuccess,
      setRefresh
    );
  }

  async function signInGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  }

  return (
    <>
      <div className="card w-full max-w-lg shadow-lg shadow-primary bg-base-100">
        <div className="card-body text-center items-center">
          <h2 className="card-title font-bold text-2xl uppercase">Login</h2>
          <div className="indicator">
            <div
              className="tooltip"
              data-tip="Sign in with GitHub would not support health staff role. Please
                sign up using email and password if you need to use that
                feature."
            >
              <span className="indicator-item badge badge-warning cursor-pointer">
                !
              </span>
            </div>
            <button className="btn btn-primary" onClick={signInGitHub}>
              Sign in with
              <BsGithub size={25} />
            </button>
          </div>
          <div className="divider m-4 p-0">OR</div>
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
                href="#"
                onClick={resetPassword}
                className="label-text-alt link link-hover link-primary"
              >
                Forgot password?
              </a>
            </label>
            <label className="label">
              <a
                href="#register"
                onClick={() => {
                  setIsRegister(true);
                }}
                className="label-text-alt link link-hover link-primary"
              >
                Dont have an account?
              </a>
            </label>
          </div>
          <div className="form-control w-full mt-6">
            <button
              className="btn btn-primary"
              onClick={signIn}
              disabled={formEmpty() ? "disabled" : ""}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
