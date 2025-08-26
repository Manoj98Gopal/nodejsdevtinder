const exp = require("express");
const AdminMiddleware = require("./middlewares/admin");
const UserMiddleware = require("./middlewares/userMiddleware");

const app = exp();

const PORT = 7777;

app.use("/admin", AdminMiddleware);

app.get("/admin/getUser", (req, res) => {
  res.send("Sending all users data");
});

app.delete("/admin/deleteUser", (req, res) => {
  res.send("Deleting user data");
});

app.get("/users", UserMiddleware, (req, res) => {
  res.send("Sending all users data");
});

app.post("/users", UserMiddleware, (req, res) => {
  res.send("Creating a new user");
});

app.put("/users", UserMiddleware, (req, res) => {
  res.send(`Updating user with ID`);
});

app.delete("/users", UserMiddleware, (req, res) => {
  res.send(`Deleting user with ID`);
});

app.post("/users/login", (req, res) => {
  res.send(`user login api`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
