import { useEffect } from "react";
import { useRouter } from "next/router";

import { userService } from "services";
import { motion } from "framer-motion";

export { Layout };

function Layout({ children, direction }) {
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
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`flex h-full w-screen bg-white aspect-video rounded-lg flex-auto justify-around flex-${direction}`}>
            {children}
          </motion.div>
      </div>
  );
}
