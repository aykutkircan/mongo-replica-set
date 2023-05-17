const jobData = require("../constants/jobData");

async function runWithoutTransaction(client) {
  // models
  const UserModel = client.model("User");
  const JobModel = client.model("Job");

  try {
    // find a user
    const user = await UserModel.findOne({
      user_email: "aykut.kircan@kns.com.tr",
    });

    if (!user) {
      throw new Error("User no found");
    }
    // create new job
    const newJob = await JobModel.create({ ...jobData });

    /**
     * make any mistake
     */
    console.log("aykut: ", aykut); // aykut is not defined
    /**
     * make any mistake
     */

    // update user's job list
    const addedToUser = await UserModel.findByIdAndUpdate(
      user._id,
      {
        $addToSet: { user_jobs: newJob._id },
        updatedAt: new Date(),
      },
      { new: true }
    );
    console.log("Successfully added job to user's jobs list");

    return {
      user: addedToUser,
      job: newJob,
    };
  } catch (err) {
    // console.log("aborted!");
    await client.close();
    throw err;
  }
}

module.exports = runWithoutTransaction;
