# Library Management System – Task 1 Adv

An educational project simulating a **Library Management System** using **HTML, CSS, and JavaScript (OOP)**. The project demonstrates object-oriented programming concepts while allowing users to manage books interactively.

## Features

1. **Book Management**

   * Add new books with title, author, category, and book type.
   * Delete existing books.
   * Toggle book availability (Available / Unavailable).

2. **Search & Filtering**

   * Search books by **title** or **author**.
   * Filter books by **category**.

3. **Reference Book Support**

   * Input a **Location Code** for reference books.
   * Distinguish reference books visually in the interface.

4. **Category Management**

   * Add new categories dynamically when adding a book.
   * Categories are **unique** and avoid duplication.

5. **Data Persistence**

   * Save all book data in `localStorage`.
   * Load books automatically when the page is refreshed.

6. **OOP Concepts**

   * **Inheritance:** `ReferenceBook` extends `Book`.
   * **Encapsulation:** Private properties using `#`.
   * **Polymorphism:** `displayInfo()` overridden in `ReferenceBook`.
   * **Abstraction:** `Library` class handles core book management logic.

## Project Structure

project-root/
│
├─ index.html            ← User interface
├─ assets/
│   ├─ Js/
│   │   ├─ main.js       ← DOM manipulation and event handling
│   │   ├─ Book.js       ← Book class definition
│   │   ├─ ReferenceBook.js ← ReferenceBook class definition
│   │   └─ Library.js    ← Library class and book management logic
│   └─ Css/
│       └─ style.css     ← Project CSS


## Classes Overview

### Book

* Represents a regular book.
* Properties: `title`, `author`, `category`, `isAvailable`.
* Methods:

  * `toggleAvailability()`
  * `displayInfo()`
  * `toPlainObject()` (for saving to `localStorage`).

### ReferenceBook

* Inherits from `Book`.
* Additional property: `locationCode`.
* Methods:

  * `displayInfo()` includes location code.
  * `toPlainObject()` includes `locationCode`.

### Library

* Manages the collection of books.
* Methods:

  * `addBook(book)` prevents duplicate titles.
  * `removeBook(id)`
  * `searchBooks(query)`
  * `filterByCategory(category)`
  * `toggleAvailability(id)`
  * `saveToLocalStorage()` & `loadFromLocalStorage()`

## User Interaction (main.js)

1. **Adding a Book**

   * Select book type (Regular or Reference).
   * Enter title, author, category, and location code (if reference).
   * Dynamic category lists update automatically.

2. **Displaying Books**

   * Books appear in a responsive grid layout.
   * Shows book information, availability, and location code (for reference books).
   * Buttons allow toggling availability and deleting books.

3. **Search & Filter**

   * Typing in the search field filters books in real-time.
   * Category selection reduces results to the chosen category.

## Getting Started

1. Clone or download the project.
2. Open `index.html` in a modern web browser (recommended: use Live Server).
3. All books saved in `localStorage` are loaded automatically.
4. Use the **Add Book** form to insert new books.
5. Use **Search & Filter** to find books quickly.

## Additional Notes

* The design is **responsive**, using CSS Grid and Flexbox.
* Reference books are visually distinguished with a blue left border.
* Footer always stays at the bottom regardless of content length.
* The code is organized for **readability, maintainability, and scalability**.


