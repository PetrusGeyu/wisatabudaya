const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const generateToken = (userId, email) => {
  return jwt.sign({ id: userId, email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

exports.register = (request, h) => {
  const { name, email, password } = request.payload;

  if (!name || !email || !password) {
    return h.response({ message: "All fields are required" }).code(400);
  }

  return new Promise((resolve, reject) => {
    User.findByEmail(email, (err, users) => {
      if (err) return reject(h.response({ error: err.message }).code(500));
      if (users.length > 0)
        return resolve(h.response({ message: "Email already registered" }).code(400));

      User.create({ name, email, password }, (err, result) => {
        if (err) return reject(h.response({ error: err.message }).code(500));

        const token = generateToken(result.insertId, email);

        resolve(
          h.response({
            message: "User registered",
            token,
            user: { id: result.insertId, name, email },
          }).code(201)
        );
      });
    });
  });
};

exports.login = (request, h) => {
  const { email, password } = request.payload;

  return new Promise((resolve, reject) => {
    User.findByEmail(email, (err, users) => {
      if (err) return reject(h.response({ error: err.message }).code(500));
      if (users.length === 0)
        return resolve(h.response({ message: "User not found" }).code(404));

      const user = users[0];
      if (user.password !== password)
        return resolve(h.response({ message: "Invalid credentials" }).code(401));

      const token = generateToken(user.id, user.email);

      resolve(
        h.response({
          message: "Login successful",
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        }).code(200)
      );
    });
  });
};
