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
  const token = localStorage.getItem("auth_token"); // ✅ Get stored token

  if (!token) {
    console.error("❌ No auth token found in localStorage");
    return;
  }

  try {
    const response = await api.get("/saved_drugs", {
      headers: {
        Authorization: `Bearer ${token}` // ✅ Attach token
      }
    });
    console.log("📥 API Response from /saved_drugs:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching saved drugs:", error.response?.data || error.message);
    throw error;
  }
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
export const createUser = async (userData) => {
  console.log("📡 API Request Payload:", JSON.stringify(userData, null, 2)); // 🔍 Debug log before sending request
  try {
    const response = await api.post("/users", userData);
    console.log("✅ User created successfully:", response.data);

    if (response.data.auth_token) {
      localStorage.setItem("auth_token", response.data.auth_token); // ✅ Store token
      localStorage.setItem("user_id", response.data.user.id); // ✅ Store user ID
      localStorage.setItem("user_role", response.data.user.role); // ✅ Store user role
    } else {
      console.warn("❌ No auth token returned after signup");
    }

    return response.data;
  } catch (error) {
    console.error("❌ Error creating user:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Login User (Rails)
export const loginUser = async (credentials) => {
  const response = await api.post("/login", credentials);

  if (response.data.user) {
    localStorage.setItem("auth_token", response.data.auth_token);
    localStorage.setItem("user_id", response.data.user.id); // ✅ Store user ID
    localStorage.setItem("user_role", response.data.user.role);
  } else {
    console.error("❌ Error: No user object returned from API");
  }

  return response.data;
};


// ✅ Logout User (Rails)
export const logoutUser = async () => {
  try {
    await api.delete("/logout"); // Call API to signal logout
  } catch (error) {
    console.error("Logout failed:", error);
  }
  localStorage.removeItem("auth_token"); // ✅ Remove token locally
  localStorage.removeItem("user_role"); // ✅ Remove role
  window.location.href = "/login"; // ✅ Redirect to login page
};

// ✅ Delete User Account (Rails)
export const deleteAccount = async (userId) => {
  if (!userId) {
    console.error("❌ Missing userId when calling deleteAccount");
    return;
  }

  const token = localStorage.getItem("auth_token"); // ✅ Retrieve JWT Token
  if (!token) {
    console.error("❌ No auth token found in localStorage");
    return;
  }

  console.log(`🛑 Deleting user with ID: ${userId}`);

  try {
    const response = await api.delete(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}` // ✅ Send token with request
      }
    });

    console.log("✅ User deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting user:", error.response?.data || error.message);
    throw error;
  }
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

