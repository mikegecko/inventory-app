#! /usr/bin/env node
console.log('This script populates db with some placeholder items. Specified database as argument - e.g.: node populatedb "mongodb+srv://mjgeko:<password>@cluster0.ftvxotu.mongodb.net/?retryWrites=true&w=majority"');
const mongoose = require("mongoose");
const Inventory = require('../models/inventory');
mongoose.set("strictQuery", false);
const userArgs = process.argv.slice(2);
const mongoDB = userArgs[0];

const items = [
  {
    title: "Item 1",
    description: "This is item 1",
    price: 10.99,
    quantity: 50,
    added: new Date(),
  },
  {
    title: "Item 2",
    description: "This is item 2",
    price: 15.99,
    quantity: 20,
    added: new Date(),
  },
  {
    title: "Item 3",
    description: "This is item 3",
    price: 5.99,
    quantity: 100,
    added: new Date(),
  },
];
main().catch((err) => console.log(err));
async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await itemCreate();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function itemCreate() {
  // loop through the items and create new inventory objects for each
  for (let i = 0; i < items.length; i++) {
    const inventoryItem = new Inventory({
      title: items[i].title,
      description: items[i].description,
      price: items[i].price,
      quantity: items[i].quantity,
      added: items[i].added
    });
    // save the inventory item to the database
    await inventoryItem.save();
  }
}
