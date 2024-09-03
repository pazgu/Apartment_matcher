const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

dotenv.config(); // Load config

async function main() {
  await connectDB();
  //Middleware - run this for every request
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
  app.use(bodyParser.json());

  const apartmentsRoute = require("./routers/apartment.route");

  app.use("/api/apartments", apartmentsRoute);

  app.listen(PORT, () => console.log(`app runing on port ${PORT}`));
}

main();
