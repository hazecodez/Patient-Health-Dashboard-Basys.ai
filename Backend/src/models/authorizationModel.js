const mongoose = require("mongoose");

const authorizationSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Patient",
    },
    treatment: {
      type: String,
      required: true,
    },
    insurancePlan: {
      type: String,
      required: true,
    },
    diagnosisCode: {
      type: String,
      required: true,
    },
    doctorNotes: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "denied"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Authorization = mongoose.model("Authorization", authorizationSchema);

module.exports = Authorization;
