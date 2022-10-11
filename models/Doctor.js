const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profession: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    default: "doctor",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Doctor = mongoose.model("doctor", DoctorSchema);
