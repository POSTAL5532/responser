import {Logger} from "../utils/Logger";
import {ApiClient} from "./ApiClient";
import {useState} from "react";

const BASE_EMAIL_CONFIRMATION_REQUEST = "/email-confirmation"

export class EmailConfirmationService {

    logger: Logger = new Logger("EmailConfirmationService");

    client: ApiClient = new ApiClient();

    resendConfirmationEmail = async (): Promise<void> => {
        /*return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.logger.debug("Email resent");
                resolve();
            }, 2000)
        });*/

        this.logger.debug("Resend email for user.");
        await this.client.executePostRequest(`${BASE_EMAIL_CONFIRMATION_REQUEST}/resend`);
    }
}

export const useEmailConfirmationService = (): EmailConfirmationService => {
    const [emailConfirmationService] = useState(new EmailConfirmationService());
    return emailConfirmationService;
}
