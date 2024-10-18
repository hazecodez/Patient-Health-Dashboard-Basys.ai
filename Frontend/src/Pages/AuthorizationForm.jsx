import { toast } from "sonner";
import Layout from "../Layouts/Layout";
import { requestPriorAuthorization } from "../Services/Apis";
import AuthorizationSchema from "../Validations/AuthorizationSchema";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

export default function AuthorizationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { errors, handleBlur, handleChange, handleSubmit, values, touched } =
    useFormik({
      initialValues: {
        patientId: id,
        name: "",
        treatment: "",
        insurancePlan: "",
        diagnosisCode: "",
        dateOfService: null,
        doctorNotes: "",
        status: "pending",
      },
      validationSchema: AuthorizationSchema,
      onSubmit: async (formData) => {
        try {
          const response = await requestPriorAuthorization(formData);
          if (response?.data) {
            toast.success("Authorization request submitted successfully!");
            navigate("/request_lists");
          } else {
            toast.error("Failed to submit the authorization request.");
          }
        } catch (error) {
          console.error("Error submitting authorization request:", error);
          toast.error("An error occurred while submitting the request.");
        }
      },
    });

  return (
    <Layout>
      <div className="max-w-lg mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Authorization Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="treatment"
              className="block text-sm font-medium text-gray-700"
            >
              Patient Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              className="mt-2 block w-full p-2 border border-gray-300 rounded"
              placeholder="Enter name here"
            />
            {errors.name && touched.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </div>
          {/* Treatment */}
          <div>
            <label
              htmlFor="treatment"
              className="block text-sm font-medium text-gray-700"
            >
              Treatment
            </label>
            <input
              type="text"
              id="treatment"
              name="treatment"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.treatment}
              className="mt-2 block w-full p-2 border border-gray-300 rounded"
              placeholder="Enter treatment details"
            />
            {errors.treatment && touched.treatment && (
              <p className="text-red-500 text-xs">{errors.treatment}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="insurancePlan"
              className="block text-sm font-medium text-gray-700"
            >
              Insurance Plan
            </label>
            <input
              type="text"
              id="insurancePlan"
              name="insurancePlan"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.insurancePlan}
              className="mt-2 block w-full p-2 border border-gray-300 rounded"
              placeholder="Enter insurance plan"
            />
            {errors.insurancePlan && touched.insurancePlan && (
              <p className="text-red-500 text-xs">{errors.insurancePlan}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="diagnosisCode"
              className="block text-sm font-medium text-gray-700"
            >
              Diagnosis Code
            </label>
            <input
              type="text"
              id="diagnosisCode"
              name="diagnosisCode"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.diagnosisCode}
              className="mt-2 block w-full p-2 border border-gray-300 rounded"
              placeholder="Enter diagnosis code"
            />
            {errors.diagnosisCode && touched.diagnosisCode && (
              <p className="text-red-500 text-xs">{errors.diagnosisCode}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="dateOfService"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Service
            </label>
            <input
              type="date"
              id="dateOfService"
              name="dateOfService"
              onChange={handleChange}
              onBlur={handleBlur}
              value={
                values.dateOfService ? values.dateOfService.split("T")[0] : ""
              }
              className="mt-2 block w-full p-2 border border-gray-300 rounded"
            />
            {errors.dateOfService && touched.dateOfService && (
              <p className="text-red-500 text-xs">{errors.dateOfService}</p>
            )}
          </div>

          {/* Doctor Notes */}
          <div>
            <label
              htmlFor="doctorNotes"
              className="block text-sm font-medium text-gray-700"
            >
              Doctor Notes
            </label>
            <textarea
              id="doctorNotes"
              name="doctorNotes"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.doctorNotes}
              className="mt-2 block w-full p-2 border border-gray-300 rounded"
              placeholder="Enter doctor notes"
            />
            {errors.doctorNotes && touched.doctorNotes && (
              <p className="text-red-500 text-xs">{errors.doctorNotes}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full border rounded-2xl transition-colors duration-500 p-2 bg-gray-200 hover:bg-white"
            >
              Submit Authorization Request
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
