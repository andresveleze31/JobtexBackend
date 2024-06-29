import mongoose from "mongoose";

const carrerLevelSchema = mongoose.Schema({
  level: { type: String, required: true },
});

const CarrerLevel = mongoose.model("CarrerLevel", carrerLevelSchema);
export default CarrerLevel;
