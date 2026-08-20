import request from "./client";

export function getUnreadNotifications() {
    return request("/notifications/unread");
}

export function markNotificationAsRead(id) {
    return request(`/notifications/${id}/read`, {
        method: "POST",
    });
}