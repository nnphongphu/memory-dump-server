import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.Authorization.split(" ")[1];
    let decodedData;
    decodedData = jwt.verify(token, JWT_SECRET);
    req.userId = decodedData?.id;  
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;