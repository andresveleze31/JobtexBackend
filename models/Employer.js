import mongoose from "mongoose";
import bcrypt from "bcrypt"

const employerSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    photo: { type: String },
    fullname: { type: String },
    website: { type: String },
    size: { type: Number },
    founded: { type: Number },
    number: { type: Number },
    categorie_id: { type: mongoose.Schema.Types.ObjectId, ref: "Categorie" },
    aboutme: { type: String },
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

employerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    //Si ya esta hasheado...
    next();
  }
  //Si no esta hasheado...
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

employerSchema.methods.comprobarPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Employer = mongoose.model("Employer", employerSchema);
export default Employer;
