import passport from "passport";
import SteamStrategy from "passport-steam";
import Router from "next/router";

// logic to save your user or check if user exists in your record to proceed.
const saveUser = (user) => {
  console.log(user);
  return new Promise((resolve, reject) => {
    resolve("Successful");
  });
};

passport.use(
  new SteamStrategy(
    {
        returnURL: `${process.env.DOMAIN}/api/oauth2/redirect/steam`,
        realm: `${process.env.DOMAIN}`,
        apiKey: `${process.env.STEAM_API_KEY}`
    },
    async (req, res) => {
      try {
        return await saveUser(res);
      } catch (e) {
        throw new Error(e);
      }
    }
  )
);

// for broader explanation of serializeUser and deserializeUser visit https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize

// An article that explains the concept of process.nextTick https://nodejs.dev/learn/understanding-process-nexttick

export default passport;