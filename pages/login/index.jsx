import Head from "next/head";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";

export default function index({ session }) {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

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
          <Register
            supabase={supabase}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            setIsRegister={setIsRegister}
          />
        ) : (
          <Login
            supabase={supabase}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            setIsRegister={setIsRegister}
          />
        )}
      </div>
    </>
  );
}
