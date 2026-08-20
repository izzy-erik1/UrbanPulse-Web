import request from "./client";

export function getCommentsByIssue(issueId) {
    return request(`/comments/issue/${issueId}`);
}

export function addComment(content, issueId) {
    return request("/comments", {
        method: "POST",
        body: JSON.stringify({ content, issueId }),
    });
}