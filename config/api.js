// Utility for making requests to the FastAPI backend
const API_URL = "http://localhost:8000";

export async function registerUser({ name, email, hashed_password }) {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, hashed_password }),
  });
  if (!response.ok) throw new Error("Registration failed");
  return response.json();
}

export async function loginUser({ email, password }) {
  const response = await fetch(`${API_URL}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Login failed");
  return response.json();
}

// Utility to get JWT from AsyncStorage for API requests
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getJWT() {
  return AsyncStorage.getItem("jwt");
}
