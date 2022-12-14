import express from "express";
import {
  signInController,
  signUpController,
} from "../controller/user.controller.js";

const router = express.Router();

router.post("/signIn", signInController);
router.post("/signUp", signUpController);

export default router;
