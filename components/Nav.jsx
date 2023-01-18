import { useState, useEffect } from "react";

import { NavLink } from ".";
import { userService } from "services";

import { LogOut } from "react-feather";
import { motion, AnimatePresence } from "framer-motion";

export { Nav };

function Nav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  function logout() {
    userService.logout();
  }

  // only show nav when logged in
  if (!user) return null;

  return (
    <AnimatePresence>
      <motion.nav 
      key="navbar"
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
       className="flex justify-between w-full p-5 bg-white">
        <div className="flex items-center">
          <NavLink href="/" className="text-3xl font-bold text-primary-500">
            wild
          </NavLink>
        </div>
        <div className="flex items-center gap-5">
          <NavLink href="/" exact activeClassName="font-bold">
            Início
          </NavLink>
          <NavLink href="/users" activeClassName="active">
            Usuários
          </NavLink>
          <a
            onClick={logout}
            className="p-2.5 rounded-lg cursor-pointer bg-primary-50"
          >
            <LogOut width={16} height={16} className="stroke-primary-500" />
          </a>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
}
