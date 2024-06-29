import mongoose from "mongoose";

const industrySchema = mongoose.Schema({
  industry: { type: String, required: true },
});

const Industry = mongoose.model("Industry", industrySchema);
export default Industry;
