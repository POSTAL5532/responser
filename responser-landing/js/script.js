$(function () {
    $(".instruction-header").click(function () {
        $(this).closest('.instruction-item').toggleClass("active")
    });
});