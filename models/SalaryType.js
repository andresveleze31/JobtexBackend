import mongoose from "mongoose";

const salaryTypeSchema = mongoose.Schema({
  salaryType: { type: String, required: true },
});

const SalaryType = mongoose.model("SalaryType", salaryTypeSchema);
export default SalaryType;
