import Head from "next/head";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import EmptyCheck from "@/components/functions/EmptyCheck";
import Alert from "@/components/functions/Alert";
import AlertMsgHndl from "@/components/functions/AlertMsgHndl";

export default function index() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [success, setSuccess] = useState(false);
  const [refresh, setRefresh] = useState(false);

  function formEmpty() {
    return EmptyCheck(password);
  }

  async function resetPassword() {
    const { error } = await supabase.auth.updateUser({
      password: password,
    });
    if (EmptyCheck(error)) {
      router.push("/dashboard");
      AlertMsgHndl(
        "Successfully update your password!",
        error,
        setAlert,
        setSuccess,
        setRefresh
      );
    }
  }

  return (
    <>
      <Head>
        <title>Reset Password</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="h-full w-full p-4 flex flex-wrap gap-4 justify-center items-center">
        <div className="card w-full max-w-sm shadow-lg shadow-primary bg-base-100">
          <div className="card-body text-center items-center">
            <h2 className="card-title font-bold text-2xl">
              Enter New Password!
            </h2>
            <div className="divider m-0 p-0"></div>
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
            <div className="form-control w-full mt-6">
              <button
                className="btn btn-primary"
                onClick={resetPassword}
                disabled={formEmpty() ? "disabled" : ""}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
      {!EmptyCheck(alert) && (
        <Alert alert={alert} setAlert={setAlert} success={success} />
      )}
    </>
  );
}
