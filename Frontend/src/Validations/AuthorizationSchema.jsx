import * as Yup from "yup";

const AuthorizationSchema = Yup.object().shape({
  patientId: Yup.string().required("Patient ID is required"),
  name: Yup.string().required("Patient Name is required"),
  treatment: Yup.string().required("Treatment is required"),
  insurancePlan: Yup.string().required("Insurance Plan is required"),
  diagnosisCode: Yup.string().required("Diagnosis Code is required"),
  dateOfService: Yup.date().required("Date of Service is required").nullable(),
  doctorNotes: Yup.string().required("Doctor notes are required"),
});

export default AuthorizationSchema;
