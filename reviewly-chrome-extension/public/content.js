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
<svg width="27.88575" height="30.033432" viewBox="0 0 27.88575 30.033432" fill="none" version="1.1" id="svg4" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M 0,1.853912 C 0,0.834262 0.775402,0 1.72312,0 h 9.53453 c 1.1775,0 2.0103,1.266842 1.6083,2.471892 l -3.01547,9.02234 c -0.40206,1.2051 0.43077,2.4719 1.60827,2.4719 h 14.7039 c 0.9477,0 1.7231,0.8343 1.7231,1.854 v 12.3594 c 0,1.0196 -0.7754,1.8539 -1.7231,1.8539 h -0.8903 c -0.402,0 -0.8041,-0.1545 -1.0913,-0.4326 l -13.7849,-12.4212 c -0.91901,-0.8343 -2.29751,-0.4326 -2.69957,0.8034 l -3.61854,10.8454 c -0.25847,0.7415 -0.89028,1.205 -1.60824,1.205 H 1.72312 C 0.775402,30.033432 0,29.199132 0,28.179532 Z m 18.49475,4.5112 c -0.402,1.20504 0.4308,2.47189 1.6083,2.47189 h 6.0596 c 0.9477,0 1.7231,-0.83427 1.7231,-1.85392 V 1.853912 C 27.88575,0.834262 27.11035,0 26.16265,0 h -4.3365 c -0.718,0 -1.3498,0.494382 -1.6083,1.205042 l -1.7231,5.12917 z" fill="#404038" id="path2" />
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

    const createdPopup = document.getElementById(REVIEWLY_POPUP_BLOCK_ID);

    const hideCreatedPopup = () => {
        createdPopup.classList.remove("show");
        createdPopup.classList.add("hide");

        setTimeout(() => {
            createdPopup.remove();
        }, 500);
    }

    document.getElementById(REVIEWLY_POPUP_BLOCK_ID).onmouseover = hideCreatedPopup

    setTimeout(hideCreatedPopup, 3000);
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
