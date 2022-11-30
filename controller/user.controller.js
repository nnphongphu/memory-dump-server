import { signIn, signUp } from "../use-case/user.use-case.js";

export const signInController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await signIn(email, password);
        res.cookie('token', result, { maxAge: 60 * 60 * 1000, httpOnly: true });
        res.status(200).send("Sign in successfully!");
    } catch (error) {
        let code = 500;
        if (error.message == "Email does not exist") code = 404;
        else if (error.message == "Invalid credentials") code = 400;
        res.status(code).send(error);
    }
}

export const signUpController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await signUp(email, password);
        res.cookie('token', result, { maxAge: 60 * 60 * 1000, httpOnly: true });
        res.status(201).send("Sign up successfully!");
    } catch (error) {
        let code = 500;
        if (error.message == "User already exists") code = 400;
        res.status(code).send(error);
    }
}

export const signOutController = async (req, res) => {
    res.clearCookie('token');
    res.status(200).send("Log out successfully!");
}