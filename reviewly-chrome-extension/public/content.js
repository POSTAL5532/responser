const LOCAL_DEV_MODE = JSON.parse("{{LOCAL_DEV_MODE}}".toLowerCase());
const REVIEWLY_POPUP_BLOCK_ID = "reviewly-rating-popup";

const log = (...message) => {
    const messageHeader = `[DEBUG] [EXT: Content script]: ${new Date().toLocaleString("en-US")}:`;
    if (LOCAL_DEV_MODE) {
        console.debug(messageHeader, ...message);
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    log("Content listener", sender, request);

    switch (request.type) {
        case "SHOW_RATING_POPUP":
            showRatingPopup(request.data);
            sendResponse({success: true});
            break;
        default:
            sendResponse({success: false, message: "Invalid action type"});
            return;
    }

    return true;
});

const reviewlyLogo = `<div class="reviewly-logo">
<svg width="228" height="228" viewBox="0 0 228 228" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 13.9996C0 6.26782 6.26782 0 13.9996 0H91.2581C100.95 0 107.71 9.6113 104.433 18.7328L79.778 87.3624C76.5011 96.4838 83.2609 106.095 92.9531 106.095L213.309 106.096C221.041 106.096 227.308 112.364 227.308 120.096V214C227.308 221.732 221.04 227.999 213.309 227.999L206.02 227.999C202.73 227.999 199.545 226.84 197.024 224.726L84.3875 130.255C76.9245 123.995 65.5091 127.081 62.2159 136.248L32.5828 218.734C30.5857 224.293 25.3145 228 19.4077 228H13.9996C6.26782 228 0 221.732 0 214V13.9996ZM151.264 48.2095C147.953 57.3378 154.715 66.982 164.425 66.982L214 66.982C221.732 66.982 228 60.7142 228 52.9824V13.9997C228 6.26792 221.732 9.9378e-05 214 9.88327e-05L178.562 9.63335e-05C172.671 9.5918e-05 167.41 3.68836 165.402 9.2267L151.264 48.2095Z" fill="#516DFF"/>
</svg>
</div>`

const getRatingBlock = (header, rating, reviewsCount, className) => {
    if (!rating || rating === 0 || !reviewsCount || reviewsCount === 0) {
        return "";
    }

    const ratingClass = getRatingClass(rating);

    return `<div class="reviewly-rating-block ${className}">
        <p class="reviewly-rating-header">${header}</p>
        <p class="reviewly-rating ${ratingClass}">${rating.toPrecision(2)}</p>
        <p class="reviewly-reviews-count"><span class="reviewly-reviews-count-value">${reviewsCount <= 999 ? reviewsCount : "999+"}</span> reviews</p>
</div>`;
}

const reviewlyPopupAlreadyExist = () => {
    return !!document.getElementById(REVIEWLY_POPUP_BLOCK_ID);
}

const showRatingPopup = (data) => {
    log("Show rating popup:", data);

    if (reviewlyPopupAlreadyExist()) {
        log("Reviewly popup already exist.");
        return;
    }

    const siteRatingBlock = getRatingBlock("Site rating", data.siteRating, data.siteReviewsCount, "reviewly-site-rating");
    const pageRatingBlock = getRatingBlock("Page rating", data.pageRating, data.pageReviewsCount, "reviewly-page-rating");

    if (!siteRatingBlock && !pageRatingBlock) {
        log("No reviews for rating popup. Wil not showed.");
        return;
    }

    const container = document.createElement("div");
    container.id = REVIEWLY_POPUP_BLOCK_ID;
    container.className = "reviewly-rating-popup show";

    container.innerHTML = `${reviewlyLogo}${siteRatingBlock}${pageRatingBlock}`;

    document.body.appendChild(container);

    setTimeout(() => {
       document.getElementById(REVIEWLY_POPUP_BLOCK_ID).classList.remove("show");
       document.getElementById(REVIEWLY_POPUP_BLOCK_ID).classList.add("hide");

        setTimeout(() => {
            document.getElementById(REVIEWLY_POPUP_BLOCK_ID).remove();
        }, 500);
    }, 3000);
}

const getRatingClass = (ratingValue) => {
    let className;

    if (!ratingValue) {
        return null;
    }

    if (ratingValue >= 4) {
        className = "good-rating";
    } else if (ratingValue >= 2) {
        className = "medium-rating";
    } else {
        className = "bad-rating";
    }

    return className;
}

if (LOCAL_DEV_MODE) {
    log("Content injected.");
}
