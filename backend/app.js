const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var path = require("path");

const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(cors());
// app.use(fileUpload());
// app.use(fileUpload({ useTempFiles: true }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

const loggingRouter = require("./routes/userLogingRoute.js");
const errorMiddleware = require("./middleWare/error");

//router use
app.use("/api/v1", loggingRouter);

app.use(express.static(path.join(__dirname, "../frontend/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

//New code add
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "../frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});
//New code end

//error handling use
app.use(errorMiddleware);

module.exports = app;
