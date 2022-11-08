chrome.storage.local.onChanged.addListener((changes) => {
    console.log("STORAGE CHANGED!")
    console.log("CHANGES:", changes)
    console.log("\n")
})

chrome.runtime.onMessageExternal.addListener(async (request, sender, sendResponse) => {
    console.debug("Sender", sender, request)

    switch (request.type) {
        case "SET_TOKEN":
            setAccessToken(request.data)
                .then(() => sendResponse({success: true, message: "Token successfully stored"}));
            break;
        case "REMOVE_TOKEN":

            break;
        default:
            sendResponse({success: false, message: "Invalid action type"});
            return;
    }

    return true;
});

/*
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Sender", sender, request)
    if (request.type === "ACCESS_TOKEN") {
        console.log("Token:", request.token);
        console.log("Expired in:", request.expiredIn)
        sendResponse({success: true, message: 'Token has been received'});
    }
});*/

const setAccessToken = async (tokenData) => {
    await chrome.storage.local.set({
        accessToken: tokenData.accessToken,
        accessTokenExpiredIn: tokenData.accessTokenExpiredIn,
        refreshToken: tokenData.refreshToken,
        refreshTokenExpiredIn: tokenData.refreshTokenExpiredIn
    });
}
