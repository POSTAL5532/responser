function toggleInstructionItem() {
    $('.instruction-item').removeClass("active");
    $(this).closest('.instruction-item').toggleClass("active");
}

$(function () {
    $(".instruction-header").click(toggleInstructionItem);
    $(".instruction-item .arrow-icon").click(toggleInstructionItem);
});