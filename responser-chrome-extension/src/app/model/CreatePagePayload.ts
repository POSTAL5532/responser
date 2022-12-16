export class CreatePagePayload {

    domainId: string;

    url: string;

    name: string;

    description: string;


    constructor(domainId?: string, url?: string, name?: string, description?: string) {
        this.domainId = domainId;
        this.url = url;
        this.name = name;
        this.description = description;
    }
}
