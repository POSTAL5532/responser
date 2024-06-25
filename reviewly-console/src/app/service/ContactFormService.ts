import {ApiClient} from "./ApiClient";
import {ContactForm} from "../model/ContactForm";
import {Pagination} from "../model/Pagination";
import {PageableResponse} from "../model/PageableResponse";
import {ContactFormData} from "../model/ContactFormData";

const BASE_CONTACT_FROMS_URL = "/contact-form";

export class ContactFormService {

    client: ApiClient = new ApiClient();

    getContactForms = async (pagination: Pagination): Promise<PageableResponse<ContactForm>> => {
        const response = await this.client.executeGetRequest(BASE_CONTACT_FROMS_URL, {params: {...pagination}})
        const forms = (response.data as any[]).map(response => ContactForm.deserialize(response));
        return PageableResponse.deserialize<ContactForm>(response, forms);
    }

    updateContactForm = async (contactFormId: string, payload: ContactFormData): Promise<ContactForm> => {
        const updatedReview = await this.client.executePutRequest(`${BASE_CONTACT_FROMS_URL}/${contactFormId}`, payload);
        return ContactForm.deserialize(updatedReview);
    }
}