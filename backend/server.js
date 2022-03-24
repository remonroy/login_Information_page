const app = require("./app");
const cloudinary = require("cloudinary").v2;
const databaseConnect = require("./config/databaseConnect");

//config file connect
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// uncaughtException Error
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("Unhandled Uncaught Exception");
  process.exit(1);
});

//Database connect
databaseConnect();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is rung port = ${process.env.port}`);
});

// unHandleRejection Error
process.on("unhandledRejection", (error) => {
  console.log(`Error :${error.message}`);
  console.log("Unhandled Promise Rejections");
  server.close(() => {
    process.exit(1);
  });
});
