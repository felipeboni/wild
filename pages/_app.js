import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "../styles/globals.css";

import { userService } from "services";
import { Nav } from "components";
import { Toaster } from "react-hot-toast";

import { AnimatePresence } from "framer-motion";

export default App;

function App({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    setUser(userService.userValue);
    const publicPaths = ["/account/login", "/account/register"];
    const path = url.split("?")[0];
    
    if (!userService.userValue && !publicPaths.includes(path)) {

      setAuthorized(false);
      
      router.push({
        pathname: "/account/login",
        query: { returnUrl: router.asPath },
      }, "/account/login");

    } else {
      setAuthorized(true);
    }
  }

  return (
    <main className="bg-slate-100 h-screen">
      <Head>
        <title>Wild</title>

        {/* eslint-disable-next-line @next/next/no-css-tags */}
      </Head>

      <>
          
        <Nav />
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            // Define default options
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />

        <AnimatePresence mode="wait">
          { authorized && <Component {...pageProps} /> }
        </AnimatePresence>

      </>
    </main>
  );
}
