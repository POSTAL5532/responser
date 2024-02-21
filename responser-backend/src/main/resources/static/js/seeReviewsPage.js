window.addEventListener('load', (event) => {
    const minRatingFormValue = $('input[name="minRating"]');
    const maxRatingFormValue = $("input[name='maxRating']");

    const valuesSlider = document.getElementById('slider');
    noUiSlider.create(valuesSlider, {
        start: [minRatingFormValue.val(), maxRatingFormValue.val()],
        range: {min: 0, max: 5},
        step: 1,
        tooltips: false,
        pips: {mode: 'steps', density: -1},
    });

    const minRatingValueText = document.getElementById("min-rating-value");
    minRatingValueText.innerHTML = minRatingFormValue.val();

    const maxRatingValueText = document.getElementById("max-rating-value");
    maxRatingValueText.innerHTML = maxRatingFormValue.val();

    valuesSlider.noUiSlider.on("update", (values, handler) => {
        const value = Math.round(values[handler]);

        if (handler === 0) {
            minRatingValueText.innerHTML = value;
            minRatingFormValue.attr("value", value);
        } else {
            maxRatingValueText.innerHTML = value;
            maxRatingFormValue.attr("value", value);
        }
    });

    const sortDirectionInput = $("input[name='sortDirection']");
    $("input[name='sortingField']").change(function () {
        const sortDirectionValue = $(this).attr("data-sort-direction");
        sortDirectionInput.attr("value", sortDirectionValue);
    });

    $(".review-text").each(function () {
        const nativeTextElement = this;
        const overflowed = nativeTextElement.scrollHeight > nativeTextElement.clientHeight;

        if (!overflowed) {
            const parent = $(this).closest(".review-card");
            const showMoreButton = parent.find(".show-more");
            showMoreButton.css("display", "none");
            $(this).css("height", "auto")
        }
    });

    const toggleTextHeight = (isOverflowed, textElement, buttonElement, fullHeight) => {
        if (isOverflowed) {
            textElement.first().css("height", `${fullHeight}px`);
            textElement.first().css("display", "block");
            buttonElement.text("Show less");
        } else {
            textElement.first().css("height", "");
            textElement.first().css("display", "-webkit-box");
            buttonElement.text("Show more");
        }
    }

    $(".show-more").click(function () {
        const parent = $(this).closest(".review-card");
        const textElement = parent.find(".review-text");
        const nativeTextElement = textElement.get(0);
        const isOverflowed = nativeTextElement.scrollHeight > nativeTextElement.clientHeight;
        toggleTextHeight(isOverflowed, textElement, $(this), nativeTextElement.scrollHeight + 10);
    });
});



const openShareModal = (reviewPageLink) => {
    $("#share-review-link-value").val(reviewPageLink);
    $("#share-review-modal").css("display", "flex");
}

const closeShareModal = () => {
    $("#share-review-modal").css("display", "none");
}

const shareFB = () => {
    const urlToShare = $("#share-review-link-value").val();
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(urlToShare), '_blank', 'width=550,height=400');
}

const shareVK = () => {
    const urlToShare = $("#share-review-link-value").val();
    // 'https://vk.com/share.php?url=' + encodeURIComponent(urlToShare) + '&title=' + encodeURIComponent(textToShare)
    window.open('https://vk.com/share.php?url=' + encodeURIComponent(urlToShare), '_blank', 'width=550,height=400');
}

const shareX = () => {
    const urlToShare = $("#share-review-link-value").val();
    // 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(urlToShare) + '&text=' + encodeURIComponent(textToShare)
    window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(urlToShare), '_blank', 'width=550,height=400');
}

const shareTG = () => {
    const urlToShare = $("#share-review-link-value").val();
    // 'https://t.me/share/url?url=' + encodeURIComponent(urlToShare) + '&text=' + encodeURIComponent(textToShare)
    window.open('https://t.me/share/url?url=' + encodeURIComponent(urlToShare), '_blank', 'width=550,height=400');
}

const shareLI = () => {
    const urlToShare = $("#share-review-link-value").val();
    window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(urlToShare), '_blank', 'width=550,height=400');
}

const shareReddit = () => {
    const urlToShare = $("#share-review-link-value").val();
    // 'https://www.reddit.com/submit?url=' + encodeURIComponent(urlToShare) + '&title=' + encodeURIComponent(textToShare)
    window.open('https://www.reddit.com/submit?url=' + encodeURIComponent(urlToShare), '_blank', 'width=550,height=400');
}
