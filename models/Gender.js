import mongoose from "mongoose";

const genderSchema = mongoose.Schema({
  gender: { type: String, required: true },
});

const Gender = mongoose.model("Gender", genderSchema);
export default Gender;
