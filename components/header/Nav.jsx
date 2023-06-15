import React from "react";
import Link from "next/link";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { HiMenu } from "react-icons/hi";
import { useRouter } from "next/router";
import Avatar from "boring-avatars";

export default function Nav({ children }) {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  function signOut() {
    supabase.auth.signOut();
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  }

  return (
    <div data-theme="light">
      <div className="sticky top-0 z-20 w-full h-full">
        <div className="navbar bg-primary text-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <HiMenu size={25} />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52 z-20 gap-2"
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
          <div className="navbar-center">
            <a className="btn btn-ghost normal-case text-xl">SBDS@USM</a>
          </div>
          <div className="navbar-end">
            <div className="dropdown dropdown-end z-20">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Avatar size={40} name="Eunice Kennedy" variant="bauhaus" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52 gap-2"
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
                  {session ? (
                    <button
                      className={"btn btn-outline bg-base-100 btn-sm btn-error"}
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </button>
                  ) : (
                    []
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="z-0">
        {React.cloneElement(children, { session: session })}
      </div>
    </div>
  );
}
