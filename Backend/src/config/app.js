const express = require("express");
const http = require("http");
const cors = require("cors");
const healthcareProvidersRoutes = require("../Routes/healthcareProvidersRoutes");

const serverCreation = () => {
  try {
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use("/provider", healthcareProvidersRoutes);

    const server = http.createServer(app);
    return server;
  } catch (error) {
    console.log("server creation error: ", error);
  }
};

module.exports = serverCreation;
