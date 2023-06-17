import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { v4 as uuidv4 } from "uuid";
import AlertMsgHndl from "@/components/functions/AlertMsgHndl";
import EmptyCheck from "@/components/functions/EmptyCheck";

export default function CreateProfile({
  supabase,
  setCreateProfileModal,
  setAlert,
  setSuccess,
  setRefresh,
}) {
  const [image, setImage] = useState([]);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState(0);
  const [officeAddress, setOfficeAddress] = useState("");
  const [dob, setDOB] = useState(0);
  const [imageURL, setImageURL] = useState("");

  function formEmpty() {
    return (
      EmptyCheck(name) ||
      EmptyCheck(gender) ||
      EmptyCheck(phone) ||
      EmptyCheck(officeAddress) ||
      EmptyCheck(dob) ||
      EmptyCheck(imageURL)
    );
  }

  async function uploadImage() {
    const tempImageName = uuidv4();
    const { path } = await supabase.storage
      .from("user")
      .upload(tempImageName, image);
    getImageUrl(tempImageName);
  }

  function getImageUrl(tempImageName) {
    const { data } = supabase.storage.from("user").getPublicUrl(tempImageName);
    setImageURL(data.publicUrl);
  }

  async function createPatient() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from("user").insert([
      {
        account_created_at: user.created_at,
        name: name,
        gender: gender,
        phone: phone,
        office_address: officeAddress,
        dob: dob.startDate,
        image: imageURL,
      },
    ]);
    setCreateProfileModal(false);
    AlertMsgHndl(
      "Successfully create user profile!",
      error,
      setAlert,
      setSuccess,
      setRefresh
    );
  }

  return (
    <>
      <div className="form-control">
        <h1 className="text-lg font-bold uppercase text-center mt-4">
          Create Profile
        </h1>
        <div className="divider p-0 m-0"></div>
        <div className="form-control w-full flex-row flex-wrap gap-4 justify-center items-center">
          {!EmptyCheck(imageURL) ? (
            <img
              className="mask mask-squircle"
              src={imageURL}
              height={100}
              width={100}
            />
          ) : (
            []
          )}
          <input
            type="file"
            className="file-input file-input-sm file-input-bordered m-2"
            accept="image/*"
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            onChange={(event) => {
              setName(event.target.value);
            }}
            type="text"
            placeholder="name"
            className="input input-bordered mb-2"
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Gender</span>
          </label>
          <select
            className="select select-bordered mb-2"
            onChange={(event) => {
              setGender(event.target.value);
            }}
            defaultValue=""
          >
            <option value="" disabled>
              Pick gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input
            onChange={(event) => {
              setPhone(event.target.value);
            }}
            type="number"
            placeholder="phone"
            className="input input-bordered mb-2"
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Office Address</span>
          </label>
          <textarea
            onChange={(event) => {
              setOfficeAddress(event.target.value);
            }}
            className="textarea textarea-bordered"
            placeholder="office address"
          ></textarea>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Date of Birth</span>
          </label>
          <Datepicker
            useRange={false}
            asSingle={true}
            value={dob}
            primaryColor="pink"
            onChange={(event) => {
              setDOB(event);
            }}
          />
        </div>
        <div className="flex flex-row gap-2">
          <button
            onClick={uploadImage}
            className="btn btn-warning mt-6"
            disabled={EmptyCheck(image) ? "disabled" : ""}
          >
            Upload
          </button>
          <button
            onClick={createPatient}
            className="flex-grow btn btn-success mt-6"
            disabled={formEmpty() ? "disabled" : ""}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
}
