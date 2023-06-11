const LOCAL_DEV_MODE = JSON.parse("{{LOCAL_DEV_MODE}}".toLowerCase());

const log = (...message) => {
    const messageHeader = `[DEBUG] [EXT: Background script]: ${new Date().toLocaleString("en-US")}:`;

    if (LOCAL_DEV_MODE) {
        console.debug(messageHeader, ...message);
    }
}

const isHttpUrl = (url) => {
    return url.startsWith("http");
}

const isTabReadyForActions = (tabId, tabUrl, tabStatus, isTabActive) => {
    return tabUrl && isHttpUrl(tabUrl) && tabStatus === "complete" && isTabActive;
}

const setEnabled = async (tabId, tabUrl) => {
    if (!isHttpUrl(tabUrl)) {
        await chrome.action.disable(tabId);
    }
}

chrome.runtime.onInstalled.addListener(async () => {
    const tabs = await chrome.tabs.query({status: "complete", windowType: "normal"});

    for (const tab of tabs) {
        setSiteRatingBadgeIfNeed(tab.id, tab.url, tab.status, tab.active);
        setEnabled(tab.id, tab.url);
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
            getCurrentPageInfo()
            .then(pageInfo => sendResponse({success: true, data: pageInfo}))
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

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    const url = changeInfo.url || tab.url;

    setSiteRatingBadgeIfNeed(tabId, url, tab.status, tab.active);
    setEnabled(tabId, url);

    if (isTabReadyForActions(tabId, url, tab.status, tab.active)) {
        const rating = await getRating(url);
        sendMessageToContent({type: "SHOW_RATING_POPUP", data: rating});
    }
});

chrome.tabs.onActivated.addListener(async ({tabId}) => {
    const tab = await chrome.tabs.get(tabId);
    await setSiteRatingBadgeIfNeed(tabId, tab.url, tab.status, tab.active);
    await setEnabled(tab.id, tab.url);
});

const setSiteRatingBadgeIfNeed = async (tabId, tabUrl, tabStatus, isTabActive) => {
    if (isTabReadyForActions(tabId, tabUrl, tabStatus, isTabActive)) {
        await setSiteRatingBadge(tabUrl, tabId);
    }
};

const getRating = async (pageUrl) => {
    log("Get site and page rating:", pageUrl);

    const getDomainUrl = new URL("{{API_URL}}/domains");
    getDomainUrl.search = new URLSearchParams({url: pageUrl}).toString();

    const getPageUrl = new URL("{{API_URL}}/pages");
    getPageUrl.search = new URLSearchParams({url: pageUrl}).toString();

    const rawResponses = await Promise.all([
        fetch(getDomainUrl),
        fetch(getPageUrl)
    ]);

    const responses = await Promise.all([
        rawResponses[0].ok ? rawResponses[0].json() : undefined,
        rawResponses[1].ok ? rawResponses[1].json() : undefined,
    ]);

    return {
        siteRating: responses[0] ? responses[0].rating : null,
        siteReviewsCount: responses[0] ? responses[0].reviewsCount : null,
        pageRating: responses[1] ? responses[1].rating : null,
        pageReviewsCount: responses[1] ? responses[1].reviewsCount : null
    };
}

const setSiteRatingBadge = async (pageUrl, tabId) => {
    log("Set site rating badge:", tabId, pageUrl);
    const url = new URL("{{API_URL}}/domains/rating");
    url.search = new URLSearchParams({url: pageUrl}).toString();

    let response;

    try {
        response = await fetch(url);
    } catch (error) {
        log("Error", error.toString());
        return;
    }

    const responseData = response.ok ? await response.text() : null;

    if (!responseData) {
        return;
    }

    const ratingValue = parseFloat(responseData);

    let backgroundColor;

    if (ratingValue >= 4) {
        backgroundColor = "#23C653";
    } else if (ratingValue >= 2) {
        backgroundColor = "#FFEC3A";
    } else {
        backgroundColor = "#FF4539";
    }

    await chrome.action.setBadgeBackgroundColor({color: backgroundColor, tabId: tabId});
    await chrome.action.setBadgeText({text: ratingValue.toPrecision(2), tabId: tabId});
}

const sendMessageToContent = async (message) => {
    log("Send message to content:", message);
    const tab = await getCurrentTab();
    return chrome.tabs.sendMessage(tab.id, message);
}

const getCurrentPageInfo = async () => {
    const currentTab = await getCurrentTab();
    return {
        url: currentTab.url,
        title: currentTab.title
    }
}

const getCurrentTab = async () => {
    log("Get current tab - start");
    let queryOptions = LOCAL_DEV_MODE
        ? {active: true}
        : {active: true, windowType: 'normal', lastFocusedWindow: true};

    const tab = (await chrome.tabs.query(queryOptions))[0];
    log("Get current tab - finish:", !!tab ? tab : "undefined");
    return tab;
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
