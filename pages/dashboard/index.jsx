import { useEffect } from "react";
import { useRouter } from "next/router";

const index = ({ session }) => {
  const router = useRouter();

  useEffect(() => {
    !session ? router.push("/login") : [];
  });

  return <>{console.log(session)}</>;
};

export default index;
