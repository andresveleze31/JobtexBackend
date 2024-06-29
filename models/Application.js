import mongoose from "mongoose";

const applicationSchema = mongoose.Schema(
  {
    job_id: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    candidate_id: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
    state_id: { type: mongoose.Schema.Types.ObjectId, ref: "State" },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);
export default Application;
