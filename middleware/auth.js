import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw Error("Authentication failed");
    let decodedData;
    decodedData = jwt.verify(token, JWT_SECRET);
    req.userId = decodedData?.id;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

export default auth;
