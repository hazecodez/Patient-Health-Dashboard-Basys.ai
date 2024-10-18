import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layouts/Layout";
import { BeatLoader } from "react-spinners";
import { getPatientDetails } from "../Services/Apis";

export default function SelectedPatient() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPatientDetails() {
      try {
        setLoading(true);
        const response = await getPatientDetails(id);
        setPatient(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Patient details:", err);
        setError("Error fetching patient details");
        setLoading(false);
      }
    }

    fetchPatientDetails();
  }, [id]);

  return (
    <Layout>
      {loading && (
        <div className="absolute left-56 inset-0 flex items-center justify-center z-10">
          <BeatLoader loading={loading} size={30} />
        </div>
      )}

      {error && <div className="text-red-500 text-center mt-4">{error}</div>}

      
      {!loading && patient && (
        <div className="xl:pl-72">
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-100 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-black">
                Patient: {patient.name}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-700">
              Condition: {patient.condition}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-700">
              Age: {patient.age}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-700">
              Treatment Plan: {patient.treatmentPlan}
            </p>

            <h3 className="font-bold text-lg mb-2">Medical History:</h3>
            {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
              <ul className="list-disc ml-6 mb-3">
                {patient.medicalHistory.map((history, index) => (
                  <li key={index} className="text-gray-700 text-base">
                    <strong>Treatment:</strong> {history.treatment} <br />
                    <strong>Date:</strong> {history.date} <br />
                    <strong>Notes:</strong> {history.notes}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 text-base mb-3">
                No medical history available.
              </p>
            )}

            <button
              onClick={() => navigate(`/request/${patient._id}`)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white hover:text-black transition-colors duration-500 bg-gray-700 rounded-lg hover:bg-white focus:ring-4 focus:outline-none  dark:bg-gray-600 dark:hover:bg-white "
            >
              Request Authorization
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
