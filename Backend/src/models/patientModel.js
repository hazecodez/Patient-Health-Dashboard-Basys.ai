const mongoose = require("mongoose");

const medicalHistorySchema = new mongoose.Schema({
  treatment: { type: String, required: true },
  date: { type: Date, required: true },
  notes: { type: String, required: true },
});

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  medicalHistory: {
    type: [medicalHistorySchema],
    default: [],
  },
  treatmentPlan: {
    type: String,
    required: true,
  },
  condition:{
    type: String,
    required:true
  }
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
