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
$("input[name='sortingField']").change(function() {
    const sortDirectionValue = $(this).attr("data-sort-direction");
    sortDirectionInput.attr("value", sortDirectionValue);
});
