const express =require("express")
const app = express();

const ErrorMiddleware = require("./middleware/error")
// Middleware to parse JSON requests
app.use(express.json()); // Make sure this is included
// route Imports

const products = require("./routes/productRoute");

app.use("/api/v1",products)


// middleware for error
app.use(ErrorMiddleware)

module.exports = app