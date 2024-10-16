const express = require("express");
const http = require("http");
const cors = require("cors");

const serverCreation = () => {
  try {
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.get("/", (req, res) => res.send("Hello World"));

    const server = http.createServer(app);
    return server;
  } catch (error) {
    console.log("server creation error: ", error);
  }
};


module.exports = serverCreation;