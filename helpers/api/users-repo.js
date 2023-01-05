import Db from 'mysql2-async'

const connection = new Db({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "",
  database: "wild",
});

// users in JSON file for simplicity, store in a db for production applications

export const usersRepo = {
  // getAll: () => users,
  // getById: (id) => users.find((x) => x.id.toString() === id.toString()),
  find,
  create,
  // update,
  // delete: _delete,
};

async function create(user) {
  // set date created and updated
  user.dateCreated = Date.parse(new Date().toISOString());
  user.dateUpdated = Date.parse(new Date().toISOString());

  // temporary until we implement steam auth
  user.steamid64 = "0";
  // user.steamid64 = "76561198062064740";

  // Insert user
  const id = await connection.insert("INSERT INTO users (username, firstName, lastName, avatar, hash, steamid64, dateCreated, dateUpdated) VALUES (?)", [Object.values(user)])
  .then(async () => {
      console.log(`Usuário ${user.username} criado`);

      // If user has been created successfully, get this user ID
      return await connection.getval(`SELECT id FROM wild.users WHERE username = ?`, [user.username]);
  })
  .catch((err) => {
    if (err.errno === 1062) throw `Usuário ${user.username} já existe`
    throw err;
  });

  return id;
}

function find(profile) {
  const { username } = profile;

  connection.query("SELECT username FROM users WHERE username = ?", [username], (err, [user]) => {
    if (err) throw err;

    return user;
  });

}

// function update(id, params) {
//   const user = users.find((x) => x.id.toString() === id.toString());

//   // set date updated
//   user.dateUpdated = new Date().toISOString();

//   // update and save
//   Object.assign(user, params);
//   saveData();
// }

// // prefixed with underscore '_' because 'delete' is a reserved word in javascript
// function _delete(id) {
//   // filter out deleted user and save
//   users = users.filter((x) => x.id.toString() !== id.toString());
//   saveData();
// }

// // private helper functions

// function saveData() {


//   fs.writeFileSync("data/users.json", JSON.stringify(users, null, 4));
// }
