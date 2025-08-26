const exp = require("express");

const app = exp();

const PORT = 7777;

app.use(
  "/user",
  (req, res, next) => {
    // res.send("Request handler 1");
    console.log("Request handler 1");
    next();
  },
  (req, res, next) => {
    console.log("Request handler 2");
    // res.send("Request handler 2");
    next();
  },
  (req, res, next) => {
    console.log("Request handler 3");
    // res.send("Request handler 3");
    next();
  },
  (req, res, next) => {
    console.log("Request handler 4");
    res.send("Request handler 4");
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
