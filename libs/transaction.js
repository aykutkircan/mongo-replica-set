const jobData = require("../constants/jobData");

async function runTransaction(client) {
  // models
  const UserModel = client.model("User");
  const JobModel = client.model("Job");

  // find a user
  const user = await UserModel.findOne({
    user_email: "aykut.kircan@kns.com.tr",
  });
  if (!user) {
    throw new Error("User not found");
  }

  // start transaction session
  const session = await client.startSession();
  try {
    await session.startTransaction();

    // create job
    const newJob = await JobModel.create(
      [{ ...jobData, job_poster: user._id }],
      {
        session,
      }
    );
    console.log("Created new job successfully!");

    /**
     * make any mistake
     */
    // console.log("aykut: ", aykut); // aykut is not defined
    /**
     * make any mistake
     */

    // update user's job list
    const addedToUser = await UserModel.findByIdAndUpdate(
      user._id,
      {
        $addToSet: { user_jobs: newJob[0]._id },
        updatedAt: new Date(),
      },
      { new: true, session }
    );
    console.log("Successfully added job to user's jobs list");

    await session.commitTransaction();
    console.log("Transaction committed successfully!");

    return {
      user: addedToUser,
      job: newJob,
    };
  } catch (err) {
    await session.abortTransaction();
    console.log("Transaction aborted!");
    throw err;
  } finally {
    await session.endSession();
    console.log("finally end.");
  }
}

module.exports = runTransaction;
