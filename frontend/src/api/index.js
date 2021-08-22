import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

const formDataAPI = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const setAuthToken = (key) => {
  if (key) {
    API.defaults.headers.common["Authorization"] = `Token ${key}`;
    formDataAPI.defaults.headers.common["Authorization"] = `Token ${key}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
    localStorage.removeItem("key");
  }
};

// Auth
export const fetchUser = () => API.get("/rest-auth/user");
export const login = (formData) => API.post("/rest-auth/login/", formData);
export const register = (formData) =>
  API.post("/rest-auth/registration/", formData);
export const updateUser = (formData) =>
  formDataAPI.patch("/rest-auth/user/", formData);
export const logout = () => API.post("/rest-auth/logout/");

// Chat
export const getChats = () => API.get("/chat");
export const createChat = (contactId) => API.get(`/chat/create/${contactId}/`);
export const getContacts = () => API.get("/chat/contacts");
