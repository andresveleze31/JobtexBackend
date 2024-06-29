import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    employer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Employer" },
    candidate_id: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
    message: { type: String, required: true },
    subject: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
