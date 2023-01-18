import { userService } from "services";
import { Link } from "components";

import Avatar, { genConfig } from "react-nice-avatar";
import { motion, AnimatePresence } from "framer-motion";

export default Home;

function Home() {
  const config = genConfig(`${userService.userValue?.avatar}`);

  console.log(config);
  console.log(`${userService.userValue?.avatar}`);

  return (
    <AnimatePresence>
      <motion.div
      key="homepage"
      initial={{ y: "100px", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-100px", opacity: 0 }}
      className="p-4 h-[calc(100%-76px)]"
      >
        <div className="container h-full m-auto">
          <div className="flex flex-col items-center justify-center h-full max-w-lg mx-auto bg-white rounded-lg max-h-[500px] py-5">
            <h4 className="text-4xl font-semibold">
              Olá, {userService.userValue?.firstName}{" "}
              {userService.userValue?.lastName}!
            </h4>

            <Avatar
              className="w-32 h-32 mt-10 mb-5 ring-offset-4 ring-4 ring-primary-500"
              {...config}
            />
            {/* <p><Link href="/users">Manage Users</Link></p> */}
            <span className="text-sm">Você entrou como</span>
            <span className="text-primary-500">
              {userService.userValue?.username}
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
