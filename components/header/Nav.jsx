import React from "react";
import Link from "next/link";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { HiMenu } from "react-icons/hi";
import { RxDashboard } from "react-icons/rx";
import { RiUserHeartLine, RiUserSettingsLine } from "react-icons/ri";
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
      <div className="drawer bg-primary text-base-100">
        <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col min-h-screen">
          <div className="navbar px-4 lg:px-10 justify-between">
            <div className={!session ? "hidden" : "block lg:hidden"}>
              <label
                htmlFor="my-drawer-1"
                className="btn btn-sm btn-square btn-ghost"
              >
                <HiMenu htmlFor="my-drawer-1" size={25} />
              </label>
            </div>
            <div>
              <h1 className="font-bold text-center w-full">
                <div>SBDS@USM</div>
              </h1>
            </div>
            <div
              className={
                "dropdown dropdown-end ml-4 " + (!session ? "hidden" : "")
              }
            >
              <label
                tabIndex={0}
                className="btn btn-sm md:btn-md btn-ghost btn-circle avatar"
              >
                <div className="flex rounded-full justify-center items-center">
                  <Avatar size={40} name="Eunice Kennedy" variant="bauhaus" />
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact border-2 border-base-100 dropdown-content bg-primary rounded-box w-52"
              >
                {session ? (
                  <button
                    className={"btn btn-sm btn-error m-2"}
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </button>
                ) : (
                  []
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row h-full overflow-hidden">
            <div
              className={
                "h-full w-20 " + (!session ? "hidden" : "hidden lg:block")
              }
            >
              <ul className="flex flex-col justify-center items-center gap-4 py-6">
                <li className="uppercase font-bold">
                  <div className="tooltip tooltip-right" data-tip="Dashboard">
                    <Link href="/dashboard">
                      <RxDashboard size={30} />
                    </Link>
                  </div>
                </li>
                <li className="uppercase font-bold">
                  <div className="tooltip tooltip-right" data-tip="Patient">
                    <Link href="/dashboard/patient">
                      <RiUserHeartLine size={30} />
                    </Link>
                  </div>
                </li>
                <li className="uppercase font-bold">
                  <div
                    className="tooltip tooltip-right"
                    data-tip="Patient Management"
                  >
                    <Link href="/dashboard/patient-mngmt">
                      <RiUserSettingsLine size={30} />
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            {/* Content of each page appear here */}
            <div className="grow overflow-auto border-2 border-base-100 bg-base-300 text-neutral rounded-2xl">
              {React.cloneElement(children, { session: session })}
            </div>
            {/* Content of each page end here */}
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-1"
            className="drawer-overlay lg:hidden"
          ></label>
          <div className="menu border-r-2 border-base-100 rounded-r-2xl bg-primary p-4 w-[70%] md:w-[50%] lg:hidden">
            <div className="divider flex-none before:bg-base-100 after:bg-base-100" />
            <ul className="flex grow flex-col justify-center items-start gap-4">
              <li className="uppercase font-bold flex flex-row">
                <Link href="/dashboard">
                  <RxDashboard size={30} />
                  Dashboard
                </Link>
              </li>
              <li className="uppercase font-bold flex flex-row">
                <Link href="/dashboard/patient">
                  <RiUserHeartLine size={30} />
                  Patient
                </Link>
              </li>
              <li className="uppercase font-bold flex flex-row">
                <Link href="/dashboard/patient-mngmt">
                  <RiUserSettingsLine size={30} />
                  Patient Management
                </Link>
              </li>
            </ul>
            <div className="divider flex-none before:bg-base-100 after:bg-base-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
