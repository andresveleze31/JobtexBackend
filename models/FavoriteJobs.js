import mongoose from "mongoose";

const favoriteJobsSchema = mongoose.Schema({
  job_id: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  candidate_id: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
});

const FavoriteJobs = mongoose.model("FavoriteJobs", favoriteJobsSchema);
export default FavoriteJobs;
