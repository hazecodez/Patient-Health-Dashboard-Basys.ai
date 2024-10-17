const express = require("express");
const {
  login,
  getPatients,
  addPatient,
  patientDetails,
  getAuthorizationRequests,
  requestPriorAuthorization,
} = require("../controllers/adminController");
const { adminAuth } = require("../middlewares/adminAuth");

const router = express.Router();

router.post("/login", login);

router.get("/patients", adminAuth, getPatients);
router.post("/add_patient", adminAuth, addPatient);
router.get("/patient_details/:id", adminAuth, patientDetails);

router.post("/authorization", adminAuth, requestPriorAuthorization);
router.get("/authorizations", adminAuth, getAuthorizationRequests);

module.exports = router;