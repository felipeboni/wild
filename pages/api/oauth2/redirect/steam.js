import nextConnect from "next-connect";
import passport from "lib/passport-steam-auth";
import Router from "next/router";


export default nextConnect().get(
  passport.authenticate("steam",  { failureRedirect: '/', session: false }),
  (req, res) => {
    // you can save the user session here. to get access to authenticated user through req.user
    Router.push("/account/register");
  }
);