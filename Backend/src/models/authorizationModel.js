const mongoose = require("mongoose");

const authorizationRequestSchema = new mongoose.Schema(
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

const AuthorizationReqs = mongoose.model("AuthorizationRequests", authorizationRequestSchema);

module.exports = AuthorizationReqs;
