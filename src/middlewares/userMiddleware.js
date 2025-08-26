
const userMiddleware = (req, res, next) => {
  console.log("user middleware");
  const token = "xydz";
  if (token === "xyz") {
    next();
  } else {
    res.status(401).send("Unauthorized Access");
  }
};


module.exports = userMiddleware