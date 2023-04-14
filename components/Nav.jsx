import Link from "next/link";
import _ from "lodash";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { HiMenu } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import ThemeSelector from "./ThemeSelector";

const Navbar = ({ children }) => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      <div className="drawer bg-base-200">
        <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col min-h-screen">
          <div className="navbar bg-primary text-base-100 px-4 shadow-sm shadow-neutral">
            <div className={!session ? "hidden" : "flex-none block lg:hidden"}>
              <label htmlFor="my-drawer-1" className="btn btn-square btn-ghost">
                <HiMenu htmlFor="my-drawer-1" size={25} />
              </label>
            </div>
            <div className="flex-1 lg:gap-2 justify-start">
              <h1 className="font-bold text-center lg:text-start w-full">
                <div>SBDS@USM</div>
              </h1>
            </div>
            <div className={!session ? "hidden" : "flex-none hidden lg:block"}>
              <ul className="flex flex-row gap-4 items-center ">
                <li className="uppercase font-bold">
                  <div className="tooltip tooltip-bottom" data-tip="Dashboard">
                    <Link href="/">
                      <div>Dashboard</div>
                    </Link>
                  </div>
                </li>
                <li className="uppercase font-bold">
                  <div className="tooltip tooltip-bottom" data-tip="Patient">
                    <Link href="/patient">
                      <div>Patient</div>
                    </Link>
                  </div>
                </li>
              </ul>
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
                    onClick={() => supabase.auth.signOut()}
                  >
                    Sign Out
                  </button>
                ) : (
                  []
                )}
              </div>
            </div>
          </div>
          {/* Content of each page appear here */}
          <div className="grow overflow-auto">
            {React.cloneElement(children)}
          </div>
          {/* Content of each page end here */}
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
