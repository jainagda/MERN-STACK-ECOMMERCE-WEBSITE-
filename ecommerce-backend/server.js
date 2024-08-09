const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

dotenv.config({ path: "ecommerce-backend/config/config.env" });

//handle uncaught error

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise Rejection`);
  process.exit(1);
});

// connect to dastabase after config

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// unhandler Promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
