chrome.runtime.onInstalled.addListener(async () => {
    for (const cs of chrome.runtime.getManifest().content_scripts) {
        for (const tab of await chrome.tabs.query({url: cs.matches})) {
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                files: cs.js,
            });
        }
    }
})

chrome.runtime.onMessageExternal.addListener(
    (request, sender, sendResponse) => {
        console.debug("Background listener [external]", sender, request);

        switch (request.type) {
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
                return;
        }

        return true;
    });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.debug("Background listener [internal]", sender, request);

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
        default:
            sendResponse({success: false, message: "Invalid action type"});
            return;
    }

    return true;
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const url = changeInfo.url || tab.url;
    if (url && url.startsWith("http")) {
        setSiteRatingBadge(url, tabId);
    }
});

const setSiteRatingBadge = async (pageUrl, tabId) => {
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

const sendMessageToContent = async (message) => {
    let queryOptions = {active: true, lastFocusedWindow: true};
    let tab = (await chrome.tabs.query(queryOptions))[0];
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
