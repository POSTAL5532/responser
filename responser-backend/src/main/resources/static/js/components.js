//======================================
//============== DROPDOWN ==============
//======================================
const toggleDropdown = (button, forceClose = false) => {
    const openedClass = "opened";
    const activeClass = "active";

    const buttonHeight = button.outerHeight();
    const buttonWidth = button.outerWidth();
    const buttonPosition = button.position();

    const dropdownContainerId = button.attr("data-dropdown-id");
    const dataDropdownActivation = button.attr("data-dropdown-activation-id");

    const dropdownMenuContainer = $(`#${dropdownContainerId}`);
    const dropdownContainerPosition = dropdownMenuContainer.attr("data-dropdown-position");
    const dropdownContainerPositionIsRight = !!dropdownContainerPosition && dropdownContainerPosition === "right";
    const dropdownIsOpened = dropdownMenuContainer.hasClass(openedClass);

    const dropdownMenu = dropdownMenuContainer.find(".dropdown-menu").first();
    const dropdownMenuHeight = dropdownMenu.outerHeight();
    const dropdownMenuWidth = dropdownMenu.outerWidth();

    dropdownMenuContainer.css({
        top: `${buttonHeight + buttonPosition.top + 8}px`,
        height: dropdownIsOpened || forceClose ? "0px" : `${dropdownMenuHeight}px`,
        left: dropdownContainerPositionIsRight ? buttonPosition.left + (buttonWidth - dropdownMenuWidth) : buttonPosition.left
    });

    if (dropdownIsOpened || forceClose) {
        dropdownMenuContainer.removeClass(openedClass);
        if (!!dataDropdownActivation) {
            $(`#${dataDropdownActivation}`).removeClass(activeClass);
        }
    } else {
        dropdownMenuContainer.addClass(openedClass);
        if (!!dataDropdownActivation) {
            $(`#${dataDropdownActivation}`).addClass(activeClass);
        }
    }
}

$(function () {
    const dropdownTriggerSelector = "*[data-dropdown-trigger='dropdown-trigger']";

    $(dropdownTriggerSelector).click(function () {
        toggleDropdown($(this));
    });

    $(dropdownTriggerSelector).each(function () {
        const button = $(this);
        const dropdownContainerId = button.attr("data-dropdown-id");
        const dropdownMenuContainer = $(`#${dropdownContainerId}`);

        document.addEventListener('click', function (event) {
            if (!button[0].contains(event.target) && !dropdownMenuContainer[0].contains(event.target)) {
                toggleDropdown(button, true);
            }
        });
    });
});

