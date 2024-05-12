const openShareModal = (shareLink) => {
    $("#share-link-value").val(shareLink);
    $("#share-modal").css("display", "flex");
}

const getUrlToShare = () => {
    return $("#share-link-value").val();
}

const closeShareModal = () => {
    $("#share-modal").css("display", "none");
}

const shareFB = () => {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(getUrlToShare()), '_blank', 'width=550,height=400');
}

const shareVK = () => {
    // 'https://vk.com/share.php?url=' + encodeURIComponent(urlToShare) + '&title=' + encodeURIComponent(textToShare)
    window.open('https://vk.com/share.php?url=' + encodeURIComponent(getUrlToShare()), '_blank', 'width=550,height=400');
}

const shareX = () => {
    // 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(urlToShare) + '&text=' + encodeURIComponent(textToShare)
    window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(getUrlToShare()), '_blank', 'width=550,height=400');
}

const shareTG = () => {
    // 'https://t.me/share/url?url=' + encodeURIComponent(urlToShare) + '&text=' + encodeURIComponent(textToShare)
    window.open('https://t.me/share/url?url=' + encodeURIComponent(getUrlToShare()), '_blank', 'width=550,height=400');
}

const shareLI = () => {
    window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(getUrlToShare()), '_blank', 'width=550,height=400');
}

const shareReddit = () => {
    // 'https://www.reddit.com/submit?url=' + encodeURIComponent(urlToShare) + '&title=' + encodeURIComponent(textToShare)
    window.open('https://www.reddit.com/submit?url=' + encodeURIComponent(getUrlToShare()), '_blank', 'width=550,height=400');
}

const copyToClipboard = () => {
    navigator?.clipboard?.writeText?.(getUrlToShare());
    $('.copied').removeClass('hidden');
}
