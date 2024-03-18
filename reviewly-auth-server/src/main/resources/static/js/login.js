window.addEventListener('load', (event) => {
    $("#submit").click(function blockForm(event) {
        const submit = $("#submit");
        const disabledClass = "disabled";

        $("#username").addClass(disabledClass);
        $("#password").addClass(disabledClass);
        $("#sign-up-link").addClass(disabledClass);

        submit.addClass(disabledClass);
        submit.text("Wait ...")
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