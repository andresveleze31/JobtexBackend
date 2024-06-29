import express from "express";
import { changePassword, createFavoriteCandidate, deleteFavoriteCandidate, getEmployers, getFavoriteCandidate, getFavoriteCandidates, getGeneralEmployer, getMessages, getProfile, loginEmployer, profile, registerEmployer, updateProfile, validatePassword } from "../controllers/employerController.js";
import checkAuthEmployer from "../middleware/checkAuthEmployer.js";

const router = express.Router();


router.post("/register", registerEmployer);
router.post("/login", loginEmployer);
router.get("/profile", checkAuthEmployer ,profile);

router.get("/get-profile/:id", getProfile);
router.put("/update-profile/:id", checkAuthEmployer, updateProfile);

router.get("/get-all-employers", getEmployers);
router.get("/get-employer/:id", getGeneralEmployer);


router.post("/create-favorite-candidate", checkAuthEmployer, createFavoriteCandidate);
router.get("/get-favorite-candidate/:employer_id/:candidate_id", getFavoriteCandidate);
router.get("/get-favorites-candidate/:id", checkAuthEmployer, getFavoriteCandidates);
router.delete(
  "/delete-favorite-candidate/:id",
  checkAuthEmployer,
  deleteFavoriteCandidate
);

router.post("/validate-password/:id/:password", validatePassword)
router.post("/change-password/:id/:password", changePassword);

router.get("/get-messages/:employer_id", getMessages);


export default router;