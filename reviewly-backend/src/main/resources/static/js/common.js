window.addEventListener('load', (event) => {
    const cookieNotificationName = "cookieNotification";
    const doneResult = "done";

    initNotification({
        id: "#cookies-privacy-policies-banner",
        show: () => {
            const previousCookieNotificationActionResult = localStorage.getItem(cookieNotificationName);
            return !previousCookieNotificationActionResult || previousCookieNotificationActionResult !== doneResult
        },
        onClose: () => localStorage.setItem(cookieNotificationName, doneResult),
        onAction: () => localStorage.setItem(cookieNotificationName, doneResult)
    });
});
