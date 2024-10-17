import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://patient-health-dashboard-fola.onrender.com/admin",
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config && config.url) {
      const adminToken = localStorage.getItem("token");
      if (adminToken) {
        config.headers["Authorization"] = `Bearer ${adminToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function adminLogin(data) {
  try {
    const response = await axiosInstance.post("/login", data);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getPatients(search = "", page = 1, limit = 10) {
  try {
    const response = await axiosInstance.get("/patients", {
      params: {
        search,
        page,
        limit,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getPatientDetails(patientId) {
  try {
    const response = await axiosInstance.get(`/patient_details/${patientId}`);
    return response;
  } catch (error) {
    console.error("Error fetching patient details:", error);
    throw error;
  }
}

export async function requestPriorAuthorization(authorizationData) {
  try {
    const response = await axiosInstance.post(
      "/authorization",
      authorizationData
    );
    return response;
  } catch (error) {
    console.error("Error creating authorization request:", error);
    throw error;
  }
}

export async function getAuthorizationRequests(filters = {}) {
  try {
    const response = await axiosInstance.get("/authorizations", {
      params: filters,
    });
    return response;
  } catch (error) {
    console.error("Error fetching authorization requests:", error);
    throw error;
  }
}
