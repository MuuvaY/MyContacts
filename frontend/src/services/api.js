import axios from "axios";

const API_URL = import.meta.env.API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = token;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // console.log("Token récupéré:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post("/register", data),
  login: (data) => api.post("/login", data),
};

export const userAPI = {
  getProfile: () => api.get("/getUsers"),
};

export const contactAPI = {
  getAllContacts: () => api.get("/contacts/"),
  getContactById: (id) => api.get(`/contacts/${id}`),
  createContact: (data) => api.post("/contacts", data),
  updateContact: (id, data) => api.patch(`/contacts/${id}`, data),
  deleteContact: (id) => api.delete(`/contacts/${id}`),
  searchContacts: (query) => api.get(`/search?query=${query}`),
};

export default api;
