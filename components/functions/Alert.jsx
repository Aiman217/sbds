import { AiOutlineClose } from "react-icons/ai";

export default function Alert({ alert, setAlert, success }) {
  return (
    <>
      <div className="toast">
        <div className={"alert alert-success shadow-lg " + (success ? "alert-success" : "alert-error")}>
          <div>
            <span className="text-sm sm:text-base">{alert}</span>
            <AiOutlineClose
              onClick={() => setAlert("")}
              size={20}
              className="text-white cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
}
