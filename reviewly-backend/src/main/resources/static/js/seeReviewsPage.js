window.addEventListener('load', (event) => {
    const minRatingFormValue = $('input[name="minRating"]');
    const maxRatingFormValue = $("input[name='maxRating']");

    const valuesSlider = document.getElementById('slider');
    noUiSlider.create(valuesSlider, {
        start: [minRatingFormValue.val(), maxRatingFormValue.val()],
        range: {min: 1, max: 5},
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

    const resetSorting = () => {
        $("input[name=sortingField]").prop("checked", false);
        $("input[name=sortingField][value=CREATION_DATE][data-sort-direction=DESC]").prop("checked", true);
        $("input[name=sortDirection]").val("DESC");
    }

    const resetFilter = () => {
        $("input[name=resourceType]").prop("checked", false);
        $("input[name=resourceType][value=ALL]").prop("checked", true);
        $("input[name=minRating]").val("1");
        $("input[name=maxRating]").val("5");
    }

    $("#submit-with-search").click(function () {
        resetSorting();
        resetFilter();
        valuesSlider.noUiSlider.set([1, 5]);
        $("#criteria-form").submit();
    });
});
