import request from "./client";

export function register(name, email, password, role) {
    return request("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password, role }),
    });
}

export function login(email, password) {
    return request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}