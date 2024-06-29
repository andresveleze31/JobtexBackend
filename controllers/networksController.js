import SocialCandidate from "../models/SocialCandidate.js";
import SocialEmployer from "../models/SocialEmployer.js";

async function createSocialCandidate(req, res) {
  try {
    const socialCandidate = await SocialCandidate.create({
      candidate_id: req.body.candidate_id,
      social_id: req.body.social_id,
      url: req.body.url,
    });

    res.status(200).json(socialCandidate);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function createSocialEmployer(req, res){
  console.log("Creando net emp...")
    try {
      const socialEmp = await SocialEmployer.create({
        employer_id: req.body.employer_id,
        social_id: req.body.social_id,
        url: req.body.url,
      });

      res.status(200).json(socialEmp);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
}

async function updateSocialCandidate(req, res) {
  try {
    const socialCandidate = await SocialCandidate.findOneAndUpdate(
      { _id: req.params.id },
      {
        url: req.body.url,
      }
    );
    res.status(200).json(socialCandidate);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function updateSocialEmployer(req, res){
    try {
      const socialEmp = await SocialEmployer.findOneAndUpdate(
        { _id: req.params.id },
        {
          url: req.body.url,
        }
      );
      res.status(200).json(socialEmp);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
}

async function getSocialCandidate(req, res) {
  console.log(req.query.social_id, req.query.candidate_id);
  try {
    const socialCandidate = await SocialCandidate.find({
      social_id: req.query.social_id,
      candidate_id: req.query.candidate_id,
    });
    res.status(200).json(socialCandidate);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function getSocialEmployer(req, res){
    try {
      const socialEmp = await SocialEmployer.find({
        social_id: req.query.social_id,
        employer_id: req.query.employer_id,
      });
      res.status(200).json(socialEmp);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
}

async function getSocialsCandidate(req, res) {
  const { id } = req.params;

  try {
    const socials = await SocialCandidate.find({ candidate_id: id }).populate("social_id");
    res.status(200).json(socials);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function getSocialsEmployer(req, res){
    const { id } = req.params;

    try {
      const socials = await SocialEmployer.find({ employer_id: id }).populate(
        "social_id"
      );
      res.status(200).json(socials);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
}

export {
  createSocialCandidate,
  updateSocialCandidate,
  getSocialCandidate,
  getSocialsCandidate,
  createSocialEmployer,
  updateSocialEmployer,
  getSocialEmployer,
  getSocialsEmployer,
};
