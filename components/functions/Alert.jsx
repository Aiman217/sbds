import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Alert({ alert, setAlert, success }) {
  return (
    <>
      <div className="toast z-20">
        <div
          className={
            "alert shadow-lg " + (success ? "alert-success" : "alert-error")
          }
        >
          <div className="flex flex-row gap-2">
            <span className="text-sm font-semibold sm:text-base">{alert}</span>
            <AiOutlineCloseCircle
              onClick={() => setAlert("")}
              size={25}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
}
