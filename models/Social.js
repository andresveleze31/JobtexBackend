import mongoose from "mongoose";

const socialSchema = mongoose.Schema({
  social_name: { type: String, required: true },
  imagen: { type: String},
});

const Social = mongoose.model("Social", socialSchema);
export default Social;
