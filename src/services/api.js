import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ICHOOSERX_BE_BASE_URL,
  withCredentials: true, // Enable cookies for session handling
});

console.log('Base URL:', api.defaults.baseURL); // Debugging base URL


export const getSaveddrugs = async () => {
  const response = await api.get('/saved_drugs');
  return response.data;
};

export const createSaveddrug = async (drug) => {
  const response = await api.post('/saved_drugs', { saved_drug: drug });
  return response.data;
};

export const updateSaveddrugNotes = async (id, notes) => {
  const response = await api.put(`/saved_drugs/${id}`, { saved_drug: { notes } });
  return response.data;
};

export const deleteSaveddrug = async (id) => {
  const response = await api.delete(`/saved_drugs/${id}`);
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
  // Build the query string properly:
  // - URL-encode the drugName
  // - Append filterParams only if they exist.
  const queryString = `drug_name=${encodeURIComponent(drugName)}${filterParams ? `&${filterParams}` : ''}`;
  const response = await api.get(`/drug_searches?${queryString}`);
  console.log('API Request URL:', response.config.url); // Debugging
  console.log('API Response:', response.data);
  return response.data;
};

export default api;