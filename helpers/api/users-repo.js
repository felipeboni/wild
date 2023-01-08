var mysql = require("mysql");
const util = require("util");

export const usersRepo = {
  // getAll: () => users,
  // getById: (id) => users.find((x) => x.id.toString() === id.toString()),
  find,
  create,
  // update,
  // delete: _delete,
};

function connect() {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    //   timezone: "-3"
  });

  return connection;
}

async function find(username) {
  const connection = connect();
  if (connection.state === "disconnected") connection.connect();

  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (err, result) => {
        connection.end();
        return err ? reject(err) : resolve(result[0]);
      }
    );
  });
}

async function create(user) {
  const connection = connect();
  connection.connect();

  // set date created and updated
  user.dateCreated = Date.parse(new Date().toISOString());
  user.dateUpdated = Date.parse(new Date().toISOString());

  // temporary until we implement steam auth
  user.steamid64 = "0";
  // user.steamid64 = "76561198062064740";

  try {
    await connection.query(
      "INSERT INTO users (username, firstName, lastName, avatar, hash, steamid64, dateCreated, dateUpdated) VALUES (?)",
      [Object.values(user)]
    );

    console.log(`Usuário ${user.username} criado`);
  } catch (err) {
    throw err;
  } finally {
    const { id } = await find(user.username);

    return id;
  }
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
