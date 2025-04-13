const db = require("../config/db");

const User = {
  create: (data, callback) => {
    db.query("INSERT INTO users SET ?", data, callback);
  },

  findByEmail: (email, callback) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], callback);
  },

  getById: async (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT id, name, email FROM users WHERE id = ?",
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  },
};

module.exports = User;
