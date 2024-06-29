import path from "path";
import Categorie from "../models/Categorie.js";
import Gender from "../models/Gender.js";
import Language from "../models/Language.js";
import Location from "../models/Location.js";
import Qualification from "../models/Qualification.js";
import SalaryType from "../models/SalaryType.js";
import Social from "../models/Social.js";
import multer from "multer";
import TypeJob from "../models/TypeJob.js";
import Industry from "../models/Industry.js";
import CarrerLevel from "../models/CarrerLevel.js";
import Message from "../models/Message.js";

async function getGenders(req, res) {
  try {
    const genders = await Gender.find();
    res.json(genders);
    console.log("Hola Mundo");
  } catch (error) {
    res.json(error);
  }
}

async function getSalaryType(req, res) {
  try {
    const salaryType = await SalaryType.find();
    res.json(salaryType);
  } catch (error) {
    res.json(error);
  }
}

async function getQualification(req, res) {
  try {
    const qualifications = await Qualification.find();
    res.json(qualifications);
  } catch (error) {
    res.json(error);
  }
}

async function getCategories(req, res) {
  try {
    const categories = await Categorie.find();
    res.json(categories);
  } catch (error) {
    res.json(error);
  }
}

async function getLanguages(req, res) {
  try {
    const languages = await Language.find();
    res.json(languages);
  } catch (error) {
    res.json(error);
  }
}

async function getLocations(req, res) {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.json(error);
  }
}

async function getSocialNetworks(req, res) {
  try {
    const socials = await Social.find();
    res.json(socials);
  } catch (error) {
    res.json(error);
  }
}

async function getJobTypes(req, res) {
  try {
    const jobTypes = await TypeJob.find();
    res.json(jobTypes);
  } catch (error) {
    res.json(error);
  }
}

async function getIndustries(req, res) {
  try {
    const industries = await Industry.find();
    res.json(industries);
  } catch (error) {
    res.json(error);
  }
}

async function getLevels(req, res) {
  try {
    const levels = await CarrerLevel.find();
    res.json(levels);
  } catch (error) {
    res.json(error);
  }
}



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

async function sendMessage(req, res) {
  console.log(
    req.body.candidate_id,
    req.body.employer_id,
    req.body.message,
    req.body.subject
  );

  try {
    const mensaje = await Message.create({
      candidate_id: req.body.candidate_id,
      employer_id: req.body.employer_id,
      message: req.body.message,
      subject: req.body.subject,
    });
    res.json(mensaje);
  } catch (error) {
    res.json(error);
  }
}

async function uploadFiles(req, res) {
  try {
    res.send(req.file.filename);
  } catch (error) {
    console.log(error);
  }
}

export {
  getGenders,
  getLanguages,
  getSalaryType,
  getQualification,
  getCategories,
  getLocations,
  getSocialNetworks,
  getJobTypes,
  getIndustries,
  getLevels,
  uploadFiles,
  upload,
  sendMessage,
};
