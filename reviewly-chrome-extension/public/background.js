const LOCAL_DEV_MODE = JSON.parse("{{LOCAL_DEV_MODE}}".toLowerCase());

const log = (...message) => {
    const messageHeader = `[DEBUG] [EXT: Background script]: ${new Date().toLocaleString("en-US")}:`;

    if (LOCAL_DEV_MODE) {
        console.debug(messageHeader, ...message);
    }
}

// *********************************************
// ****************** Listeners ****************
// *********************************************
chrome.runtime.onInstalled.addListener(async () => {
    const tabs = await chrome.tabs.query({status: "complete", windowType: "normal"});

    for (const tab of tabs) {
        setRatingBadgeAndShowRatingPopupIfReady(tab.id, tab.url, tab.status, tab.active);
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

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const url = changeInfo.url || tab.url;

    setEnabled(tabId, url);
    setRatingBadgeAndShowRatingPopupIfReady(tabId, url, tab.status, tab.active);
});

chrome.tabs.onActivated.addListener(async ({tabId}) => {
    const tab = await chrome.tabs.get(tabId);

    setEnabled(tab.id, tab.url);
    setSiteRatingBadgeIfNeed(tabId, tab.url, tab.status, tab.active);
});

// *************************************
// ************** UTILS ****************
// *************************************
const isHttpUrl = (url) => {
    return url.startsWith("http");
}

const isTabReadyForActions = (tabId, tabUrl, tabStatus, isTabActive) => {
    return tabUrl && isHttpUrl(tabUrl) && tabStatus === "complete" && isTabActive;
}

// *************************************
// *************** LOGIC ***************
// *************************************

/**
 * Check url and if it not is "http or https" - disable extension action icon.
 */
const setEnabled = async (tabId, tabUrl) => {
    if (!isHttpUrl(tabUrl)) {
        await chrome.action.disable(tabId);
    }
}

/**
 * Setup rating badge to extension icon and show rating popup if tab is ready to action.
 *
 * @param tabId
 * @param tabUrl
 * @param tabStatus
 * @param isTabActive
 * @returns {Promise<void>}
 */
const setRatingBadgeAndShowRatingPopupIfReady = async (tabId, tabUrl, tabStatus, isTabActive) => {
    if (!isTabReadyForActions(tabId, tabUrl, tabStatus, isTabActive)) {
        return;
    }

    const rating = await getRating(tabUrl);

    setSiteRatingBadge(tabId, rating.siteRating);
    sendMessageToContent({type: "SHOW_RATING_POPUP", data: rating});
}

/**
 * Setup rating badge to extension icon if tab is ready to action.
 *
 * @param tabId
 * @param tabUrl
 * @param tabStatus
 * @param isTabActive
 * @returns {Promise<void>}
 */
const setSiteRatingBadgeIfNeed = async (tabId, tabUrl, tabStatus, isTabActive) => {
    if (!isTabReadyForActions(tabId, tabUrl, tabStatus, isTabActive)) {
        return;
    }

    const rating = await getRating(tabUrl);
    await setSiteRatingBadge(tabId, rating.siteRating);
};

const generateSalt = () => {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

const createHash = async (message) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Fetch rating from backend application.
 *
 * @param pageUrl
 * @returns {Promise<{siteRating: float, pageRating: float, siteReviewsCount: number, pageReviewsCount: number} | null>}
 */
const getRating = async (pageUrl) => {
    log("Get site and page rating:", pageUrl);

    const getDomainPath = "{{API_URL}}/rating";
    const getDomainUrl = new URL(getDomainPath);
    getDomainUrl.search = new URLSearchParams({url: pageUrl}).toString();

    // Basic API security
    const currentLocalDate = (new Date()).toISOString();
    const salt = generateSalt();
    const message = `${getDomainPath}${currentLocalDate}${salt}`;
    const hash = await createHash(message);

    const rawResponse = await fetch(getDomainUrl, {
        headers: {
            "Content-type": "application/json",
            "X-Request-Id": hash,
            "X-Request-Current-Local-Date": currentLocalDate,
            "X-Request-Config": salt
        }
    });

    const result = rawResponse.ok;

    const response = result ? await rawResponse.json() : null;

    if (!response) {
        return null;
    }

    const siteRating = response.siteRating;
    const pageRating = response.pageRating;

    return {
        siteRating: siteRating?.rating,
        siteReviewsCount: siteRating?.reviewsCount,
        pageRating: pageRating?.rating,
        pageReviewsCount: pageRating?.reviewsCount
    };
}

/**
 * Setup rating badge to extension icon.
 *
 * @param tabId
 * @param siteRating
 * @returns {Promise<void>}
 */
const setSiteRatingBadge = async (tabId, siteRating) => {
    log("Set site rating badge:", tabId, siteRating);

    if (!siteRating) {
        return;
    }

    let backgroundColor;

    if (siteRating >= 4) {
        backgroundColor = "#23C653";
    } else if (siteRating >= 2) {
        backgroundColor = "#FFEC3A";
    } else {
        backgroundColor = "#FF4539";
    }

    await chrome.action.setBadgeBackgroundColor({color: backgroundColor, tabId: tabId});
    await chrome.action.setBadgeText({text: siteRating.toPrecision(2), tabId: tabId});
}

/**
 * Send message to content script listeners.
 *
 * @param message
 * @returns {Promise<any>}
 */
const sendMessageToContent = async (message) => {
    log("Send message to content:", message);
    const tab = await getCurrentTab();
    return chrome.tabs.sendMessage(tab.id, message);
}

/**
 * Returns current tab page information.
 *
 * @returns {Promise<{title: string, url: string}>}
 */
const getCurrentPageInfo = async () => {
    const currentTab = await getCurrentTab();
    return {
        url: currentTab.url,
        title: currentTab.title
    }
}

/**
 * Returns current tab.
 *
 * @returns {Promise<chrome.tabs.Tab>}
 */
const getCurrentTab = async () => {
    log("Get current tab - start");
    let queryOptions = LOCAL_DEV_MODE
        ? {active: true}
        : {active: true, windowType: 'normal', lastFocusedWindow: true};

    const tab = (await chrome.tabs.query(queryOptions))[0];
    log("Get current tab - finish:", !!tab ? tab : "undefined");
    return tab;
}

/**
 * Returns tokens from extension local storage.
 *
 * @returns {Promise<{[p: string]: any}>}
 */
const getTokens = async () => {
    return await chrome.storage.local.get({
        accessToken: null,
        accessTokenExpiredIn: null,
        refreshToken: null,
        refreshTokenExpiredIn: null
    });
}

/**
 * Setup provided token info to local storage.
 *
 * @param tokenData
 * @returns {Promise<void>}
 */
const setTokens = async (tokenData) => {
    await chrome.storage.local.set({
        accessToken: tokenData.accessToken,
        accessTokenExpiredIn: tokenData.accessTokenExpiredIn,
        refreshToken: tokenData.refreshToken,
        refreshTokenExpiredIn: tokenData.refreshTokenExpiredIn
    });
}

/**
 * Remove tokens from local storage.
 *
 * @returns {Promise<void>}
 */
const removeTokens = async () => {
    await chrome.storage.local.remove([
        "accessToken",
        "accessTokenExpiredIn",
        "refreshToken",
        "refreshTokenExpiredIn"
    ]);
}

/**
 * Open external page by creating new tab.
 *
 * @param url
 * @param active
 * @returns {Promise<chrome.tabs.Tab>}
 */
const openExternalPage = (url, active) => {
    return chrome.tabs.create({url, active})
}

/**
 * Refresh rating badge for current tab.
 *
 * @returns {Promise<void>}
 */
const updateRatingBadge = async () => {
    const tab = await getCurrentTab();
    const rating = await getRating(tab.url);
    await setSiteRatingBadge(tab.id, rating.siteRating)
}
