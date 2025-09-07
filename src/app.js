const exp = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const UserValidator = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userMiddleware = require("./middlewares/userMiddleware");

const app = exp();

const PORT = 7777;

app.use(exp.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  UserValidator(req);

  const userData = { ...req.body };
  const hash = await bcrypt.hashSync(userData?.password, 10);
  userData.password = hash;

  const user = new User(userData);
  try {
    await user.save();
    res.send("User signed up successfully");
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).send(error.message);
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const userData = await User.findOne({ emailId });

    if (!userData) {
      throw new Error("Invalid credentials!");
    }

    const isValidUser = await userData.verifyPassword(password);

    if (!isValidUser) {
      throw new Error("Invalid credentials!");
    }

    const jwtToken = await userData.getJwt();

    res.cookie("token", jwtToken);
    res.send("Successfully login !");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/profile", userMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    res.send(userData);
  } catch (error) {
    console.error("profile error :", error);
    res.status(500).send(error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Connected to database successfully...");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
  });
