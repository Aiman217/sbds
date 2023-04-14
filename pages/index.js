import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = ({ session }) => {
  const router = useRouter();

  useEffect(() => {
    session ? router.push("/dashboard") : router.push("/login");
  });
};

export default Home;
