const mongoose = require("mongoose");

const DatabaseConnect = () => {
  mongoose
    .connect(process.env.DATA_BASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Database is running host http:${data.connection.host}`);
    });
};
module.exports = DatabaseConnect;
