import mongoose from "mongoose";

const socialCandidateSchema = mongoose.Schema({
  candidate_id: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
  social_id: { type: mongoose.Schema.Types.ObjectId, ref: "Social" },
  url: { type: String, required: true },
});

const SocialCandidate = mongoose.model(
  "SocialCandidate",
  socialCandidateSchema
);
export default SocialCandidate;
