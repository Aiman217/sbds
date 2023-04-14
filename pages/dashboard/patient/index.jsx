import { useEffect } from "react";
import { useRouter } from "next/router";

const index = ({ session }) => {
  const router = useRouter();

  useEffect(() => {
    !session ? router.push("/login") : [];
  });

  return (
    <>
      <div className="h-full w-full p-4">
        <p>Patient Page</p>
      </div>
    </>
  );
};

export default index;
