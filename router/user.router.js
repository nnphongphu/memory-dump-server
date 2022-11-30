import express from "express";
import { signInController, signOutController, signUpController } from "../controller/user.controller.js";

const router = express.Router();

router.post("/signIn", signInController);
router.post("/signUp", signUpController);
router.post("/signOut", signOutController);
 
export default router;