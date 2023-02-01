const jobRouter = require("express").Router();
const Job = require("../models/job");

//! create Job
jobRouter.post("/", async (req, res) => {
  const newJob = new Job(req.body);
  try {
    const savedJob = await newJob.save();

    res.status(200).send(savedJob);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//! get all jobs
jobRouter.get("/", async (req, res) => {
  try {
    const allJobs = await Job.find();

    res.status(200).send(allJobs);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//!follow job
jobRouter.put("/like", async (req, res) => {
  try {
    console.log(req.body);
    const job = await Job.findOne({ name: req.body.name });
    //!populate
    // const job = await Job.findOne({ name: req.body.name })
    //   .populate("username")
    //   .exec((err, job) => {
    //     if (err) return console.error(err);
    //   });
    console.log(job);
    if (!job.followers.includes(req.body.username)) {
      await job.updateOne({ $push: { followers: req.body.username } });
      res.status(200).send("like added to the post");
    } else {
      await job.updateOne({ $pull: { followers: req.body.username } });
      res.status(200).send("post unliked");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
module.exports = jobRouter;
