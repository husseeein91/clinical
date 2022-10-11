const jwt = require("jsonwebtoken");
const config = require("config");
const Admin = require("../models/Admin");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ msg: "No Token, Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

const isAdmin = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ msg: "No Token, Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    admin = await Admin.findById(decoded.admin.id);
    if (admin) {
      req.user = decoded.admin.id;
      next();
    } else {
      res
        .status(401)
        .json({ msg: "you are not Authorized to make this action" });
    }
  } catch (e) {
    console.error(e);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

const middleware = {
  auth,
  isAdmin,
};

module.exports = middleware;
