const exp = require("express");

const app = exp();

const PORT = 7777;

app.get("/user", (req, res) => {
  try {
    throw new Error("User not found");
    res.send("User Route");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/admin", (req, res) => {
  throw new Error("Admin not found");
  res.send("Admin Route");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
