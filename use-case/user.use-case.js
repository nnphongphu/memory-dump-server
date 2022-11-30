
import UserDb from "../data-access/user.db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const signIn = async (email, password) => {  
    const oldUser = await UserDb.findOne({ email });
    if (!oldUser) throw Error("Email does not exist");
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) throw Error("Invalid credentials");
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, JWT_SECRET, { expiresIn: "1h" });
    return token;
};
  
export const signUp = async (email, password) => {
    const oldUser = await UserDb.findOne({ email });
    if (oldUser) throw Error("User already exists");
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserDb.insert({ email, password: hashedPassword, images: [] });
    const token = jwt.sign({ email: result.email, id: result._id }, JWT_SECRET, { expiresIn: "1h" });
    return token;
};