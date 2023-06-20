import Head from "next/head";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function index({ session }) {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  async function signIn() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  }

  async function signUp() {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          role: "Doctor",
        },
      },
    });
  }

  useEffect(() => {
    function routeHome() {
      router.push("/dashboard");
    }
    if (session) routeHome();
  }, [session]);

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="h-full w-full p-4 flex flex-wrap gap-4 justify-center items-center">
        {isRegister ? (
          <div className="card w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body text-center items-center">
              <h2 className="card-title font-bold text-2xl">Register Now!</h2>
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
                <button className="btn btn-primary" onClick={signUp}>
                  Register
                </button>
              </div>
            </div>
          </div>
        ) : (
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
                <button className="btn btn-primary" onClick={signIn}>
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
