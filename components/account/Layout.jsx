import { useEffect } from "react";
import { useRouter } from "next/router";

import { userService } from "services";

export { Layout };

function Layout({ children }) {
  const router = useRouter();

  useEffect(() => {
    // redirect to home if already logged in
    if (userService.userValue) {
      router.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto flex h-full content-center items-center justify-center p-[64px]">
      <div className="flex h-full w-screen bg-white aspect-video rounded">
        {children}
      </div>
    </div>
  );
}
