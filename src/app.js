const exp = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const validator = require("validator");

const app = exp();

const PORT = 7777;

app.use(exp.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User signed up successfully");
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).send(error?.message);
  }
});

app.get("/getUsers", async (req, res) => {
  try {
    const results = await User.find({});
    res.send(results);
  } catch (error) {
    console.error("unable to fetch users", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/getUsers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await User.findById(id);
    res.send(results);
  } catch (error) {
    console.error("unable to fetch users", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id :", id);
    await User.findByIdAndDelete(id);
    res.send("Successfully deleted..!");
  } catch (error) {
    console.error("unable to fetch users", error);
    res.status(500).send("Internal Server Error");
  }
});

app.patch("/updateUser/:id", async (req, res) => {
  try {
    const tempData = req.body;
    const { id } = req.params;

    const ALLOWED_UPDATE = ["lastName", "password", "age", "profileUrl"];
    const isUpdateAllowed = Object.keys(ALLOWED_UPDATE)?.every((k) =>
      ALLOWED_UPDATE.includes(k)
    );

    if (!isUpdateAllowed) {
      res.status(400).send("Now allowed to update")
    }

    const result = await User.findByIdAndUpdate(id, tempData, {
      returnDocument: "after"
    });
    res.send(result);
  } catch (error) {
    console.error("unable to fetch users", error);
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
