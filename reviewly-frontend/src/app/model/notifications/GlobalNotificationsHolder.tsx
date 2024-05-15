import {makeAutoObservable} from "mobx";
import {GlobalNotification, GlobalNotificationAction} from "./GlobalNotification";
import {IconType} from "../../components/icon/Icon";
import {ButtonType} from "../../components/button/Button";
import {ExtensionService} from "../../service/extension/ExtensionService";
import {Logger} from "../../utils/Logger";
import applicationProperties from "../../service/ApplicationProperties";
import React from "react";
import {Link} from "../../components/link/Link";
import ApplicationProperties from "../../service/ApplicationProperties";

const DONE_NOTIFICATION = "done";

export class GlobalNotificationsHolder {

    logger: Logger = new Logger("GlobalNotificationsHolder");

    notifications: Map<string, GlobalNotification> = new Map<string, GlobalNotification>();

    extensionService: ExtensionService = new ExtensionService();

    constructor() {
        makeAutoObservable(this);
    }

    initNotifications = () => {
        this.initCookieNotification();
        this.initInstallExtensionNotification();
    }

    initCookieNotification = () => {
        const cookieNotificationName = "cookieNotification";
        const previousCookieNotificationActionResult = localStorage.getItem(cookieNotificationName);

        if (!!previousCookieNotificationActionResult && previousCookieNotificationActionResult === DONE_NOTIFICATION) {
            this.logger.debug("User already accepted cookie policy, no need notification.");
            return;
        }

        const cookieNotification = new GlobalNotification();
        cookieNotification.name = cookieNotificationName;
        cookieNotification.text = <>
            This service uses cookies. By using Reviewly, you agree to our <Link href={ApplicationProperties.selfHost + "/privacy-policy"} target="_blank">Privacy Policy</Link> and <Link href={ApplicationProperties.selfHost + "/cookie-policy"} target="_blank">Cookie Policy</Link>
        </>;

        const cookieNotificationOnAction = () => {
            localStorage.setItem(cookieNotificationName, DONE_NOTIFICATION);
            this.notifications.delete(cookieNotificationName);
            this.logger.debug("User accepted cookie policy.");
        }

        const cookieNotificationAction = new GlobalNotificationAction();
        cookieNotificationAction.icon = IconType.CHECK;
        cookieNotificationAction.text = "Accept";
        cookieNotificationAction.onAction = cookieNotificationOnAction;
        cookieNotificationAction.styleType = ButtonType.PRIMARY;

        cookieNotification.actions.push(cookieNotificationAction);
        cookieNotification.onClose = cookieNotificationOnAction;

        this.notifications.set(cookieNotificationName, cookieNotification);
    }

    initInstallExtensionNotification = async () => {
        const browserExtensionInstallationNotificationName = "browserExtensionInstallationNotification";
        const previousExtensionInstallationNotificationActionResult = localStorage.getItem(browserExtensionInstallationNotificationName);

        if (!!previousExtensionInstallationNotificationActionResult && previousExtensionInstallationNotificationActionResult === DONE_NOTIFICATION) {
            this.logger.debug("User already accepted no installed extension, no need notification.");
            return;
        }

        try {
            await this.extensionService.checkExtension();
            this.logger.debug("Browser has installed extension, no need notification.");
            return;
        } catch (error) {
            this.logger.debug("Browser has not installed extension, add notification.");
        }

        const browserExtensionInstallationNotification = new GlobalNotification();
        browserExtensionInstallationNotification.name = browserExtensionInstallationNotificationName;
        browserExtensionInstallationNotification.text = "Looks like you didn’t install the browser extension for reviews.";

        browserExtensionInstallationNotification.onClose = () => {
            localStorage.setItem(browserExtensionInstallationNotificationName, DONE_NOTIFICATION);
            this.notifications.delete(browserExtensionInstallationNotificationName);
            this.logger.debug("User accepted no installed extension.");
        }

        const browserExtensionInstallationNotificationAction = new GlobalNotificationAction();
        browserExtensionInstallationNotificationAction.icon = IconType.CHROME_LOGO;
        browserExtensionInstallationNotificationAction.text = "Install extension";
        browserExtensionInstallationNotificationAction.onAction = () => window.open(applicationProperties.downloadExtensionChrome, "_blank");
        browserExtensionInstallationNotificationAction.styleType = ButtonType.PRIMARY;

        browserExtensionInstallationNotification.actions.push(browserExtensionInstallationNotificationAction);

        this.notifications.set(browserExtensionInstallationNotificationName, browserExtensionInstallationNotification);
    }
}