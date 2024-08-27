const express =require("express")
const app = express();

const ErrorMiddleware = require("./middleware/error")
const cookieParser = require("cookie-parser")
// Middleware to parse JSON requests
app.use(express.json()); // Make sure this is included
app.use(cookieParser())
// route Imports

const products = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute")

app.use("/api/v1",products)
app.use("/api/v1",user)

app.use("/api/v1",order)
// middleware for error
app.use(ErrorMiddleware)
module.exports = app