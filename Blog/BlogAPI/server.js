const express = require("express");
const app = express();
const connectDB = require("./config/db");
const path = require("path");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");
const colors = require("colors");
var cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const auth = require("./routes/authroute");
const posts = require("./routes/postroutes");

//Configuration file
dotenv.config({ path: "./config/config.env" });

// app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:3001'}));

//Connect to DB
connectDB();

//Middleware
app.use(express.json());
app.use(express.urlencoded(true));

// Cookie Parser for sending authentication token back server with every request
app.use(cookieParser());

// Set Security Headers
app.use(helmet());

//File Uploading
app.use(fileupload());

//Set Static folder for file uploading
app.use(express.static(path.join(__dirname, "public")));

//Mounting the Routers
app.use("/api/v1/auth", auth);
app.use("/api/v1/post", posts);

//Listening to servers
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`.blue.bold);
});
