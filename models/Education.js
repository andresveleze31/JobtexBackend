import mongoose from "mongoose";

const educationSchema = mongoose.Schema({
  candidate_id: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
  title: { type: String, required: true },
  academy: { type: String, required: true },
  years: { type: String, required: true },
  description: { type: String, required: true },
});

const Education = mongoose.model("Education", educationSchema);
export default Education;
