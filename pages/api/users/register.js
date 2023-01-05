const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

import { apiHandler, usersRepo } from 'helpers/api';

export default apiHandler({
    post: register
});

function register(req, res) {
    // split out password from user details 
    const { password, ...user } = req.body;

    // hash password
    user.hash = bcrypt.hashSync(password, 10);    

    usersRepo.create(user).then((id) => {
        console.log(id);

        // send token so the new user stay logged
        const token = jwt.sign({ sub: id }, serverRuntimeConfig.secret, { expiresIn: '7d' });

        return res.status(200).json({
            message: `Usuário ${user.username} criado com sucesso`,
            token
        });
    }).catch((err) => {
        throw err
    });
    
}
