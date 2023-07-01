import { useState } from "react";
import { CSVLink } from "react-csv";
import { AiOutlineCloudDownload } from "react-icons/ai";
import EmptyCheck from "@/components/functions/EmptyCheck";

export default function DownloadCSV({ supabase, setDownloadCSVModal }) {
  const [filterType, setFilterType] = useState("");
  const [filterAs, setFilterAs] = useState("");
  const [downloadData, setDownloadData] = useState([]);

  async function getCSV() {
    const { data: patient } = await supabase
      .from("patient")
      .select(
        "*, phq9(little_interest, feeling_down, sleeping_trouble, feeling_tired, poor_appetite, feeling_bad, trouble_concentrating, moving_slowly, thoughts_self_harm), results:result(result, algo)"
      )
      .eq(filterType, filterAs)
      .order("name");
    let csvFinal = [];
    const excludedProperties = ["phq9", "results"];
    if (!EmptyCheck(patient)) {
      csvFinal = patient.map((v) => ({
        ...v,
        ...v.phq9,
        ...v.results,
      }));
      csvFinal = csvFinal.map((parent) => {
        const { ...rest } = parent;
        excludedProperties.forEach((property) => delete rest[property]);
        return { ...rest };
      });
    }
    setDownloadData(csvFinal);
  }

  return (
    <>
      <div className="form-control">
        <h1 className="text-lg font-bold uppercase text-center mt-4">
          Download Patient&apos;s Data
        </h1>
        <div className="divider p-0 m-0"></div>
        <p className="text-base text-center">
          You can choose to filter patient&apos;s data or download the data as
          whole.
        </p>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Filter By</span>
          </label>
          <select
            className="select select-bordered mb-2"
            onChange={(event) => {
              setFilterType(event.target.value);
            }}
            defaultValue=""
          >
            <option value="" disabled>
              Please select/ignore
            </option>
            <option value="result.result">Status</option>
            <option value="gender">Gender</option>
          </select>
        </div>
        {!EmptyCheck(filterType) ? (
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Filter As</span>
            </label>
            <select
              className="select select-bordered mb-2"
              onChange={(event) => {
                setFilterAs(event.target.value);
              }}
              defaultValue=""
            >
              <option value="" disabled>
                Please select
              </option>
              {filterType == "result.result" ? (
                <>
                  <option value="High Risk">High Risk</option>
                  <option value="Low Risk">Low Risk</option>
                </>
              ) : (
                <>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </>
              )}
            </select>
          </div>
        ) : (
          []
        )}
        <div className="form-control flex-row gap-4 mt-6">
          {!EmptyCheck(downloadData) ? (
            <CSVLink data={downloadData} filename={"PatientList.csv"}>
              <button className={"btn btn-info btn-circle flex-1"}>
                <AiOutlineCloudDownload size={20} />
              </button>
            </CSVLink>
          ) : (
            []
          )}
          <button onClick={getCSV} className={"btn btn-info flex-1"}>
            Download
          </button>
          <button
            onClick={() => {
              setDownloadCSVModal(false);
            }}
            className={"btn btn-outline flex-1"}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
