import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    employer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Employer" },
    description: { type: String, required: true },
    categorie_id: { type: mongoose.Schema.Types.ObjectId, ref: "Categorie" },
    type_id: { type: mongoose.Schema.Types.ObjectId, ref: "TypeJob" },
    published: { type: String },
    deadline: { type: String, required: true },
    salaryType: { type: mongoose.Schema.Types.ObjectId, ref: "SalaryType" },
    minSalary: { type: Number },
    maxSalary: { type: Number },
    industry_id: { type: mongoose.Schema.Types.ObjectId, ref: "Industry" },
    qualification_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Qualification",
    },
    level_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CarrerLevel",
    },
    experiencetime: { type: Number },
    address: { type: String },
    location_id: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
    long: { type: String },
    lat: { type: String },
    video: { type: String },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
