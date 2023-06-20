import EmptyCheck from "@/components/functions/EmptyCheck";

export default function Login({
  supabase,
  email,
  setEmail,
  password,
  setPassword,
  setIsRegister,
}) {
  function formEmpty() {
    return EmptyCheck(email) || EmptyCheck(password);
  }

  async function signIn() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  }

  return (
    <>
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body text-center items-center">
          <h2 className="card-title font-bold text-2xl">Login Now!</h2>
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
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
            <label className="label">
              <a
                href="#"
                onClick={() => {
                  setIsRegister(true);
                }}
                className="label-text-alt link link-hover"
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
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
