const AdminMiddleware = (req, res, next) => {
  console.log("Admin middleware");
  const token = "xyz";
  if (token === "xyz") {
    next();
  } else {
    res.status(401).send("Unauthorized Access");
  }
};

module.exports = AdminMiddleware;
