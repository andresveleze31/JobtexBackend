import express from "express";
import { getCategories, getGenders, getIndustries, getJobTypes, getLanguages, getLevels, getLocations, getQualification, getSalaryType, getSocialNetworks, sendMessage, upload, uploadFiles } from "../controllers/foreignController.js";


const router = express.Router();


router.get("/genders", getGenders);
router.get("/salaryType", getSalaryType);
router.get("/qualification", getQualification);
router.get("/categories", getCategories);
router.get("/languages", getLanguages);
router.get("/locations", getLocations);
router.get("/socials", getSocialNetworks);
router.get("/job-types", getJobTypes);
router.get("/industries", getIndustries);
router.get("/levels", getLevels);
router.post("/upload", upload.single("file") , uploadFiles);
router.post("/send-message", sendMessage);

export default router;