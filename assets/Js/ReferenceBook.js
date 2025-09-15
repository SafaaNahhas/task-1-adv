import { Book } from "./Book.js";

export class ReferenceBook extends Book {
    #locationCode;

    constructor(title, author, category, locationCode, isAvailable = true) {
        super(title, author, category, isAvailable);
        this.#locationCode = locationCode;
    }

    get locationCode() { return this.#locationCode; }
    set locationCode(value) { this.#locationCode = value; }

    // displayInfo() {
    //     return `${super.displayInfo()}, Location: ${this.locationCode}`;
    // }
    displayInfo() {
        return `
            ${super.displayInfo()}
            <p class="contain-card padding-b">Location Code: ${this.locationCode}</p>
        `;
    }

    toPlainObject() {
        return {
            ...super.toPlainObject(),
            locationCode: this.locationCode,
            type: 'ReferenceBook'
        };
    }
}
