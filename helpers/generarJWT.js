import jwt from "jsonwebtoken";

function generarJWT(id) {
  return jwt.sign({ id }, process.env.KEYWORD_JWT, {
    expiresIn: "30d",
  });
}

export default generarJWT;
