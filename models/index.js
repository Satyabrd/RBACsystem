const mongoose = require("mongoose");
const { MONGOURL } = require("../config");


  mongoose.connect(MONGOURL, { useFindAndModify: false }).then(
    () => {
      console.log("successfully Connected to mongoose");
      res();
    },
    err => {
      console.error("Error occurred connecting to mongoose:");
      console.dir(err);
      rej(err);
    },
  );

const connection = mongoose.connection;
module.exports = connection;