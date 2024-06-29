import express from "express";
import checkAuthCandidate from "../middleware/checkAuthCandidate.js";
import { createApplication, deleteApplication, deleteApplicationsJob, getApplication, getApplicationCandidate, getJobsAndApplicationsByEmployer, updateStateApplication } from "../controllers/applicationController.js";
import checkAuthEmployer from "../middleware/checkAuthEmployer.js";

const router = express.Router();

router.post("/create-application", checkAuthCandidate, createApplication);
router.get("/get-application", getApplication );
router.get("/get-application/:id", checkAuthCandidate, getApplicationCandidate);
router.delete("/delete-application/:id", checkAuthCandidate, deleteApplication);
router.get("/get-applications-employer/:id", checkAuthEmployer, getJobsAndApplicationsByEmployer);
router.put("/update-state/:candidate_id/:job_id", checkAuthEmployer, updateStateApplication);

router.delete("/delete-application-jobs/:id", checkAuthEmployer, deleteApplicationsJob);
export default router;