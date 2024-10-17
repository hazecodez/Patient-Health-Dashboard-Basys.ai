const express = require("express");

const router = express.Router();

router.get("/login");
router.get("/patients");
router.post("/add_patient");
router.patch("/patient_details");
router.get("/authorizations")
router.post("/authorization");

module.exports = router;
