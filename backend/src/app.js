const exp = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const AuthRouter = require("./routers/authRouter");
const ProfileRouter = require("./routers/profileRouter");
const ConnectionRouter = require("./routers/connectionsRouter");
const UserRouter = require("./routers/userRouter");
const cors = require("cors");

const app = exp();
const PORT = 7777;

const ALLOW_ORIGINS = ["http://localhost:5173"];

app.use(
  cors({
    origin: ALLOW_ORIGINS,
    credentials: true
  })
);
app.use(exp.json());
app.use(cookieParser());

app.use(AuthRouter);
app.use(ProfileRouter);
app.use(ConnectionRouter);
app.use(UserRouter);

connectDB()
  .then(() => {
    console.log("Connected to database successfully...");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error.message);
  });
