import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home ({ session}) {
  const router = useRouter();

  useEffect(() => {
    session ? router.push("/dashboard") : router.push("/login");
  });
};

