import mongoose from "mongoose";

const qualificationSchema = mongoose.Schema({
  qualification: { type: String, required: true },
});

const Qualification = mongoose.model("Qualification", qualificationSchema);
export default Qualification;
