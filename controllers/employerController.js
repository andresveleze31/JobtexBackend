import generarJWT from "../helpers/generarJWT.js";
import Employer from "../models/Employer.js";
import FavoriteCandidates from "../models/FavoriteCandidates.js";
import Message from "../models/Message.js";

async function registerEmployer(req, res) {
  const { email, password } = req.body;

  const existeUsuario = await Employer.findOne({ email });

  if (existeUsuario) {
    const error = new Error("This email is already in use");
    return res.status(404).json({ msg: error.message });
  }

  try {
    const employer = await Employer.create({ email, password });
    res.json(employer);
  } catch (error) {
    console.log(error);
  }
}

async function loginEmployer(req, res) {
  const { email, password } = req.body;

  try {
    const employer = await Employer.findOne({ email });

    if (!employer) {
      const error = new Error("User does no exist");
      return res.status(404).json({ msg: error.message });
    }

    if (await employer.comprobarPassword(password)) {
      res.json({
        _id: employer._id,
        email: employer.email,
        token: generarJWT(employer._id),
      });
    } else {
      const error = new Error("Invalid Password");
      return res.status(403).json({ msg: error.message });
    }
  } catch (error) {
    console.log(error);
  }
}

async function profile(req, res) {
  res.json(req.employer);
}

async function getProfile(req, res) {
  const { id } = req.params;

  try {
    const employer = await Employer.findOne({ _id: id });

    if (!employer) {
      return res.status(404).json({ error: "Employer Not Found" });
    }

    return res.json(employer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateProfile(req, res) {
  const { id } = req.params;

  try {
    const profileUpdated = await Employer.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );

    if (!profileUpdated) {
      return res.status(404).json({ error: "Employer Not Found" });
    }

    return res.json(profileUpdated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getEmployers(req, res) {
  try {
    const employers = await Employer.find()
      .populate("location_id")
      .populate("categorie_id")
      .sort({ createdAt: -1 });
    res.json(employers);
  } catch (error) {
    return res.status(403).json({ msg: error.message });
  }
}

async function getGeneralEmployer(req, res) {
  try {
    const employers = await Employer.findOne({ _id: req.params.id })
      .populate("location_id")
      .populate("categorie_id")
      .sort({ createdAt: -1 });
    res.json(employers);
  } catch (error) {
    return res.status(403).json({ msg: error.message });
  }
}

//Favorites Functions.

async function createFavoriteCandidate(req, res) {
  const { employer_id, candidate_id } = req.body;

  try {
    const favorites = await FavoriteCandidates.create({
      employer_id,
      candidate_id,
    });
    res.json(favorites);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getFavoriteCandidate(req, res) {
  const { employer_id, candidate_id } = req.params;
  try {
    const favorite = await FavoriteCandidates.findOne({
      employer_id,
      candidate_id,
    });
    return res.json(favorite);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getFavoriteCandidates = async (req, res) => {
  const { id } = req.params;

  try {
    // Obtener todas las aplicaciones a esos trabajos
    const favorites = await FavoriteCandidates.find({
      employer_id: id,
    }).populate({
      path: "candidate_id",
      populate: {
        path: "location_id", // Agrega los campos que deseas popular aquí
      },
    });

    return res.json(favorites);
  } catch (error) {
    console.error("Error al obtener trabajos y aplicaciones:", error);
    throw error;
  }
};

async function deleteFavoriteCandidate(req, res) {
  const { id } = req.params;

  try {
    const favorite = await FavoriteCandidates.findOneAndDelete({ _id: id });
    if (!favorite) {
      return res.status(404).json({ error: "Job Not Found" });
    }
    return res.json(favorite);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function changePassword(req, res) {
  const { id } = req.params;
  const { password } = req.params;

  try {
    const candidate = await Employer.findOne({ _id: id });

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
    const employer = await Employer.findOne({ _id: id });

    if (!employer) {
      return res.status(404).json({ error: "Employer not found" });
    }

    if (await employer.comprobarPassword(password)) {
      res.json(true);
    }
    else{
      res.json(false);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getMessages(req, res) {
  const { employer_id } = req.params;

  try {
    const messages = await Message.find({ employer_id })
      .populate({
        path: "candidate_id",
        populate: {
          path: "location_id categorie_id", // Agrega los campos que deseas popular aquí
        },
      })
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

export {
  registerEmployer,
  loginEmployer,
  profile,
  getProfile,
  updateProfile,
  getEmployers,
  getGeneralEmployer,
  createFavoriteCandidate,
  deleteFavoriteCandidate,
  getFavoriteCandidate,
  getFavoriteCandidates,
  changePassword,
  validatePassword,
  getMessages,
};
