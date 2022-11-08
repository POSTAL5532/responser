import {ApiClient} from "app/service/ApiClient";

const BASE_FACEBOOK_REQUEST = "/facebook-service/api/facebook"

/**
 * Facebook service.
 */
export class FacebookService {

    client: ApiClient = new ApiClient();

    getFacebookAuthDialogUrl = async (): Promise<string> => {
        return await this.client.executeGetRequest(`${BASE_FACEBOOK_REQUEST}/facebook-auth-dialog`);
    }

    currentUserHasFBToken = async (): Promise<boolean> => {
        return await this.client.executeGetRequest(`${BASE_FACEBOOK_REQUEST}/current-user-has-token`);
    }
}
