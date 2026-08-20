import request from "./client";

export function getCategories() {
    return request("/categories");
}

export function getMunicipalities() {
    return request("/municipalities");
}