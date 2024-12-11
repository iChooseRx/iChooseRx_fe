import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NOCOLORX_BE_BASE_URL,
  withCredentials: true, // Enable cookies for session handling
});

console.log('Base URL:', api.defaults.baseURL); // Add this for debugging base url

export const getSavedPrescriptions = async () => {
  const response = await api.get('/saved_prescriptions');
  return response.data;
};

export const createSavedPrescription = async (prescription) => {
  const response = await api.post('/saved_prescriptions', { saved_prescription: prescription });
  return response.data;
};

export const deleteSavedPrescription = async (id) => {
  const response = await api.delete(`/saved_prescriptions/${id}`);
  return response.data;
};

export const createUser = async (user) => {
  const response = await api.post('/users', { user }); // Matches /api/v1/users
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.delete('/logout');
  return response.data;
};

export const searchDrugs = async (drugName) => {
  try {
    const response = await api.get(`/drugs`, { params: { drug_name: drugName } });
    return response.data;
  } catch (error) {
    console.error("Error fetching drugs:", error.response?.data || error.message);
    throw error;
  }
};

export default api;
