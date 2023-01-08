const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

import { apiHandler, usersRepo } from "helpers/api";

export default apiHandler({
  post: register,
});

async function register(req, res) {
  // split out password from user details
  const { password, ...user } = req.body;

  // hash password
  user.hash = bcrypt.hashSync(password, 10);

  await usersRepo
    .create(user)
    .then((id) => {
      // send token so the new user stay logged
      const token = jwt.sign({ sub: id }, serverRuntimeConfig.secret, {
        expiresIn: "7d",
      });

      return res.status(200).json({
        message: `Usuário ${user.username} criado com sucesso`,
        token,
      });
    })
    .catch((err) => {
      return res.status(409).json({
        message: err,
      });
    });
}
