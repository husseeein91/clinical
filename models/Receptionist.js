const mongoose = require("mongoose");

const ReceptionistSchema = new mongoose.Schema({
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
  salary: {
    type: Number,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: "receptionist",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Receptionist = mongoose.model(
  "receptionist",
  ReceptionistSchema
);
