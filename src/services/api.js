import axios from "axios";

// 🔹 Rails Backend API (Default)
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ICHOOSERX_BE_BASE_URL,
  // withCredentials: true, // Enable cookies for session handling
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));


// 🔹 Python Microservice API (Port 8000)
const pythonApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PYTHON_MICROSERVICE_URL || "http://localhost:8000",
});

export { api, pythonApi };
export default api;

// ✅ Get Saved Drugs (Rails)
export const getSaveddrugs = async () => {
  const response = await api.get("/saved_drugs");
  console.log("📥 API Response from /saved_drugs:", response.data);
  return response.data;
};

// ✅ Create a Saved Drug (Rails)
export const createSaveddrug = async (drug) => {
  const response = await api.post("/saved_drugs", { saved_drug: drug });
  return response.data;
};

// ✅ Update Saved Drug Notes (Rails)
export const updateSaveddrugNotes = async (id, notes) => {
  const response = await api.patch(`/saved_drugs/${id}`, { notes });
  return response.data;
};

// ✅ Delete a Saved Drug (Rails)
export const deleteSaveddrug = async (id) => {
  const response = await api.delete(`/saved_drugs/${id}`);
  return response.data;
};

// ✅ Create User (Rails)
export const createUser = async (user) => {
  const response = await api.post("/users", { user });
  return response.data;
};

// ✅ Login User (Rails)
export const loginUser = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};

// ✅ Logout User (Rails)
export const logoutUser = async () => {
  const response = await api.delete("/logout");
  return response.data;
};

// ✅ Delete User Account (Rails)
export const deleteAccount = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};

// ✅ Search FDA-Approved Drugs (Rails)
export const searchDrugs = async (drugName, filterParams = "") => {
  const queryString = `drug_name=${encodeURIComponent(drugName)}${filterParams ? `&${filterParams}` : ""
    }`;
  const response = await api.get(`/drug_searches?${queryString}`);
  console.log("API Request URL:", response.config.url);
  console.log("API Response:", response.data);
  return response.data;
};

// ✅ Search Pharmacies by NDC (Rails)
export const searchPharmaciesByNDC = async (ndc) => {
  if (!ndc) {
    throw new Error("NDC number is required.");
  }

  try {
    const response = await api.get(`/pharmacy_searches?ndc=${encodeURIComponent(ndc)}`);
    console.log("Pharmacy Search API Request URL:", response.config.url);
    console.log("Pharmacy Search API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching pharmacies:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Upload File to Python Microservice (Port 8000)
export const uploadPharmacyFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await pythonApi.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("📤 File Upload Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error uploading file:", error.response?.data || error.message);
    throw error;
  }
};

export const sendInvitation = async ({ email, role }) => {
  const response = await api.post("/invitations", {
    invitation: { email, role: parseInt(role, 10) }
  });
  return response.data;
};

