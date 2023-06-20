import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { HiMenu } from "react-icons/hi";
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/router";
import Avatar from "boring-avatars";
import EmptyCheck from "@/components/functions/EmptyCheck";

export default function Nav({ children }) {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [userRole, setUserRole] = useState([]);

  function signOut() {
    supabase.auth.signOut();
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  }

  useEffect(() => {
    const getUserRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserRole(user?.user_metadata?.role);
    };
    if (session) {
      getUserRole();
    }
  }, [session]);

  return (
    <div data-theme="light" className="flex flex-col min-h-screen w-full">
      <div className="sticky top-0 z-10">
        <div className="navbar bg-primary text-base-100">
          {session ? (
            <div className="navbar-start">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <HiMenu size={25} />
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 p-2 shadow-lg shadow-primary bg-base-200 rounded-box w-52 z-20 gap-2"
                >
                  <li>
                    <Link
                      href="/dashboard"
                      className="bg-primary font-semibold uppercase justify-center"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/patient-mngmt"
                      className="bg-primary font-semibold uppercase justify-center"
                    >
                      Patient Management
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/patient-mntr"
                      className="bg-primary font-semibold uppercase justify-center"
                    >
                      Patient Monitoring
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            []
          )}
          <div className={session ? "navbar-center" : "grow justify-center"}>
            <a className="font-bold text-xl">SBDS@USM</a>
          </div>
          {session ? (
            <div className="navbar-end gap-4">
              <div>
                {userRole === "Nurse" ? (
                  <div className="badge badge-outline badge-lg">NURSE</div>
                ) : (
                  <div className="badge badge-outline badge-lg">DOCTOR</div>
                )}
              </div>
              <div className="dropdown dropdown-end z-20">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <Avatar size={40} name="Eunice Kennedy" variant="bauhaus" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 p-2 shadow-lg shadow-primary bg-base-200 rounded-box w-52 gap-2"
                >
                  <li>
                    <Link
                      href="/dashboard/profile"
                      className="bg-primary font-semibold uppercase justify-center"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      className={"btn btn-outline bg-base-100 btn-sm btn-error"}
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            []
          )}
        </div>
      </div>
      <div className="flex justify-center grow">
        <div className="lg:w-[90%] overflow-auto">
          {React.cloneElement(children, { session: session })}
        </div>
      </div>
      <footer className="sticky bottom-0 footer gap-2 items-center p-4 bg-primary text-base-100 z-10">
        <div className="items-center grid-flow-col">
          <p className="italic text-justify text-xs lg:text-sm">
            Prediction by machine learning model are based on statistical
            correlations, and may not be accurate or relevant for every
            individual.
          </p>
        </div>
        <div className="lg:place-self-center lg:justify-self-end">
          <a
            target="_blank"
            href="https://github.com/Aiman217/sbds"
            rel="noopener noreferrer"
            className="btn btn-primary btn-circle"
          >
            <AiFillGithub size={30} className="text-base-100" />
          </a>
        </div>
      </footer>
    </div>
  );
}
