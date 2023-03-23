function toggleInstructionItem() {
    const activeClassName = "active";

    $(".instruction-item").removeClass(activeClassName);
    $(".how-it-works-img").removeClass(activeClassName);
    const parent = $(this).closest(".instruction-item");
    const imageId = parent.attr("item-image-id");
    parent.toggleClass(activeClassName);
    $(`#${imageId}`).toggleClass(activeClassName);
}

$(function () {
    $(".instruction-header").click(toggleInstructionItem);
    $(".instruction-item .arrow-icon").click(toggleInstructionItem);
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