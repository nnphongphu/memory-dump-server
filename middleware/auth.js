import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

const auth = async (req, res, next) => {
  try {
    const token = req.cookies["token"];
    let decodedData;
    decodedData = jwt.verify(token, JWT_SECRET);
    req.userId = decodedData?.id;  
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;