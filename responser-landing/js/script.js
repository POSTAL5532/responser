function toggleInstructionItem() {
    const activeClassName = "active";
    $(".instruction-item").removeClass(activeClassName);
    $(".how-it-works-img").removeClass(activeClassName);
    const parent = $(this).closest(".instruction-item");
    const imageId = parent.attr("item-image-id");
    parent.toggleClass(activeClassName);
    $(`#${imageId}`).toggleClass(activeClassName);
}

/**
 * How it works items click logic.
 */
$(function () {
    $(".instruction-header").click(toggleInstructionItem);
    $(".instruction-item .arrow-icon").click(toggleInstructionItem);
});

function toggleQuestionItem() {
    const activeClassName = "active";
    const parent = $(this).closest(".question-item");
    parent.toggleClass(activeClassName);
}

/**
 * FAQ items click logic.
 */
$(function () {
    $(".question-header").click(toggleQuestionItem);
    $(".question-item .arrow-icon").click(toggleQuestionItem);
});

var slider = tns({
    loop: false,
    container: '.feedbacks-gallery',
    startIndex: 1,
    items: 2,
    autoplay: false,
    nav: false,
    controlsContainer: ".feedbacks-gallery-controls",
    swipeAngle: false,
    center: true,
    mouseDrag: true,
});