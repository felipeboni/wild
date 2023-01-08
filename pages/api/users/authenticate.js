const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

import { apiHandler, usersRepo } from "helpers/api";

export default apiHandler({
    post: authenticate
});

async function authenticate(req, res) {
    const { username, password } = req.body;
    const user = await usersRepo.find(username);

    // validate
    if (!(user && bcrypt.compareSync(password, user.hash))) {
        throw 'Usuário ou senha incorretos';
    }

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });

    // return basic user details and token
    return res.status(200).json({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token
    });
}
