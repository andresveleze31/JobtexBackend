import Gender from "../models/Gender.js";

import SalaryType from "../models/SalaryType.js";
import Qualification from "../models/Qualification.js"
import Categorie from "../models/Categorie.js";
import Language from "../models/Language.js";
import Social from "../models/Social.js";
import Location from "../models/Location.js";
import TypeJob from "../models/TypeJob.js";
import Industry from "../models/Industry.js";
import CarrerLevel from "../models/CarrerLevel.js";
import State from "../models/State.js";

const states = [
  {
    state: "Pending",
  },
  {
    state: "Approved",
  },
  {
    state: "Rejected",
  },
];


async function ingresarDatos(){
  await State.insertMany(states);
}

export {
    ingresarDatos
}