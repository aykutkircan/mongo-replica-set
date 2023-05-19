const mongoose = require("mongoose");

const userData = {
  user_name: "Aykut",
  user_email: "aykut.kircan@kns.com.tr",
};

async function insertModels() {
  try {
    // insert User model
    const userSchema = new mongoose.Schema({
      user_name: String,
      user_email: String,
      user_jobs: [mongoose.Schema.Types.ObjectId],
      cretedAt: { type: Date, default: new Date() },
      updatedAt: { type: Date, default: new Date() },
    });

    // insert Job model
    const jobSchema = new mongoose.Schema({
      job_title: String,
      job_location: String,
      job_salary: String,
      job_poster: mongoose.Schema.Types.ObjectId,
      cretedAt: { type: Date, default: new Date() },
      updatedAt: { type: Date, default: new Date() },
    });

    const userCollection = mongoose.model("User", userSchema);
    const jobCollection = mongoose.model("Job", jobSchema);

    await userCollection.findOneAndUpdate(
      { user_email: "aykut.kircan@kns.com.tr" },
      { ...userData },
      { upsert: true }
    );

    return {
      UserModel: userCollection,
      JobMobel: jobCollection,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = insertModels;
