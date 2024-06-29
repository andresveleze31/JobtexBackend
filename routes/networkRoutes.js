import express from "express";
import checkAuthCandidate from "../middleware/checkAuthCandidate.js";
import { createSocialCandidate, createSocialEmployer, getSocialCandidate, getSocialEmployer, getSocialsCandidate, getSocialsEmployer, updateSocialCandidate, updateSocialEmployer } from "../controllers/networksController.js";
import checkAuthEmployer from "../middleware/checkAuthEmployer.js";

const router = express.Router();

router.post("/create-network", checkAuthCandidate ,createSocialCandidate);
router.put("/update-network/:id", checkAuthCandidate, updateSocialCandidate);
router.get("/get-network", checkAuthCandidate , getSocialCandidate );
router.get("/get-candidate-networks/:id" , getSocialsCandidate );


router.post("/create-network-employer", checkAuthEmployer, createSocialEmployer);
router.put("/update-network-emp/:id", checkAuthEmployer, updateSocialEmployer);
router.get("/get-network-employer", checkAuthEmployer, getSocialEmployer);
router.get("/get-employer-networks/:id", getSocialsEmployer);

export default router;