import express from "express";
import checkAuthEmployer from "../middleware/checkAuthEmployer.js";
import { createJob, deleteJob, getAllJobs, getGeneralJob, getJob, getJobsFromEmployer, updateJob } from "../controllers/jobsController.js";


const router = express.Router();


router.post("/create-job", checkAuthEmployer, createJob  );
router.get("/jobs-employer/:id", checkAuthEmployer, getJobsFromEmployer );
router.get("/get-job/:id", checkAuthEmployer, getJob );
router.put("/update-job/:id", checkAuthEmployer, updateJob);
router.delete("/delete-job/:id", checkAuthEmployer, deleteJob);

router.get("/get-all-jobs", getAllJobs);
router.get("/get-general-job/:id", getGeneralJob);
export default router;