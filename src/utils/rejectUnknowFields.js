const NotAllowUpdateFields = ["email", "password"];

const rejectUnknowFields = (req, res, next) => {

  const isValidFields = Object.keys(req.body).every(
    (field) => !NotAllowUpdateFields.includes(field)
  );

  if (!isValidFields) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid updates!" });
  }
  next();
};


module.exports = rejectUnknowFields