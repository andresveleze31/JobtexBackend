import mongoose from "mongoose";
import bcrypt from "bcrypt"

const candidateSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    photo: { type: String },
    fullname: { type: String },
    birth: { type: Number },
    number: { type: Number },
    gender_id: { type: mongoose.Schema.Types.ObjectId, ref: "Gender" },
    age: { type: Number },
    salary: { type: Number },
    salaryType: { type: mongoose.Schema.Types.ObjectId, ref: "SalaryType" },
    qualification_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Qualification",
    },
    experiencetime: { type: Number },
    categorie_id: { type: mongoose.Schema.Types.ObjectId, ref: "Categorie" },
    language_id: { type: mongoose.Schema.Types.ObjectId, ref: "Language" },
    jobtitle: { type: String },
    aboutme: { type: String },
    address: { type: String },
    location_id: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
    long: { type: String },
    lat: { type: String },
    video: { type: String },
    cv: { type: String },
  },
  {
    timestamps: true,
  }
);

candidateSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    //Si ya esta hasheado...
    next();
  }
  //Si no esta hasheado...
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

candidateSchema.methods.comprobarPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Candidate = mongoose.model("Candidate", candidateSchema);
export default Candidate