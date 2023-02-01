const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const jobRouter = require("./routes/job");
mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/finalTest")
  .then(() => console.log("conectet to mongo db"))
  .catch(() => console.log("coldent connect to mongo db"));
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/login", authRouter);
app.use("/api/job", jobRouter);
app.use("/api/user", userRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`activ on ${port}`));
