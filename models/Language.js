import mongoose from "mongoose";

const languageSchema = mongoose.Schema({
  language: { type: String, required: true },
});

const Language = mongoose.model("Language", languageSchema);
export default Language;
