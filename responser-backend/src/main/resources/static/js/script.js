function blockForm(event) {
    const submit = $("#submit");
    const disabledClass = "disabled";

    $("#username").addClass(disabledClass);
    $("#password").addClass(disabledClass);
    $("#sign-up-link").addClass(disabledClass);

    submit.addClass(disabledClass);
    submit.text("Wait ...")
}

$(function (event) {
    $("#submit").click(blockForm);
});