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