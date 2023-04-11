const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_CONNECTION_STRING;

db_connect().catch((err) => console.log(err));
async function db_connect() {
  await mongoose.connect(mongoDB, {
    bufferCommands: false, //Allows larger payloads
  });
}

module.exports = { db_connect }