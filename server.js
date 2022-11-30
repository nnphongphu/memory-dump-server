import { PORT } from "./config";
import ImageRouter from "./router/image.router";
import UserRouter from "./router/user.router";

const express = require("express");
const app = express();

const databaseUrl = process.env.DATABASE_URL;

app.use("/image", ImageRouter);
app.use("/user", UserRouter);

mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
