import Head from "next/head";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function index({ session }) {
  const supabase = useSupabaseClient();
  const router = useRouter();

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
      <div className="h-full w-full p-4 flex justify-center items-center">
        <div className="w-full max-w-lg">
          <Auth
            redirectTo={process.env.NEXT_PUBLIC_REDIRECT_GITHUB}
            providers={["github"]}
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
          />
        </div>
      </div>
    </>
  );
}
