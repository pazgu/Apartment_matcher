const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");

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

  // Define the message you want to send to the Python script
  const message = "Hello from Node.js";

  // Spawn a new Python process and pass the message as an argument
  const pythonProcess = spawn("python", ["data/ML_modules/test.py", message]);

  // Collect data from the Python script
  pythonProcess.stdout.on("data", (data) => {
    const result = data.toString();
    console.log("Python script output:", result);
  });

  // Handle any errors
  pythonProcess.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python script exited with code ${code}`);
  });

  const apartmentsRoute = require("./routers/apartment.route");

  app.use("/api/apartments", apartmentsRoute);

  app.listen(PORT, () => console.log(`app runing on port ${PORT}`));
}

main();
