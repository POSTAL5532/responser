import {ApiClient} from "./ApiClient";
import {Domain} from "../model/Domain";
import {CreateDomainPayload} from "../model/CreateDomainPayload";

const BASE_DOMAINS_URL = "/domains";

export class DomainService {

    private client: ApiClient = new ApiClient();

    public getDomainByUrl = async (url: string): Promise<Domain> => {
        const data = await this.client.executeGetRequest(
            BASE_DOMAINS_URL,
            {params: {url}}
        );

        return Domain.deserialize(data);
    }

    public createDomain = async (payload: CreateDomainPayload): Promise<Domain> => {
        const createdDomain = await this.client.executePostRequest(BASE_DOMAINS_URL, payload);
        return Domain.deserialize(createdDomain);
    }
}