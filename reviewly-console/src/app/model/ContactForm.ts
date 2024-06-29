import moment, {Moment} from "moment/moment";
import {makeAutoObservable} from "mobx";

export class ContactForm {

    id: string;

    username: string;

    email: string;

    text: string;

    read: boolean;

    creationDate: Moment;

    updateDate: Moment;

    constructor() {
        makeAutoObservable(this);
    }

    public static deserialize(data: any): ContactForm {
        return Object.assign(new ContactForm(), data, {
            creationDate: moment(data.creationDate),
            updateDate: moment(data.updateDate),
        });
    }
}