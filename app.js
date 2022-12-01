import ImageRouter from "./router/image.router.js";
import UserRouter from "./router/user.router.js";
import { PORT, DATABASE_URL } from "./config.js";
import express from "express";
import mongoose from "mongoose";
import auth from "./middleware/auth.js";

const app = express();
app.use(express.json());

app.get("/ping", auth, (req, res) => {
  res.sendStatus(204);
});
app.use("/image", ImageRouter);
app.use("/user", UserRouter);

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
