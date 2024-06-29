import mongoose from "mongoose";

const stateSchema = mongoose.Schema({
  state: { type: String, required: true },
});

const State = mongoose.model("State", stateSchema);
export default State;
