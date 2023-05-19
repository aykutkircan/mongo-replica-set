const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// mongoose helpers
const connectDB = require("./helper/connect");
const insertModels = require("./helper/insertModels");

// sharding helpers
const runTransaction = require("./libs/transaction");
const runWithoutTransaction = require("./libs/non-transaction");

const SHARDING = true;

// initiliaze func
async function initiliaze() {
  try {
    const { connection } = await connectDB(SHARDING);
    const { UserModel, JobMobel } = await insertModels();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.post("/", async (req, res) => {
      try {
        const handler = SHARDING ? runTransaction : runWithoutTransaction;

        const { user, job } = await handler(connection);

        return res.json({ status: "success", data: { user, job } }).status(200);
      } catch (error) {
        console.log("err: ", error);
        return res.json(error.message).status(400);
      }
    });

    app.listen(3000, () => {
      console.log("Sunucu 3000 numaralı porta başlatıldı.");
    });
  } catch (error) {
    console.log("Something goes wrong", error.message);
    process.exit(0);
  }
}

initiliaze();
