import mongoose from "mongoose";

const commentsSchema = mongoose.Schema({
  candidate_id: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
  employer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Employer" },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  type: { type: String, required: true },
}, {
  timestamps: true
});

const Comments = mongoose.model("Comment", commentsSchema);
export default Comments;