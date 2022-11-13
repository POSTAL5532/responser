chrome.storage.local.onChanged.addListener((changes) => {
    console.log("STORAGE CHANGED!")
    console.log("CHANGES:", changes)
    console.log("\n")
})

chrome.runtime.onMessageExternal.addListener(async (request, sender, sendResponse) => {
    console.debug("Sender", sender, request)

    switch (request.type) {
        case "SET_TOKEN":
            setTokens(request.data)
                .then(() => sendResponse({success: true, message: "Tokens successfully stored"}));
            break;
        case "REMOVE_TOKEN":
            removeTokens()
                .then(() => sendResponse({success: true, message: "Tokens successfully removed"}));
            break;
        default:
            sendResponse({success: false, message: "Invalid action type"});
            return;
    }

    return true;
});

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
