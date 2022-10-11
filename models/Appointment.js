const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "doctor",
  },
  receptionist: {
    type: Schema.Types.ObjectId,
    ref: "receptionist",
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "client",
  },
  symptoms: {
    type: String,
  },
  status: {
    type: String,
    enum: ["attended", "waiting", "leaved"],
    default: "waiting",
  },
});

module.exports = Appointments = mongoose.model(
  "appointments",
  AppointmentsSchema
);
