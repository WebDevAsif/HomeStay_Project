const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB.");
  })
  .catch((err) => {
    console.log("Error is : ", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "65f3472bec443864a64c71eb",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data was initialized.");
};

initDB();
