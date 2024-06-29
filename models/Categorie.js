import mongoose from "mongoose";

const categorieSchema = mongoose.Schema({
  categorie: { type: String, required: true },
});

const Categorie = mongoose.model("Categorie", categorieSchema);
export default Categorie;
