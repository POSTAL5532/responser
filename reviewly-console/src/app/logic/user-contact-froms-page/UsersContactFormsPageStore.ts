import {ContactFormService} from "../../service/ContactFormService";
import {makeAutoObservable, runInAction} from "mobx";
import {ContactForm} from "../../model/ContactForm";
import {useState} from "react";
import {Pagination} from "../../model/Pagination";
import {Logger} from "../../utils/Logger";
import {ContactFormData} from "../../model/ContactFormData";

export class UsersContactFormsPageStore {

    public static readonly PAGE_ELEMENTS_COUNT = 10;

    logger: Logger = new Logger("UsersContactFormsPageStore");

    contactFormService: ContactFormService = new ContactFormService();

    contactForms: ContactForm[] = [];

    isLoading: boolean = false;

    currentPageNumber: number;

    totalFormsCount: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    init = async () => {
        this.currentPageNumber = 0;
        const pagination = new Pagination(this.currentPageNumber, UsersContactFormsPageStore.PAGE_ELEMENTS_COUNT);

        this.isLoading = true;
        const contactFormsResponse = await this.contactFormService.getContactForms(pagination).finally(
            () => runInAction(() => this.isLoading = false)
        );

        this.contactForms = contactFormsResponse.data;
        this.totalFormsCount = contactFormsResponse.totalElements;
    }

    loadContactForms = async (page: number) => {
        if (this.isLoading) return;

        this.logger.debug("Load next contact forms.");

        const pagination = new Pagination(page, UsersContactFormsPageStore.PAGE_ELEMENTS_COUNT);

        this.isLoading = true;
        const contactFormsResponse = await this.contactFormService.getContactForms(pagination).finally(
            () => runInAction(() => this.isLoading = false)
        );

        this.contactForms = contactFormsResponse.data;
        this.totalFormsCount = contactFormsResponse.totalElements;
    }

    markContactForm = async (contactForm: ContactForm, read: boolean) => {
        const updateContactFormData = new ContactFormData();
        updateContactFormData.read = read;
        updateContactFormData.username = contactForm.username;
        updateContactFormData.email = contactForm.email;
        updateContactFormData.text = contactForm.text;

        const updatedContactForm = await this.contactFormService.updateContactForm(contactForm.id, updateContactFormData);

        const contactFormIndex = this.contactForms.findIndex(form => form.id === updatedContactForm.id);

        if (contactFormIndex >= 0) {
            this.contactForms.splice(contactFormIndex, 1, updatedContactForm)
        }
    }
}

export const useUsersContactFormsPageStore = (): UsersContactFormsPageStore => {
    const [usersContactFormsPageStore] = useState(new UsersContactFormsPageStore());
    return usersContactFormsPageStore;
}
