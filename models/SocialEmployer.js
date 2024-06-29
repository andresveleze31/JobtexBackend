import mongoose from "mongoose";

const socialEmployerSchema = mongoose.Schema({
  employer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Employer" },
  social_id: { type: mongoose.Schema.Types.ObjectId, ref: "Social" },
  url: { type: String, required: true },
});

const SocialEmployer = mongoose.model("SocialEmployer", socialEmployerSchema);
export default SocialEmployer;
