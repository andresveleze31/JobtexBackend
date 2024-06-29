import Job from "../models/Job.js";

async function createJob(req, res) {
  try {
    const job = await Job.create({ ...req.body });
    res.json(job);
  } catch (error) {
    return res.status(403).json({ msg: error.message });
  }
}

async function getJobsFromEmployer(req, res) {
  const { id } = req.params;

  try {
    const jobs = await Job.find({ employer_id: id }).populate("location_id");

    res.json(jobs);
  } catch (error) {
    return res.status(403).json({ msg: error.message });
  }
}

async function getAllJobs(req, res) {
  try {
    const jobs = await Job.find()
      .populate("location_id")
      .populate("employer_id")
      .populate("categorie_id")
      .populate("type_id")
      .populate("salaryType")
      .populate("industry_id")
      .populate("qualification_id")
      .populate("level_id")
      .sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    return res.status(403).json({ msg: error.message });
  }
}

async function getJob(req, res) {
  const { id } = req.params;

  try {
    const job = await Job.findOne({ _id: id });
    res.json(job);
  } catch (error) {
    return res.status(403).json({ msg: error.message });
  }
}

async function getGeneralJob(req, res) {
  const { id } = req.params;

  try {
    const job = await Job.findOne({ _id: id })
      .populate("employer_id")
      .populate("categorie_id")
      .populate("type_id")
      .populate("salaryType")
      .populate("industry_id")
      .populate("qualification_id")
      .populate("level_id")
      .populate("location_id");
    res.json(job);
  } catch (error) {
    return res.status(403).json({ msg: error.message });
  }
}

async function updateJob(req, res) {
  const { id } = req.params;

  try {
    const jobUpdated = await Job.findOneAndUpdate({ _id: id }, { ...req.body });
    if (!jobUpdated) {
      return res.status(404).json({ error: "Job Not Found" });
    }
    return res.json(jobUpdated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteJob(req, res) {
  const { id } = req.params;

  try {
    const jobDeleted = await Job.findOneAndDelete({ _id: id });
    if (!jobDeleted) {
      return res.status(404).json({ error: "Job Not Found" });
    }
    return res.json(jobDeleted);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export {
  createJob,
  getJobsFromEmployer,
  getJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getGeneralJob,
};
