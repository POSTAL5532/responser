window.addEventListener('load', (event) => {
    $(".login-action").click(function blockForm(event) {
        const disabledClass = "disabled";

        $("#username").addClass(disabledClass);
        $("#password").addClass(disabledClass);
        $("#sign-up-link").addClass(disabledClass);
        $(".login-action").addClass(disabledClass);

        $("#submit").text("Wait ...")
    });

    $("#switch-password").click(function () {
        const parent = $(this).closest(".input-container");
        const input = parent.find(".field-input");
        const inputAttr = input.attr("type");

        if (inputAttr === "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });
});