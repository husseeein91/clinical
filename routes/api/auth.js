const express = require("express");
const router = express.Router();
// const { auth, isAdmin } = require("../../middleware/auth");
const Admin = require("../../models/Admin");
const Doctor = require("../../models/Doctor");
const Receptionist = require("../../models/Receptionist");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

// @ /api/auth/admin
// Admin Login
// post
router.post(
  "/admin",
  [
    check("email", "Email Is Required and Must be an Email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      if (!admin) {
        res.status(400).json({ msg: "email or password are not correct" });
      }
      const isMatched = await bcrypt.compare(password, admin.password);
      if (!isMatched) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Wrong Email OR Password" }] });
      }
      const payload = {
        admin: {
          id: admin.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

// @ /api/auth/doctor
// Doctor Login
// post

router.post(
  "/doctor",
  [
    check("email", "Email Is Required and Must be an Email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let doctor = Doctor.findOne({ email });
      if (!doctor) {
        res.status(400).json({ msg: "email or password are not correct" });
      }
      const isMatched = await bcrypt.compare(password, doctor.password);
      if (!isMatched) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Wrong Email OR Password" }] });
      }
      const payload = {
        doctor: {
          id: doctor.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @ /api/auth/receptionist
// Receptionist Login
// post

router.post(
  "/receptionist",
  [
    check("email", "Email Is Required and Must be an Email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let receptionist = Receptionist.findOne({ email });
      if (!receptionist) {
        res.status(400).json({ msg: "email or password are not correct" });
      }
      const isMatched = await bcrypt.compare(password, receptionist.password);
      if (!isMatched) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Wrong Email OR Password" }] });
      }
      const payload = {
        receptionist: {
          id: receptionist.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
