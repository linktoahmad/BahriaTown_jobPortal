const express = require("express");
const router = express.Router();
const Applicants = require("../db/JobApplicant");
const Recruiters = require("../db/Recruiter");
const Jobs = require("../db/Job");
const Applications = require("../db/Application");

router.get("/admin/users", (req, res) => {
  Applicants.find({}, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  })
    .then(console.log("req listened"))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/admin/recruiters", (req, res) => {
  Recruiters.find({}, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  })
    .then(console.log("req listened"))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/admin/jobs", (req, res) => {
  Jobs.find({}, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  })
    .then(console.log("req listened"))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/admin/count", async (req, res) => {
  let a = new Date();
  a.setHours(0);
  let b =new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000)
  b.setHours(0)
  let c =new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000)
  c.setHours(0)
  let d =new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000)
  d.setHours(0)
  let e =new Date(new Date().getTime() - 4 * 24 * 60 * 60 * 1000)
  e.setHours(0)
  let f =new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000)
  f.setHours(0)
  let g =new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000)
  g.setHours(0)
  let result = {
    jobCount: await Jobs.countDocuments(),
    UserCount: await Applicants.countDocuments(),
    ApplicationCount: await Applications.countDocuments(),

    userStatus: [
      await Applicants.countDocuments({
        dateOfCreation: {
          $gte: g,
          $lt: f
        },
      }),
      await Applicants.countDocuments({
        dateOfCreation: {
          $gte: f,
          $lt: e,
        },
      }),
      await Applicants.countDocuments({
        dateOfCreation: {
          $gte: e,
          $lt: d,
        },
      }),
      await Applicants.countDocuments({
        dateOfCreation: {
          $gte: d,
          $lt: c,
        },
      }),
      await Applicants.countDocuments({
        dateOfCreation: {
          $gte: c,
          $lt: b,
        },
      }),
      await Applicants.countDocuments({
        dateOfCreation: {
          $gte: b,
          $lt: a,
        },
      }),
      await Applicants.countDocuments({
        dateOfCreation: {
          $gte: a,
          $lt: new Date(),
        },
      }),
    ],
    jobStatus: [
      await Jobs.countDocuments({
        dateOfPosting: {
          $gte: g,
          $lt: f
        },
      }),
      await Jobs.countDocuments({
        dateOfPosting: {
          $gte: f,
          $lt: e,
        },
      }),
      await Jobs.countDocuments({
        dateOfPosting: {
          $gte: e,
          $lt: d,
        },
      }),
      await Jobs.countDocuments({
        dateOfPosting: {
          $gte: d,
          $lt: c,
        },
      }),
      await Jobs.countDocuments({
        dateOfPosting: {
          $gte: c,
          $lt: b,
        },
      }),
      await Jobs.countDocuments({
        dateOfPosting: {
          $gte: b,
          $lt: a,
        },
      }),
      await Jobs.countDocuments({
        dateOfPosting: {
          $gte: a,
          $lt: new Date(),
        },
      }),
    ],
    
  };
  res.json(result);
});

module.exports = router;
