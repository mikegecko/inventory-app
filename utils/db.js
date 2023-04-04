const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_CONNECTION_STRING;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}