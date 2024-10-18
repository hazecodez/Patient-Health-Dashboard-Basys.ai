const mongoose = require("mongoose");

const authorizationRequestSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Patient",
    },
    name: {
      type: String,
      required: true,
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
    dateOfService: {
      type: Date,
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

const AuthorizationReqs = mongoose.model(
  "AuthorizationRequests",
  authorizationRequestSchema
);

module.exports = AuthorizationReqs;
