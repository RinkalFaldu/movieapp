import { apiRequest } from "./client.js";

export function signupUser(body) {
  return apiRequest("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function loginUser(body) {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function getCurrentUser(token) {
  return apiRequest("/api/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
