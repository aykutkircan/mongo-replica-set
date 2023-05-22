const mongoose = require("mongoose");

const url1 = "mongodb://admin:admin@localhost:27100/testdb?authSource=admin";
const url2 =
  "mongodb+srv://sharding-user-dev:ngHsC4kn7KLqf8pS@cluster0.bjwtgkq.mongodb.net/sharding-dev";
const url3 =
  "mongodb://sharding-user-staging:admin@localhost:27027/sharding-staging?authSource=admin";

async function connectDB(SHARDING) {
  const connectUrl = SHARDING ? url3 : url1;
  let connection;
  try {
    await mongoose.connect(connectUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
    connection = mongoose.connection;

    return {
      connection,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = connectDB;
