// notifications.js
export function showNotification(title, body) {
    if (Notification.permission === "granted") {
        new Notification(title, { body });
    } else {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(title, { body });
            }
        });
    }
}

export function requestAndTestNotification() {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            new Notification("Test Notification", { body: "This is a test notification." });
        }
    });
}
