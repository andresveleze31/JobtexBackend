import jwt from "jsonwebtoken";
import Employer from "../models/Employer.js";

async function checkAuthEmployer(req, res, next){
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.KEYWORD_JWT);

        req.employer = await Employer.findById(decoded.id).select(
          "-password  -updatedAt -__v"
        );
        return next();
      } catch (error) {
        console.log(error);
        return res.status(404).json({ msg: "Error" });
      }
    }

    if (!token) {
      const error = new Error("Invalid Token");
      return res.status(401).json({ msg: error.message });
    }
}

export default checkAuthEmployer;