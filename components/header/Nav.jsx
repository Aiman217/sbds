import React from "react";
import Link from "next/link";
import _ from "lodash";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { HiMenu } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { RiUserHeartLine, RiUserSettingsLine } from "react-icons/ri";
import ThemeSelector from "./ThemeSelector";
import { useRouter } from "next/router";

const Navbar = ({ children }) => {
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
    <>
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
                  <FaRegUserCircle size={30} />
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-primary text-base-100 rounded-box w-52"
              >
                <ThemeSelector theme="select-sm" />
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
          <div className="flex flex-row h-full">
            <div className="h-full w-20">
              <ul className="flex flex-col justify-center items-center gap-4 py-6">
                <li className="uppercase font-bold">
                  <div className="tooltip tooltip-right" data-tip="Statistic">
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
                  <div className="tooltip tooltip-right" data-tip="Patient">
                    <Link href="/dashboard/patient-mngmt">
                      <RiUserSettingsLine size={30} />
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            {/* Content of each page appear here */}
            <div className="grow overflow-auto bg-base-200 text-base-content rounded-tl-2xl">
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
          <div className="menu flex-nowrap p-4 w-[60%] sm:w-[60%] md:w-[40%] bg-base-100 lg:hidden">
            <div className="divider" />
            <ul className="flex flex-col justify-center items-center">
              <li className="uppercase font-bold">
                <div className="tooltip tooltip-right" data-tip="Dashboard">
                  <Link href="/">
                    <div>Dashboard</div>
                  </Link>
                </div>
              </li>
              <li className="uppercase font-bold">
                <div className="tooltip tooltip-right" data-tip="Patient">
                  <Link href="/patient">
                    <div>Patient</div>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
