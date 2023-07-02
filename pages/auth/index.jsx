import Head from "next/head";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import Alert from "@/components/functions/Alert";
import EmptyCheck from "@/components/functions/EmptyCheck";
import SlideShow from "@/components/functions/SlideShow";

export default function index({ session }) {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [alert, setAlert] = useState("");
  const [success, setSuccess] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [slideList, setSlideLists] = useState([]);

  useEffect(() => {
    function routeHome() {
      router.push("/dashboard");
    }
    async function getSlides() {
      const { data: slides } = await supabase
        .from("slides")
        .select("src_image");
      setSlideLists(slides);
    }
    if (session) {
      routeHome();
    } else {
      getSlides();
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="h-full w-full p-4 flex flex-row gap-4">
        <div className="grow md:flex justify-center items-center hidden">
          <SlideShow slideList={slideList} />
        </div>
        <div className="w-full flex justify-center items-center">
          {isRegister ? (
            <Register
              supabase={supabase}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              setIsRegister={setIsRegister}
              setAlert={setAlert}
              setSuccess={setSuccess}
              setRefresh={setRefresh}
            />
          ) : (
            <Login
              supabase={supabase}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              setIsRegister={setIsRegister}
              setAlert={setAlert}
              setSuccess={setSuccess}
              setRefresh={setRefresh}
            />
          )}
        </div>
      </div>
      {!EmptyCheck(alert) && (
        <Alert alert={alert} setAlert={setAlert} success={success} />
      )}
    </>
  );
}
