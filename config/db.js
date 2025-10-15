const mongoose = require("mongoose");

const DBconnect = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("database connected successfully");
};

module.exports = { DBconnect };
