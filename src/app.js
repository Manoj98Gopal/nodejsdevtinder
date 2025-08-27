const exp = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = exp();

const PORT = 7777;

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Prem",
    lastName: "Kumar",
    emailId: "prem@example.com",
    password: "paremord123",
    age: 45,
    gender: "Male"
  };

  const user = new User(userObj);

  try {
    await user.save();
    res.send("User signed up successfully");
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).send("Internal Server Error");
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
