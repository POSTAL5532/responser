console.log("Injected")

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.debug("Content listener [external]", sender, request);

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
    const url = window.location.href;
    const title = document.title;
    const descriptionMeta = document.querySelector('meta[name="description"]');
    const description = descriptionMeta ? descriptionMeta.content : null;
    return {url, description, title};
}
