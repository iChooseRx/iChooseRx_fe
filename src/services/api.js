import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // Enable cookies for session handling
});

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

export const loginUser = async (credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.delete('/logout');
  return response.data;
};

export default api;
