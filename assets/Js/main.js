import { Book } from "./Book.js";
import { ReferenceBook } from "./ReferenceBook.js";
import { Library } from "./Library.js";

const library = new Library();
library.loadFromLocalStorage();
const booksContainer = document.getElementById('booksContainer');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const bookTypeSelect = document.getElementById('bookType');
const locationInput = document.getElementById('newLocationCode');
const locationLabel = document.getElementById('newLocationLabel');
const addButton = document.getElementById('addButton');
const newTitleInput = document.getElementById('newTitle');
const newAuthorInput = document.getElementById('newAuthor');
const newCategorySelect = document.getElementById('newCategory');
const newCategoryInputContainer = document.getElementById('newCategoryInputContainer');
const newCategoryInput = document.getElementById('newCategoryInput');

if (library.books.length === 0) {
library.addBook(new Book('JavaScript Basics', 'John Doe', 'Programming', true));
library.addBook(new Book('CSS Mastery', 'Jane Smith', 'Design', false));
library.addBook(new ReferenceBook('OOP Reference', 'Alice Johnson', 'Programming', 'Shelf A-101', true));
library.addBook(new Book('HTML5 Guide', 'Bob Brown', 'Web', true));
}
function renderBooks(books) {
  const container = document.getElementById('booksContainer');

  const existingIds = new Set(books.map(b => b.id));
  [...container.children].forEach(child => {
    if (!existingIds.has(child.dataset.id)) child.remove();
  });

  books.forEach(book => {
    let card = container.querySelector(`[data-id="${book.id}"]`);
    if (!card) {
      card = document.createElement('div');
      card.className = `book-card ${book instanceof ReferenceBook ? 'reference' : ''}`;
      card.dataset.id = book.id;
      container.appendChild(card);
    }

    card.innerHTML = `
      ${book.displayInfo()}
      <button class="toggle-btn" onclick="toggleBookAvailability('${book.id}')">Toggle Status</button>
      <button class="del-btn" onclick="removeBook('${book.id}')">Delete</button>
    `;
  });
}

function populateCategories() {
    const categories = [...new Set(library.books.map(book => book.category))];

    categorySelect.innerHTML = `<option value="">All Categories</option>`;
    categories.forEach(cat => {
        categorySelect.innerHTML += `<option value="${cat}">${cat}</option>`;
    });

    newCategorySelect.innerHTML = `<option value="">Select Category</option>`;
    categories.forEach(cat => {
        newCategorySelect.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
    newCategorySelect.innerHTML += `<option value="new">Add New...</option>`;
}

function updateDisplay() {
  const searchQuery = searchInput.value;
  const selectedCategory = categorySelect.value;

  let filteredBooks = library.books;
  if (searchQuery) filteredBooks = library.searchBooks(searchQuery);
  if (selectedCategory) filteredBooks = filteredBooks.filter(b => b.category === selectedCategory);

  renderBooks(filteredBooks);
}

window.toggleBookAvailability = function(id) {
  library.toggleAvailability(id);
  updateDisplay();
};

window.removeBook = function(id) {
  library.removeBook(id);
  updateDisplay();
  populateCategories();
};

searchInput.addEventListener('input', updateDisplay);
categorySelect.addEventListener('change', updateDisplay);

bookTypeSelect.addEventListener('change', () => {
  locationInput.style.display = bookTypeSelect.value === 'ReferenceBook' ? 'block' : 'none';
  locationLabel.style.display = bookTypeSelect.value === 'ReferenceBook' ? 'block' : 'none';
});

newCategorySelect.addEventListener('change', () => {
    if (newCategorySelect.value === 'new') {
        newCategoryInputContainer.style.display = 'flex';
    } else {
        newCategoryInputContainer.style.display = 'none';
    }
});
function showError(msg) {
  const errorDiv = document.getElementById('errorMessage');
  errorDiv.textContent = msg;
  errorDiv.style.display = 'block';
  setTimeout(() => {
    errorDiv.style.display = 'none';
  }, 3000); 
}

addButton.addEventListener('click', () => {
  const title = newTitleInput.value.trim();
  const author = newAuthorInput.value.trim();
  const type = bookTypeSelect.value;
  const locationCode = locationInput.value.trim();

  let category = newCategorySelect.value;
  if (category === 'new') {
      category = newCategoryInput.value.trim();
  }

  if (!title || !author || !category) {
    showError('Please fill in all the basic fields!');
    return;
  }

  if (type === 'ReferenceBook' && !locationCode) {
    showError('Please enter the location code for the reference book!');
    return;
  }
  const newBook = type === 'ReferenceBook'
    ? new ReferenceBook(title, author, category, locationCode)
    : new Book(title, author, category);

  try {
    library.addBook(newBook);
    updateDisplay();
    populateCategories();
  } catch (err) {
    showError(err.message);
  }

  newTitleInput.value = '';
  newAuthorInput.value = '';
  newCategorySelect.value = '';
  newCategoryInput.value = '';
  locationInput.style.display = 'none';
  newCategoryInputContainer.style.display = 'none';
  bookTypeSelect.value = 'Book';
});

populateCategories();
updateDisplay();















