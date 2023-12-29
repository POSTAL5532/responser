var valuesSlider = document.getElementById('slider');
noUiSlider.create(valuesSlider, {
    start: [0, 5],
    range: {min: 0, max: 5},
    step: 1,
    tooltips: false,
    pips: {mode: 'steps', density: -1},
});

const minRatingValue = document.getElementById("min-rating-value");
const maxRatingValue = document.getElementById("max-rating-value");
valuesSlider.noUiSlider.on("update", (values, handler) => {
    const value = Math.round(values[handler]);

    if (handler === 0) {
        minRatingValue.innerHTML = value;
    } else {
        maxRatingValue.innerHTML = value;
    }
});
