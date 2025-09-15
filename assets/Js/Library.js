import { Book } from "./Book.js";
import { ReferenceBook } from "./ReferenceBook.js"; 

export class Library {
    #books = [];

    addBook(book) {
        if (book instanceof Book) {
            const existingBook = this.#books.find(b => b.title === book.title);
            if (existingBook) {
                throw new Error('A book with this title already exists!');
            }
            this.#books.push(book);
            this.saveToLocalStorage();
        }
    }

    removeBook(id) {
        this.#books = this.#books.filter(book => book.id !== id);
        this.saveToLocalStorage();
    }

    searchBooks(query) {
        const lowerQuery = query.toLowerCase();
        return this.#books.filter(book =>
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery)
        );
    }

    filterByCategory(category) {
        return this.#books.filter(book => book.category === category);
    }

    toggleAvailability(id) {
        const book = this.#books.find(book => book.id === id);
        if (book) {
        book.toggleAvailability();
        this.saveToLocalStorage();
        }
    }

    get books() {
        return [...this.#books];
    }


    saveToLocalStorage() {
        const plainBooks = this.#books.map(book => book.toPlainObject());
        localStorage.setItem("libraryBooks", JSON.stringify(plainBooks));
    }

    loadFromLocalStorage() {
        const data = localStorage.getItem("libraryBooks");
        if (data) {
            const parsed = JSON.parse(data);
            this.#books = parsed.map(b => {
                if (b.type === "ReferenceBook") {
                    return new ReferenceBook(b.title, b.author, b.category, b.locationCode, b.isAvailable);
                } else {
                    return new Book(b.title, b.author, b.category, b.isAvailable);
                }
            });
        }
    }

}
