import mongoose from "mongoose";

const typeJobSchema = mongoose.Schema({
  type: { type: String, required: true },
});

const TypeJob = mongoose.model("TypeJob", typeJobSchema);
export default TypeJob;
