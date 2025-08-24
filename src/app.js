const exp = require("express");

const app = exp();

const PORT = 7777;

app.use("/hello", (req, res) => {
  res.send("Hello hello hello ...");
});

app.use("/test", (req, res) => {
  res.send("I am testing");
});

app.use((req, res) => {
  res.send("Message from server .... Manoj");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
