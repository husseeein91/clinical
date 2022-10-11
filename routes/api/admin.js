const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../../middleware/auth");
const Admin = require("../../models/Admin");
const Doctor = require("../../models/Doctor");
const Receptionist = require("../../models/Receptionist");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

// @ /api/admin
// Admin Register
// post
router.post(
  "/",
  [
    check("name", "Name Is Required").not().isEmpty(),
    check("email", "Email Is Required and Must be an Email").isEmail(),
    check("password", "Password must be more then 6 characters").isLength({
      min: 6,
    }),
    check("phone", "Phone Is Required and must be 11 characters").isLength({
      min: 11,
      max: 11,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, name, password, phone } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      if (admin) {
        res.status(400).json({ msg: "admin already exists" });
      }
      admin = new Admin({
        name,
        email,
        phone,
      });
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
      await admin.save();
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
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @ /api/admin/doctor
// Add Doctor
// post
router.post(
  "/doctor",
  [
    auth,
    isAdmin,
    [
      check("name", "Name Is Required").not().isEmpty(),
      check("email", "Email Is Required and Must be an Email").isEmail(),
      check("password", "Password must be more then 6 characters").isLength({
        min: 6,
      }),
      check("phone", "Phone Is Required and must be 11 characters").isLength({
        min: 11,
        max: 11,
      }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, name, password, phone, image } = req.body;
    try {
      let doctor = await Doctor.findOne({ email });
      if (doctor) {
        res.status(400).json({ msg: "doctor already exists" });
      }
      doctor = new Doctor({
        name,
        email,
        phone,
        image,
      });
      const salt = await bcrypt.genSalt(10);
      doctor.password = await bcrypt.hash(password, salt);
      await doctor.save();
      res.json(doctor);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @ /api/admin/doctor/:doc_id
// update Doctor
// put
router.put(
  "/doctor/:doc_id",
  [
    auth,
    isAdmin,
    [
      check("name", "Name Is Required").not().isEmpty(),
      check("email", "Email Is Required and Must be an Email").isEmail(),
      check("password", "Password must be more then 6 characters").isLength({
        min: 6,
      }),
      check("phone", "Phone Is Required and must be 11 characters").isLength({
        min: 11,
        max: 11,
      }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, name, password, phone, image } = req.body;
    try {
      let doctor = await Doctor.findOne({ email });
      if (doctor) {
        if (doctor._id != req.params.doc_id) {
          res.status(400).json({
            msg: "This Email is Already Taken",
            id: req.params.doc_id,
          });
        }
      }
      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(password, salt);
      doctor = await Doctor.findOneAndUpdate(
        { _id: req.params.doc_id },
        { email, name, password: newPassword, phone, image },
        { new: true }
      );
      res.json(doctor);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @ /api/admin/doctors
// get all doctors
// get

router.get("/doctors", [auth, isAdmin], async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @ /api/admin/doctor
// get doctor by id
// get

router.get("/doctor/:doctor_id", [auth, isAdmin], async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctor_id);
    res.json(doctor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @ /api/admin/doctor/:doc_id
// delete doctor by id
// delete

router.delete("/doctor/:doc_id", [auth, isAdmin], async (req, res) => {
  try {
    await Doctor.findOneAndRemove(req.params.doc_id);
    res.json({ msg: "doctor Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @ /api/admin/receptionist
// Add Receptionist
// post
router.post(
  "/receptionist",
  [
    auth,
    isAdmin,
    [
      check("name", "Name Is Required").not().isEmpty(),
      check("email", "Email Is Required and Must be an Email").isEmail(),
      check("password", "Password must be more then 6 characters").isLength({
        min: 6,
      }),
      check("phone", "Phone Is Required and must be 11 characters").isLength({
        min: 11,
        max: 11,
      }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, name, password, phone, image } = req.body;
    try {
      let receptionist = await Receptionist.findOne({ email });
      if (receptionist) {
        res.status(400).json({ msg: "receptionist already exists" });
      }
      receptionist = new Receptionist({
        name,
        email,
        phone,
        image,
      });
      const salt = await bcrypt.genSalt(10);
      receptionist.password = await bcrypt.hash(password, salt);
      await receptionist.save();
      res.json(receptionist);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @ /api/admin/receptionist/:rec_id
// update Receptionist
// put
router.put(
  "/receptionist/:rec_id",
  [
    auth,
    isAdmin,
    [
      check("name", "Name Is Required").not().isEmpty(),
      check("email", "Email Is Required and Must be an Email").isEmail(),
      check("password", "Password must be more then 6 characters").isLength({
        min: 6,
      }),
      check("phone", "Phone Is Required and must be 11 characters").isLength({
        min: 11,
        max: 11,
      }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, name, password, phone, image } = req.body;
    try {
      let receptionist = await Receptionist.findOne({ email });
      if (receptionist) {
        if (receptionist._id != req.params.rec_id) {
          res.status(400).json({ msg: "This Email Is Already Taken" });
        }
      }
      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(password, salt);
      receptionist = await Receptionist.findOneAndUpdate(
        { _id: req.params.rec_id },
        { email, name, password: newPassword, phone, image },
        { new: true }
      );
      res.json(receptionist);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @ /api/admin/receptionists
// get all receptionists
// get

router.get("/receptionists", [auth, isAdmin], async (req, res) => {
  try {
    const receptionists = await Receptionist.find();
    res.json(receptionists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @ /api/admin/receptionist/:rec_id
// get receptionist by id
// get

router.get("/receptionist/:rec_id", [auth, isAdmin], async (req, res) => {
  try {
    const receptionist = await Receptionist.findById(req.params.rec_id);
    res.json(receptionist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @ /api/admin/receptionist/:rec_id
// delete receptionist by id
// delete

router.delete("/receptionist/:rec_id", [auth, isAdmin], async (req, res) => {
  try {
    await Receptionist.findOneAndRemove(req.params.rec_id);
    res.json({ msg: "Receptionist Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
