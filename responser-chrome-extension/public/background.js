const LOCAL_DEV_MODE = JSON.parse("{{LOCAL_DEV_MODE}}".toLowerCase());

const log = (...message) => {
    const messageHeader = `[DEBUG] [EXT: Background script]: ${new Date().toLocaleString("en-US")}:`;
    if (LOCAL_DEV_MODE) {
        console.debug(messageHeader, ...message);
    }
}

chrome.runtime.onInstalled.addListener(async () => {
    for (const contentScript of chrome.runtime.getManifest().content_scripts) {
        for (const tab of await chrome.tabs.query({url: contentScript.matches})) {
            const {id, url} = tab;

            chrome.scripting.executeScript({
                target: {tabId: id},
                files: contentScript.js,
            })
            .then(() => setSiteRatingBadge(url, id));
        }
    }
})

chrome.runtime.onMessageExternal.addListener(
    (request, sender, sendResponse) => {
        log("External background listener", sender, request);

        switch (request.type) {
            case "CHECK_EXTENSION":
                sendResponse({success: true, message: "Extension is here"});
                break;
            case "SET_TOKEN":
                setTokens(request.data)
                .then(() => sendResponse({success: true, message: "Tokens successfully stored"}))
                .catch(cause => sendResponse({success: false, message: cause}));
                break;
            case "REMOVE_TOKEN":
                removeTokens()
                .then(() => sendResponse({success: true, message: "Tokens successfully removed"}))
                .catch(cause => sendResponse({success: false, message: cause}));
                break;
            case "GET_TOKEN":
                getTokens()
                .then(tokenData => sendResponse({success: true, data: tokenData}))
                .catch(cause => sendResponse({success: false, message: cause}));
                break;
            default:
                sendResponse({success: false, message: "Invalid action type"});
                log(`External listener: invalid action`);
                return;
        }

        log(`External listener: finish ${request.type} action`);

        return true;
    });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    log("Internal listener:", sender, request);

    switch (request.type) {
        case "SET_TOKEN":
            setTokens(request.data)
            .then(() => sendResponse({success: true, message: "Tokens successfully stored"}))
            .catch(cause => sendResponse({success: false, message: cause}));
            break;
        case "GET_TOKEN":
            getTokens()
            .then(tokenData => sendResponse({success: true, data: tokenData}))
            .catch(cause => sendResponse({success: false, message: cause}));
            break;
        case "REMOVE_TOKEN":
            removeTokens()
            .then(() => sendResponse({success: true, message: "Tokens successfully removed"}))
            .catch(cause => sendResponse({success: false, message: cause}));
            break;
        case "OPEN_EXTERNAL_PAGE":
            openExternalPage(request.data)
            .then(() => sendResponse({success: true}))
            .catch(cause => sendResponse({success: false, message: cause}));
            break;
        case "GET_CURRENT_PAGE_INFO":
            sendMessageToContent({type: request.type})
            .then(pageInfo => sendResponse({success: true, data: pageInfo.data}))
            .catch(cause => sendResponse({success: false, message: cause}))
            break;
        case "UPDATE_RATING_BADGE":
            updateRatingBadge()
            .then(() => sendResponse({success: true}))
            .catch(cause => sendResponse({success: false, message: cause}))
            break;
        default:
            sendResponse({success: false, message: "Invalid action type"});
            log(`Internal listener: invalid action`);
            return;
    }

    log(`Internal listener: finish ${request.type} action`);

    return true;
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const url = changeInfo.url || tab.url;
    if (url && url.startsWith("http") && tab.status === "complete") {
        setSiteRatingBadge(url, tabId);
    }
});

const setSiteRatingBadge = async (pageUrl, tabId) => {
    log("Set site rating badge");
    const url = new URL("{{API_URL}}/domains/rating");
    url.search = new URLSearchParams({url: pageUrl}).toString();
    const response = await fetch(url);
    const responseData = response.ok ? await response.text() : null;

    if (!responseData) {
        return;
    }

    const ratingValue = parseFloat(responseData);

    let backgroundColor;
    let textColor;

    if (ratingValue >= 4) {
        backgroundColor = "#23C653";
        textColor = '#FFFFFF';
    } else if (ratingValue >= 2) {
        backgroundColor = "#FFEC3A";
        textColor = '#28293D';
    } else {
        backgroundColor = "#FF4539";
        textColor = '#28293D';
    }

    await chrome.action.setBadgeBackgroundColor({color: backgroundColor, tabId: tabId});
    await chrome.action.setBadgeText({text: ratingValue.toPrecision(2), tabId: tabId});
    // can't find function setBadgeTextColor (has in google developers o_O)
    // await chrome.action.setBadgeTextColor({color: textColor, tabId: tabId});
}

const getCurrentTab = async () => {
    log("Get current tab - start");
    let queryOptions = LOCAL_DEV_MODE
        ? {active: true}
        : {active: true, lastFocusedWindow: !LOCAL_DEV_MODE};

    const tab = (await chrome.tabs.query(queryOptions))[0];
    log("Get current tab - finish:", !!tab ? tab.id : "undefined");
    return tab;
}

const sendMessageToContent = async (message) => {
    log("Send message to content:", message);
    const tab = await getCurrentTab();
    return chrome.tabs.sendMessage(tab.id, message);
}

const getTokens = async () => {
    return await chrome.storage.local.get({
        accessToken: null,
        accessTokenExpiredIn: null,
        refreshToken: null,
        refreshTokenExpiredIn: null
    });
}

const setTokens = async (tokenData) => {
    await chrome.storage.local.set({
        accessToken: tokenData.accessToken,
        accessTokenExpiredIn: tokenData.accessTokenExpiredIn,
        refreshToken: tokenData.refreshToken,
        refreshTokenExpiredIn: tokenData.refreshTokenExpiredIn
    });
}

const removeTokens = async () => {
    await chrome.storage.local.remove([
        "accessToken",
        "accessTokenExpiredIn",
        "refreshToken",
        "refreshTokenExpiredIn"
    ]);
}

const openExternalPage = (url, active) => {
    return chrome.tabs.create({url, active})
}

const updateRatingBadge = async () => {
    const tab = await getCurrentTab();
    return setSiteRatingBadge(tab.url, tab.id);
}
