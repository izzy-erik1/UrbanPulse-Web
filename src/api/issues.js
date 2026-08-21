import request from "./client";

export function getAllIssues() {
    return request("/issues");
}

export function createIssue(title, description, priority, municipalityId, categoryId) {
    return request("/issues", {
        method: "POST",
        body: JSON.stringify({title, description, priority, municipalityId, categoryId}),
    });

}
export function updateIssueStatus(id, status) {
    return request(`/issues/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({status}),
    });
}
