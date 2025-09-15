export class Book {
    static counter = 1;
    #id;
    #title;
    #author;
    #category;
    #isAvailable;

    constructor(title, author, category, isAvailable = true) { 
        this.#id = crypto.randomUUID();
        this.#title = title;
        this.#author = author;
        this.#category = category;
        this.#isAvailable = isAvailable;
    }

    get id() { return this.#id; }
    get title() { return this.#title; }
    get author() { return this.#author; }
    get category() { return this.#category; }
    get isAvailable() { return this.#isAvailable; }

    set title(value) { this.#title = value; }
    set author(value) { this.#author = value; }
    set category(value) { this.#category = value; }
    set isAvailable(value) { this.#isAvailable = !!value; }

    // displayInfo() {
    //     return `Title: ${this.title}, Author: ${this.author}, Category: ${this.category}, Available: ${this.isAvailable ? 'Yes' : 'No'}`;
    // }
    displayInfo() {
        return `
            <p class="contain-card">Title: <span>${this.title}</span></p>
            <p class="contain-card">Author: <span>${this.author}</span></p>
            <p class="contain-card">Category: <span>${this.category}</span></p>
            <p class="contain-card">Availability: 
                <span class="status ${this.isAvailable ? 'available' : 'unavailable'}">
                    ${this.isAvailable ? '✔Available' : '✘Unavailable'}
                </span>
            </p>
        `;
    }
    toggleAvailability() {
        this.isAvailable = !this.isAvailable;
    }

    toPlainObject() {
            return {
                id: this.id,
                title: this.title,
                author: this.author,
                category: this.category,
                isAvailable: this.isAvailable,
                type: 'Book'
            };
        }
}
