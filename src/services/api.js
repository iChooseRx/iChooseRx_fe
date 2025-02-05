import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NOCOLORX_BE_BASE_URL,
  withCredentials: true, // Enable cookies for session handling
});

console.log('Base URL:', api.defaults.baseURL); // Debugging base URL

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
  const response = await api.post('/users', { user });
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

export const deleteAccount = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};

export const searchDrugs = async (drugName, filterParams = '') => {
  const response = await api.get(`/drugs?drug_name=${drugName}&${filterParams}`);
  console.log('API Request URL:', response.config.url); // Debugging
  console.log('API Response:', response.data);

  return response.data;
};

export default api;
