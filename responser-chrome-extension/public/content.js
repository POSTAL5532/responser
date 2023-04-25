const LOCAL_DEV_MODE = JSON.parse("{{LOCAL_DEV_MODE}}".toLowerCase());

const log = (...message) => {
    const messageHeader = `[DEBUG] [EXT: Content script]: ${new Date().toLocaleString("en-US")}:`;
    if (LOCAL_DEV_MODE) {
        console.debug(messageHeader, ...message);
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    log("Content listener", sender, request);

    switch (request.type) {
        case "GET_CURRENT_PAGE_INFO":
            sendResponse({success: true, data: getPageInfo()})
            break;
        default:
            sendResponse({success: false, message: "Invalid action type"});
            return;
    }

    return true;
});

const getPageInfo = () => {
    log("Get page info");
    const url = window.location.href;
    const title = document.title;
    const descriptionMeta = document.querySelector('meta[name="description"]');
    const description = descriptionMeta ? descriptionMeta.content : null;

    log("Page info is: URL", url, ", description", description, ", title", title);
    return {url, description, title};
}

log("Content injected.")
