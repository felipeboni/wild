import passport from "lib/passport-steam-auth";
import nextConnect from "next-connect";

export default nextConnect()
  .use(passport.initialize())
  .get(
    passport.authenticate("steam",  { failureRedirect: '/', session: false })
  );
