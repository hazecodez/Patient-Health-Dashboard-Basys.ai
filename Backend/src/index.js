const serverCreation =  require("./config/app");
const connectDatabase = require("./config/database")
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const startServer = async () => {
  try {
    connectDatabase();
    const app = serverCreation();
    app?.listen(3000, () => console.log("Server running on port 3000"));
  } catch (error) {
    console.log("Server starting error:", error);
  }
};

startServer();
