import mongoose from "mongoose";

const experienceSchema = mongoose.Schema({
  candidate_id: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
  title: { type: String, required: true },
  company: { type: String, required: true },
  years: { type: String, required: true },
  description: { type: String, required: true },
});

const Experience = mongoose.model("Experience", experienceSchema);
export default Experience;
