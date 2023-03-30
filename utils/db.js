const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

const mongoDB =`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_KEY}@cluster0.ftvxotu.mongodb.net/?retryWrites=true&w=majority`

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}