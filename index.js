import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import cors from "cors";

import candidateRoutes from "./routes/candidateRoutes.js";
import employerRoutes from "./routes/employerRoutes.js";
import foreignRoutes from "./routes/foreignRoutes.js";
import networkRoutes from "./routes/networkRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import { ingresarDatos } from "./config/seed.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));

dotenv.config();

conectarDB();

//Configurar CORS.
const whiteList = [process.env.FRONT_URL || "http://localhost:5173"];
const corsOptions = {
    origin: function(origin, callback){
        if(whiteList.includes(origin)){
            //Puede Consultar API
            callback(null, true);
        }else{
            //No esta Permitido
            callback(new Error("Error de Cors"));
        }
    }
}
app.use(cors(corsOptions))



//Routing
app.use("/api/candidates", candidateRoutes);
app.use("/api/foreign", foreignRoutes);
app.use("/api/network", networkRoutes);
app.use("/api/employers", employerRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/applications", applicationRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Escuchando en puerto ${process.env.PORT}`);
})