const Hapi = require("@hapi/hapi");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const wisataBudayaRoutes = require("./routes/wisataBudayaRoutes");
const mysql = require("mysql2/promise");

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "0.0.0.0", // <-- ini penting untuk Railway
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });
  
      

  // Setup MySQL pool
  const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "capstone",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  // Inject ke setiap request
  server.ext("onRequest", async (request, h) => {
    request.mysql = pool;
    return h.continue;
  });

  server.route(authRoutes);
  server.route(wisataBudayaRoutes);

  await server.start();
  console.log("✅ Server running on", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
