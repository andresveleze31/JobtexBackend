import Candidate from "../models/Candidate.js";
import Education from "../models/Education.js";
import generarJWT from "../helpers/generarJWT.js";
import multer from "multer";
import Experience from "../models/Experience.js";
import FavoriteJobs from "../models/FavoriteJobs.js";
import Message from "../models/Message.js";
import Comments from "../models/Comment.js";

//Register Candidate
async function registerCandidate(req, res) {
  const { email, password } = req.body;

  const existeUsuario = await Candidate.findOne({ email });

  if (existeUsuario) {
    const error = new Error("This email is already in use");
    return res.status(404).json({ msg: error.message });
  }

  try {
    const candidate = await Candidate.create({ email, password });
    res.json(candidate);
  } catch (error) {
    console.log(error);
  }
}

//Login Candidate
async function loginCandidate(req, res) {
  const { email, password } = req.body;

  try {
    const candidate = await Candidate.findOne({ email });

    if (!candidate) {
      const error = new Error("User does no exist");
      return res.status(404).json({ msg: error.message });
    }

    //Comprobar si el password es igual
    if (await candidate.comprobarPassword(password)) {
      res.json({
        _id: candidate._id,
        email: candidate.email,
        token: generarJWT(candidate._id),
      });
    } else {
      const error = new Error("Invalid Password");
      return res.status(403).json({ msg: error.message });
    }
  } catch (error) {
    console.log(error);
  }
}

async function getProfile(req, res) {
  const { id } = req.params;

  try {
    const candidate = await Candidate.findOne({ _id: id });

    if (!candidate) {
      return res.status(404).json({ error: "Candidate Not Found" });
    }

    return res.json(candidate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getCandidates(req, res) {
  try {
    const candidates = await Candidate.find()
      .populate("location_id")
      .populate("categorie_id")
      .populate("gender_id")
      .populate("language_id")
      .populate("qualification_id")
      .populate("salaryType")
      .sort({ createdAt: -1 });
    res.json(candidates);
  } catch (error) {
    return res.status(403).json({ msg: error.message });
  }
}

async function getCandidate(req, res) {
  try {
    const candidate = await Candidate.findOne({ _id: req.params.id })
      .populate("location_id")
      .populate("categorie_id")
      .populate("gender_id")
      .populate("language_id")
      .populate("qualification_id")
      .populate("salaryType");
    res.json(candidate);
  } catch (error) {
    return res.status(403).json({ msg: error.message });
  }
}

async function updateProfile(req, res) {
  const { id } = req.params;
  console.log(req.body.cv);

  try {
    const profileUpdated = await Candidate.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );

    if (!profileUpdated) {
      return res.status(404).json({ error: "Candidate Not Found" });
    }

    return res.json(profileUpdated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function profile(req, res) {
  res.json(req.candidate);
}

async function createExperience(req, res) {
  const { id } = req.params;
  const { title, company, year, description } = req.body;

  console.log(title, company, year, description);
  try {
    const experience = await Experience.create({
      title,
      company,
      years: year,
      description,
      candidate_id: id,
    });
    res.json(experience);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function createFavoriteJob(req, res) {
  const { job_id, candidate_id } = req.body;

  try {
    const favorites = await FavoriteJobs.create({
      job_id,
      candidate_id,
    });
    res.json(favorites);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getFavoriteJob(req, res) {
  console.log("Ejecutandose");

  const { job_id, candidate_id } = req.params;
  console.log(job_id, candidate_id);

  try {
    const favorite = await FavoriteJobs.findOne({
      job_id,
      candidate_id,
    });
    return res.json(favorite);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getFavoriteJobs = async (req, res) => {
  const { id } = req.params;

  try {
    // Obtener todas las aplicaciones a esos trabajos
    const favorites = await FavoriteJobs.find({
      candidate_id: id,
    }).populate({
      path: "job_id",
      populate: {
        path: "location_id industry_id employer_id", // Agrega los campos que deseas popular aquí
      },
    });

    return res.json(favorites);
  } catch (error) {
    console.error("Error al obtener trabajos y aplicaciones:", error);
    throw error;
  }
};

async function deleteFavoriteJob(req, res) {
  const { id } = req.params;

  try {
    const favorite = await FavoriteJobs.findOneAndDelete({ _id: id });
    if (!favorite) {
      return res.status(404).json({ error: "Job Not Found" });
    }
    return res.json(favorite);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function createEducation(req, res) {
  const { id } = req.params;
  const { title, academy, year, description } = req.body;

  try {
    const education = await Education.create({
      title,
      academy,
      years: year,
      description,
      candidate_id: id,
    });
    res.json(education);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getExperience(req, res) {
  const { id } = req.params;

  try {
    const experience = await Experience.find({ candidate_id: id });
    res.json(experience);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getEducation(req, res) {
  const { id } = req.params;

  try {
    const education = await Education.find({ candidate_id: id });
    res.json(education);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateExperience(req, res) {
  const { id } = req.params;

  try {
    const experienceUpdated = await Experience.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );

    if (!experienceUpdated) {
      return res.status(404).json({ error: "Experience Not Found" });
    }

    return res.json(experienceUpdated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateEducation(req, res) {
  const { id } = req.params;

  try {
    const educationUpdated = await Education.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );

    if (!educationUpdated) {
      return res.status(404).json({ error: "Education Not Found" });
    }

    return res.json(educationUpdated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function changePassword(req, res) {
  const { id } = req.params;
  const { password } = req.params;

  try {
    const candidate = await Candidate.findOne({ _id: id });

    candidate.password = password;
    await candidate.save();

    res.json({ msg: "Password Modified" });
  } catch (error) {
    console.log(error);
  }
}

async function validatePassword(req, res) {
  const { id } = req.params;
  const { password } = req.params;

  try {
    const employer = await Candidate.findOne({ _id: id });

    if (!employer) {
      return res.status(404).json({ error: "Employer not found" });
    }

    if (await employer.comprobarPassword(password)) {
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getMessages(req, res) {
  const { candidate_id } = req.params;

  try {
    const messages = await Message.find({ candidate_id })
      .populate("candidate_id")
      .populate({
        path: "employer_id",
        populate: {
          path: "location_id categorie_id", // Agrega los campos que deseas popular aquí
        },
      })
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createComment(req, res) {
  const {candidate_id, employer_id, rating, comment, type} = req.body;

  try {
    const commenta = await Comments.create({
      candidate_id,
      employer_id,
      rating,
      comment,
      type
    });
    res.json(commenta);
  } catch (error) {
    console.log(error);    
  }
}

async function getCommentsCandidate(req, res) {
  const { candidate_id, type } = req.params;

  try {
    const comments = await Comments.find({
      candidate_id, type
    }).populate("candidate_id").populate("employer_id")
    res.json(comments);
  } catch (error) {
    console.log(error);
  }
}

async function getCommentsEmployer(req, res) {
  const { employer_id, type } = req.params;

  try {
    const comments = await Comments.find({
      employer_id,
      type,
    })
      .populate("candidate_id")
      .populate("employer_id");
    res.json(comments);
  } catch (error) {
    console.log(error);
  }
}

export {
  registerCandidate,
  loginCandidate,
  profile,
  updateProfile,
  getProfile,
  createEducation,
  getEducation,
  updateEducation,
  createExperience,
  updateExperience,
  getExperience,
  getCandidates,
  getCandidate,
  createFavoriteJob,
  getFavoriteJob,
  getFavoriteJobs,
  deleteFavoriteJob,
  changePassword,
  validatePassword,
  getMessages,
  createComment,
  getCommentsCandidate,
  getCommentsEmployer,
};
