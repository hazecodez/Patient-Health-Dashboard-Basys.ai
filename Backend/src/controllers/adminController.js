const Admin = require("../models/adminModel");
const Patient = require("../models/patientModel");
const AuthorizationReqs = require("../models/authorizationModel");
const { comparePasswords } = require("../utils/encryption");
const { generateToken } = require("../utils/jwt");

exports.login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const adminExist = await Admin.findOne({ name: name });
    if (!adminExist) {
      return res.status(400).json({ message: "Admin not found" });
    }
    const isPasswordValid = await comparePasswords(
      password,
      adminExist.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect Password !!" });
    }
    const token = generateToken(adminExist._id);

    res.status(200).json({
      admin: {
        id: adminExist._id,
        name: adminExist.name,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in" });
  }
};

exports.addPatient = async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(400).json({ message: "Error adding patient", error });
  }
};

exports.getPatients = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const searchFilter = search
      ? {
          name: { $regex: search, $options: "i" },
        }
      : {};

    const patients = await Patient.find(searchFilter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ name: 1 });

    const totalPatients = await Patient.countDocuments(searchFilter);

    res.status(200).json({
      totalPatients,
      currentPage: page,
      totalPages: Math.ceil(totalPatients / limit),
      patients,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients", error });
  }
};

exports.patientDetails = async (req, res) => {
  try {   
    const patient = await Patient.findById(req.params.id);
    
    if (!patient) {
      return res.status(404).json({ message: "No patient found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient details", error });
  }
};

exports.requestPriorAuthorization = async (req, res) => {
  try {
    const newAuthorizationReq = new AuthorizationReqs(req.body);
    const savedAuthorizationReq = await newAuthorizationReq.save();
    res.status(201).json(savedAuthorizationReq);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating authorization request", error });
  }
};

exports.getAuthorizationRequests = async (req, res) => {
  try {
    const filter = {};
    if (req.query.patientId) {
      filter.patientId = req.query.patientId;
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const authorizationRequests = await AuthorizationReqs.find(filter)
      .populate("patientId", "name age")
      .sort({ createdAt: -1 });

    res.status(200).json(authorizationRequests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching authorization requests", error });
  }
};
