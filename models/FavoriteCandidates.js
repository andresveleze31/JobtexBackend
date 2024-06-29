import mongoose from "mongoose";

const favoriteCandidatesSchema = mongoose.Schema({
  employer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Employer" },
  candidate_id: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
});

const FavoriteCandidates = mongoose.model(
  "FavoriteCandidates",
  favoriteCandidatesSchema
);
export default FavoriteCandidates;
