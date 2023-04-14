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
      <div className="w-full h-full md:grid md:grid-cols-2 lg:grid-cols-3">
        <div className="hidden md:carousel h-[90vh] rounded-lg md:col-span-1 lg:col-span-2">
          <div id="slide1" className="carousel-item relative w-full">
            <img src="https://picsum.photos/id/10/200/200" className="w-full" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide4" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide2" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <img src="https://picsum.photos/id/11/200/200" className="w-full" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <img src="https://picsum.photos/id/12/200/200" className="w-full" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>
        <div className="flex h-full justify-center items-center md:col-span-1 px-4">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-4">
            <Auth
              providers={["github"]}
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="dark"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
