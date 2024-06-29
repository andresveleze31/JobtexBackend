import express from "express";
import { changePassword, createComment, createEducation, createExperience, createFavoriteJob, deleteFavoriteJob, getCandidate, getCandidates, getCommentsCandidate, getCommentsEmployer, getEducation, getExperience, getFavoriteJob, getFavoriteJobs, getMessages, getProfile, loginCandidate, profile, registerCandidate, updateEducation, updateExperience, updateProfile, validatePassword } from "../controllers/candidateController.js";
import checkAuthCandidate from "../middleware/checkAuthCandidate.js";
import multer from "multer";
import path from "path";


const router = express.Router();

router.post('/register', registerCandidate);
router.post("/login", loginCandidate);
router.get("/profile", checkAuthCandidate, profile);
router.get("/get-profile/:id", checkAuthCandidate, getProfile);

router.post("/create-education/:id", checkAuthCandidate, createEducation);
router.get("/get-education/:id", getEducation);
router.put("/update-education/:id", checkAuthCandidate ,updateEducation );

router.post("/create-experience/:id", checkAuthCandidate, createExperience);
router.get("/get-experience/:id", getExperience);
router.put("/update-experience/:id", checkAuthCandidate, updateExperience);

router.put("/profile-update/:id",checkAuthCandidate ,updateProfile );

router.get("/get-candidates", getCandidates);
router.get("/get-candidate/:id", getCandidate );

router.post("/create-favorite-job", checkAuthCandidate, createFavoriteJob);
router.get("/get-favorite-job/:job_id/:candidate_id", getFavoriteJob);
router.get("/get-favorites-jobs/:id", checkAuthCandidate, getFavoriteJobs);
router.delete("/delete-favorite-job/:id", checkAuthCandidate, deleteFavoriteJob);


router.post("/validate-password/:id/:password", validatePassword);
router.post("/change-password/:id/:password", changePassword);

router.get("/get-messages/:candidate_id", getMessages);

router.post("/create-comment", createComment);
router.get("/get-comments/:candidate_id/:type", getCommentsCandidate);
router.get("/get-comments-employer/:employer_id/:type", getCommentsEmployer)

export default router;