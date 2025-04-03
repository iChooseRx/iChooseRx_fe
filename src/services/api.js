import axios from "axios";

// 🔹 Rails Backend API (Default)
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ICHOOSERX_BE_BASE_URL,
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
  const token = localStorage.getItem("auth_token");

  if (!token) {
    console.error("❌ No auth token found in localStorage");
    return;
  }

  try {
    const response = await api.get("/saved_drugs", {
      headers: {
        Authorization: `Bearer ${token}`
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
  console.log("📡 API Request Payload:", JSON.stringify(userData, null, 2));
  try {
    const response = await api.post("/users", userData);
    console.log("✅ User created successfully:", response.data);

    if (response.data.auth_token) {
      localStorage.setItem("auth_token", response.data.auth_token);
      localStorage.setItem("user_id", response.data.user.id);
      localStorage.setItem("user_role", response.data.user.role);
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
    localStorage.setItem("user_id", response.data.user.id);
    localStorage.setItem("user_role", response.data.user.role);
  } else {
    console.error("❌ Error: No user object returned from API");
  }

  return response.data;
};


// ✅ Logout User (Rails)
export const logoutUser = async () => {
  try {
    await api.delete("/logout");
  } catch (error) {
    console.error("Logout failed:", error);
  }
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user_role");
  window.location.href = "/";
};

// ✅ Delete User Account (Rails)
export const deleteAccount = async (userId) => {
  if (!userId) {
    console.error("❌ Missing userId when calling deleteAccount");
    return;
  }

  const token = localStorage.getItem("auth_token");
  if (!token) {
    console.error("❌ No auth token found in localStorage");
    return;
  }

  console.log(`🛑 Deleting user with ID: ${userId}`);

  try {
    const response = await api.delete(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
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

  try {
    const response = await api.get(`/drug_searches?${queryString}`);
    return { data: response.data, error: null };
  } catch (error) {
    if (error.response?.status === 429) {
      return { data: null, error: error.response.data.error };
    } else {
      return { data: null, error: "Failed to fetch drug data. Please try again." };
    }
  }
};


// ✅ Search Pharmacies by NDC (Rails)
export const searchPharmaciesByNDC = async (ndc) => {
  try {
    const response = await api.get(`/pharmacy_searches?ndc=${ndc}`);
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

// ✅ Request Password Reset (Rails)
export const requestPasswordReset = async (email) => {
  const response = await api.post('/password_resets', { email });
  return response.data;
};

// ✅ Reset Password (Rails)
export const resetPassword = async (token, password, passwordConfirmation) => {
  const response = await api.patch('/password_resets', {
    token,
    password,
    password_confirmation: passwordConfirmation
  });
  return response.data;
};

// ✅ Submit Pharmacy Availability Report (Rails)
export const reportPharmacyAvailability = async ({ ndc_numbers, pharmacy, notes }) => {
  try {
    const response = await api.post("/drug_reports", {
      drug_report: {
        ndc_numbers,
        pharmacy,
        notes
      }
    });
    console.log("✅ Pharmacy report submitted:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error submitting pharmacy report:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Get Pending Drug Reports (Admin)
export const fetchPendingReports = async () => {
  try {
    const response = await api.get("/admin/drug_reports");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching pending reports:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Approve a specific NDC inside a report (Admin)
export const approveNDC = async ({ reportId, ndc, pharmacy_id, drug_name }) => {
  try {
    const response = await api.patch(`/admin/drug_reports/${reportId}/approve_ndc`, {
      ndc,
      pharmacy_id
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error approving NDC:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Deny a specific NDC inside a report (Admin)
export const denyNDC = async ({ reportId, ndc }) => {
  try {
    const response = await api.patch(`/admin/drug_reports/${reportId}/deny_ndc`, { ndc });
    return response.data;
  } catch (error) {
    console.error("❌ Error denying NDC:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Update Drug Report (Admin)
export const updateDrugReport = async (reportId, updates) => {
  try {
    const response = await api.patch(`/admin/drug_reports/${reportId}`, {
      drug_report: updates
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error updating report:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Get Pharmacy Unavailability Reports (Admin)
export const fetchUnavailabilityReports = async () => {
  try {
    const response = await api.get("/admin/pharmacy_unavailability_reports");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching unavailability reports:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Approve Pharmacy Unavailability Report (Admin)
export const approveUnavailabilityReport = async (reportId) => {
  try {
    const response = await api.patch(`/admin/pharmacy_unavailability_reports/${reportId}/approve`);
    return response.data;
  } catch (error) {
    console.error("❌ Error approving unavailability report:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Deny Pharmacy Unavailability Report (Admin)
export const denyUnavailabilityReport = async (reportId) => {
  try {
    const response = await api.delete(`/admin/pharmacy_unavailability_reports/${reportId}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error denying unavailability report:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Report NDC Unavailable (User)
export const reportNdcUnavailable = async ({ pharmacy_id, ndc }) => {
  try {
    const response = await api.post("/pharmacy_unavailability_reports", {
      pharmacy_unavailability_report: {
        pharmacy_id,
        ndc
      }
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error reporting NDC unavailability:", error.response?.data || error.message);
    throw error;
  }
};