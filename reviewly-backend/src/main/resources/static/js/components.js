const prepareRequestHeaders = (url) => {
    const salt = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
    const currentLocalDate = (new Date()).toISOString();
    const message = `${url}${currentLocalDate}${salt}`;
    const hash = CryptoJS.SHA256(message).toString();

    return {
        "X-Request-Id": hash,
        "X-Request-Current-Local-Date": currentLocalDate,
        "X-Request-Config": salt
    }
}

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

const hideNotificationsBlockIfEmpty = () => {
    const block = $(".global-notifications");

    if (block.children('.notification-block.active').length <= 0) {
        block.removeClass('active');
    } else {
        block.addClass('active');
    }
}

const initNotification = (options) => {
    if (!options.show?.()) {
        hideNotificationsBlockIfEmpty();
        return;
    }

    const activeClass = "active";
    const block = $(options.id);

    block.addClass(activeClass);

    const closeButton = block.find('.close-notification').first();
    closeButton.click(function () {
        options.onClose?.();
        block.removeClass(activeClass);
        hideNotificationsBlockIfEmpty();
    });

    const mainAction = block.find('.main-action').first();
    mainAction.click(function () {
        options.onAction?.();
        block.removeClass(activeClass);
        hideNotificationsBlockIfEmpty();
    });

    hideNotificationsBlockIfEmpty();
}
