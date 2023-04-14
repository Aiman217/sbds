import { useEffect } from "react";
import { useRouter } from "next/router";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Head from "next/head";

const index = ({ session }) => {
  const supabase = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    session ? router.push("/dashboard") : [];
  });

  return (
    <>
      <Head>
        <title>OSP@USM | Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="h-full w-full p-4 flex justify-center items-center">
        <div className="h-full w-full p-10">
          <Auth
            providers={["github"]}
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
          />
        </div>
      </div>
    </>
  );
};

export default index;
